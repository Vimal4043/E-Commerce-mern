import { useNavigate, useParams } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 text-center">
      
      {/* Card */}
      <div className="bg-white p-8 rounded-xl shadow-md">

        {/* ✅ Icon */}
        <div className="text-5xl mb-4">✅</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h1>

        {/* Order ID */}
        <p className="mt-4 text-gray-600">
          Your Order ID:
          <span className="font-semibold ml-1">{id}</span>
        </p>

        {/* Extra message */}
        <p className="text-sm text-gray-500 mt-2">
          🎉 Thank you for your purchase! Your order will be delivered soon.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>

          {/* <button
            onClick={() => navigate("/orders")}
            className="border px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            View Orders
          </button> */}

        </div>

      </div>
    </div>
  );
}