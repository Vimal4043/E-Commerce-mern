import React from "react";
import { useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";

const OrderCard = ({ order }) => {
    const navigate = useNavigate();

    return (
        <div className="border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-lg transition duration-200 bg-white">

            {/* 🔹 Top */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500">
                        Order #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                        {" • "}
                        {formatDistanceToNow(new Date(order.createdAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>

                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium">
                    {order.status || "Placed"}
                </span>
            </div>

            <div className="my-4 h-px bg-gray-200"></div>

            {/* 🔹 Products with price */}
            <div className="mt-4 space-y-3">
                {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center">

                        {/* LEFT */}
                        <div>
                            <p className="font-medium text-sm">
                                <span className="bg-gray-200 pl-1 mr-2 rounded">{item.quantity}× </span>
                                {item.productId?.title || "Product"}
                            </p>
                        </div>

                        {/* RIGHT */}
                        <p className="text-sm font-medium">
                            <span className="m-1">₹</span>{item.price * item.quantity}
                        </p>
                    </div>
                ))}
            </div>

            {/* 🔹 Divider */}
            <div className="my-4 h-px bg-gray-200"></div>

            {/* ◆ Bottom */}
            <div className="flex justify-between items-center">

                {/* Left Side */}
                <div>
                    <p className="text-sm text-gray-500">
                        Payment: {order.paymentMethod || "COD"}
                    </p>
                </div>

                {/* Right Side */}
                <div className="text-right">
                    <p className="text-lg font-semibold">
                        <span className="mr-1">₹</span>
                        {order.totalAmount}
                    </p>

                    <button
                        className="text-blue-600 text-sm font-medium hover:underline mt-1"
                        onClick={() => navigate(`/orders/${order._id}`)}
                    >
                        View Details →
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderCard;