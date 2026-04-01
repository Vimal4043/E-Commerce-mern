import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router";
import CartSkeleton from "../loadingSkeleton/CartSkeleton";

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
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">

          <h2 className="text-2xl font-bold mb-2">
            Your Cart is empty
          </h2>

          <div className="flex gap-4 justify-center">

            {/* Login */}
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-400 hover:bg-purple-500 text-black px-5 py-2 rounded-full font-medium transition"
            >
              Sign in to your account
            </button>

            {/* Signup */}
            <button
              onClick={() => navigate("/signup")}
              className="border border-gray-400 px-5 py-2 rounded-full hover:bg-gray-100 transition"
            >
              Sign up now
            </button>

          </div>
        </div>
      </div>
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
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500 mb-4">Your cart is empty 😔</p>
            <Link
              to="/"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-5">
              {validItems.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  {/* Left: Image + Info */}
                  <div className="flex items-center gap-4 md:w-1/2">
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <h2 className="font-semibold">
                        {item.productId.title}
                      </h2>
                      <p className="text-gray-500">
                        ₹{item.productId.price}
                      </p>
                    </div>
                  </div>

                  <div className="md:flex items-center justify-between md:w-1/2">
                    {/* Middle: Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQty(item.productId._id, item.quantity - 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="font-medium">{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQty(item.productId._id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    {/* Right: Price + Remove */}
                    <div className="text-right">
                      <p className="font-semibold">
                        ₹{(item.productId.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeItem(item.productId._id)}
                        className="text-red-500 text-sm hover:text-red-700 mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Link
                to="/"
                className="m-5 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Miss something? Add more →
              </Link>
            </div>

            {/* Bottom Total Section */}
            <div className="mt-6 bg-white p-4 rounded-xl shadow-sm hover:shadow-md flex items-center justify-between">
              <h2>Grand Total: </h2>
              <h2 className="text-lg font-semibold">
                ₹{total.toFixed(2)}
              </h2>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}