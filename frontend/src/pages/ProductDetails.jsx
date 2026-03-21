import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

export default function ProductDetails() {
  const navidate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    const res = await api.get("/products");
    const p = res.data.find((item) => item._id === id);
    setProduct(p);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }

    const res = await api.post("/cart/add", {
      userId,
      productId: product._id,
    });

    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const buy = () => {
    addToCart();
    navidate("/cart");
  }

  if (!product) {
    return <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* LEFT: IMAGE */}
      <div className="w-full max-w-md h-80 flex items-center justify-center bg-white rounded-xl shadow-md">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>

      {/* RIGHT: DETAILS */}
      <div className="space-y-4 max-w-md">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>

        {/* Price */}
        <div className="flex items-center gap-3">
          <p className="text-3xl font-bold text-green-600">
            ₹{product.price}
          </p>
          <span className="text-gray-400 line-through">
            ₹{product.price + 200}
          </span>
          <span className="text-green-500 text-sm">₹200 OFF</span>
        </div>

        {/* Stock */}
        <p className="text-sm text-green-600 font-medium">In Stock</p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={addToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>

          <button
            onClick={buy}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Buy Now
          </button>
        </div>

        {/* Extra info */}
        <div className="text-sm text-gray-500 mt-4 space-y-1">
          <p>🚚 Free delivery in 3-5 days</p>
          <p>🔒 Secure payment</p>
          <p>↩️ Easy returns</p>
        </div>

      </div>

    </div>
  );
}