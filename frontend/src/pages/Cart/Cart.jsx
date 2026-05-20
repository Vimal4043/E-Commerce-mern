import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import CartSkeleton from "../../loadingSkeleton/CartSkeleton";
import NoCart from "./NoCart";
import EmptyCart from "./EmptyCart";
import ItemCard from "../../components/Cart/ItemCard";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Load cart data
  const loadCart = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/cart`);
      setCart(res.data);
    } catch (err) {
      console.error("Cart load error:", err);
      setCart({ items: [] }); // Set to empty cart on error
    } finally {
      setLoading(false); // IMPORTANT
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    await api.post(`/cart/remove`, { productId });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  //Update item quantity
  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }

    await api.post(`/cart/update`, { productId, quantity });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!userId) {
    return (
      <NoCart />
    );
  }

  if (loading || !cart) {
    return <CartSkeleton />;
  }

  const validItems = (cart?.items || []).filter(
    (i) => i?.productId?._id
  );

  const total = validItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {validItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-5">
              {validItems.map((item) => (
                <ItemCard
                  key={item.productId._id}
                  item={item}
                  updateQty={updateQty}
                  removeItem={removeItem}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
              <Link to="/"
                className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Miss something? Add more →
              </Link>

              <div className="flex items-center justify-center sm:justify-end bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md">
                <h2 className="font-semibold">Grand Total : </h2>&nbsp;
                <h2 className="text-lg font-semibold">
                  ₹{total.toFixed(2)}
                </h2>
              </div>
            </div>

            {/* Bottom Checkout Button */}

            <div className="flex justify-center sm:justify-end">
              <button
                onClick={() => navigate("/checkout")}
                className="w-full sm:w-1/4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}