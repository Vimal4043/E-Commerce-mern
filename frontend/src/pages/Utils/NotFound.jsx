import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      
      {/* Big 404 */}
      <h1 className="text-6xl font-bold text-gray-900">404</h1>

      {/* Title */}
      <h2 className="text-2xl font-semibold mt-2">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-500 mt-2 max-w-md">
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Go Back Home
      </button>

      {/* Optional extra action */}
      <button
        onClick={() => navigate("/")}
        className="mt-3 text-sm text-gray-500 hover:underline"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default NotFound;