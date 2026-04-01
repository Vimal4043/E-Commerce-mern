import React from 'react'
import api from "../api/axios";
import { Link } from "react-router";

const ProductCard = ({ product }) => {

    const addToCart = async (productId) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Please log in to add items to your cart.");
            return;
        }

        const res = await api.post(`/cart/add`, { userId, productId });

        const total = res.data.cart.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        localStorage.setItem("cartCount", total);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return (
        <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden"
        >
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                />
                <h2 className="mt-2 px-3 font-semibold text-lg line-clamp-1">{product.title}</h2>
            </Link>

            {/* Price + Add to Cart (same line) */}
            <div className="m-3 flex items-center justify-between bg-linear-to-r from-pink-500 to-purple-500 text-white px-3 py-2 rounded-lg">
                <p className="font-bold">₹{product.price}</p>

                <button
                    onClick={() => addToCart(product._id)}
                    className="bg-blue-600 hover:bg-blue-700 active:scale-70 transition px-3 py-1 rounded-md text-sm"
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default ProductCard