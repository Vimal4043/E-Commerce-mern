import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import CheckoutSkeleton from "../../loadingSkeleton/CheckoutSkeleton";
import AddressSections from "./AddressSections";
import OrderSummary from "./OrderSummary";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  // Load cart + addresses
  useEffect(() => {
    if (!userId) return;

    api.get(`/cart`).then((res) => setCart(res.data));
    api.get(`/address`).then((res) => {
      setAddresses(res.data);
      setSelectedAddress(res.data[0]); // default select
    });
  }, []);

  if (!cart) return <CheckoutSkeleton />;

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  //Place order + clear cart
  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    const res = await api.post("/orders/place", {
      userId,
      address: selectedAddress,
    });

    window.location.href = `/order-success/${res.data.orderId}`;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-6">Checkout</h1>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT: Address Section */}
        <AddressSections
          addresses={addresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          navigate={navigate}
        />

        {/* RIGHT: Order Summary */}
        <OrderSummary cart={cart} total={total} placeOrder={placeOrder} />

      </div>
    </div>
  );
}