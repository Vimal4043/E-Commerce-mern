import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import CheckoutSkeleton from "../loadingSkeleton/CheckoutSkeleton";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  // Load cart + addresses
  useEffect(() => {
    if (!userId) return;

    api.get(`/cart/${userId}`).then((res) => setCart(res.data));
    api.get(`/address/${userId}`).then((res) => {
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

    const res = await api.post("/order/place", {
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
        <div>
          <h2 className="font-semibold text-lg mb-4">
            Select Delivery Address
          </h2>

          <div className="space-y-4">
            {addresses.map((addr) => {
              const selected = selectedAddress?._id === addr._id;

              return (
                <label
                  key={addr._id}
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer border transition shadow-sm
                ${selected
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-300 hover:border-blue-400 hover:shadow-md"
                    }`}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selected}
                    onChange={() => setSelectedAddress(addr)}
                    className="mt-1"
                  />

                  <div className="space-y-1">
                    <p className="font-semibold">{addr.fullName}</p>

                    <p className="text-sm text-gray-600">
                      {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>

                    <p className="text-sm text-gray-600">
                      📞 {addr.phone}
                    </p>

                    {selected && (
                      <span className="text-xs text-blue-600 font-medium">
                        Selected
                      </span>
                    )}
                  </div>
                </label>
              );
            })}
          </div>

          <button
            onClick={() => navigate("/checkout-address")}
            className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add New Address
          </button>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit mt-10">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

          {/* Breakdown */}
          <div className="space-y-2 text-sm text-gray-600">

            <div className="flex justify-between">
              <span>Items Total</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600 font-medium">-₹0</span>
            </div>
          </div>

          <hr className="my-4" />

          {/* Total */}
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {/* Button */}
          <button
            onClick={placeOrder}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-medium"
          >
            Place Order (COD)
          </button>

          {/* Footer note */}
          <p className="text-xs text-gray-500 mt-3">
            🔒 Safe & secure payments
          </p>
        </div>

      </div>
    </div>
  );
}