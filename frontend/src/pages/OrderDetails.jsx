import React, { use, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import api from '../api/axios';
import { formatDistanceToNow } from 'date-fns';
import OrderDetailsSkeleton from '../loadingSkeleton/OrderDetailsSkeleton';

const OrderDetails = () => {

    const { orderId } = useParams();
    const [order, setorder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadOrderDetails = async () => {
        try {
            const res = await api.get(`/orders/${orderId}`);
            console.log("Order details:", res.data);
            setorder(res.data);
        } catch (error) {
            console.error("Error fetching order details:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadOrderDetails();
    }, [orderId]);

    if (loading) {
        return <OrderDetailsSkeleton />;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-6">
            <div className="max-w-6xl mx-auto px-4">

                <button
                    onClick={() => navigate("/orders")}
                    className="flex items-center gap-1 text-lg text-gray-500 hover:text-black mb-2"
                >
                    ← Back to Orders
                </button>

                {/* 🔹 Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Order #{order._id.slice(-6).toUpperCase()}
                        </h1>
                        <p className="text-gray-500 text-sm">
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

                    {/* <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                        {order.status || "Placed"}
                    </span> */}
                </div>

                {/* 🔥 GRID (Adjusted Width Ratio) */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

                    {/* 🔹 LEFT (Shorter Width) */}
                    <div className="md:col-span-3 space-y-6">

                        {/* 🛒 Items */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                            <h2 className="font-semibold text-lg mb-4">Items</h2>

                            <div className="space-y-4">
                                {order.items.map((item, i) => (
                                    <div
                                        key={i}
                                        className="pt-4 first:pt-0 grid grid-cols-[auto_1fr_auto] items-center gap-4"
                                    >
                                        <img
                                            src={item.productId?.image}
                                            alt={item.productId?.title}
                                            className="w-16 h-16 rounded-lg object-cover border"
                                        />

                                        <div>
                                            <p className="font-medium">
                                                {item.productId?.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-semibold text-right">
                                            ₹ {item.price}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 💳 Payment Summary */}
                        <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                            <h2 className="font-semibold text-lg mb-4">
                                Payment Summary
                            </h2>

                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Payment Method</span>
                                <span>{order.paymentMethod || "COD"}</span>
                            </div>

                            <div className="flex justify-between mt-4 pt-3 border-t font-semibold text-lg">
                                <span>Total</span>
                                <span>₹ {order.totalAmount}</span>
                            </div>
                        </div>
                    </div>

                    {/* 🔹 RIGHT (Bigger & Dominant) */}
                    <div className="md:col-span-2 space-y-6">

                        {/* 📍 Address */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                            <h2 className="font-semibold text-lg mb-3">
                                Delivery Address
                            </h2>

                            <p className="font-medium">{order.address?.fullName}</p>
                            <p className="text-sm text-gray-500">
                                {order.address?.addressLine}, {order.address?.city}
                            </p>
                            <p className="text-sm text-gray-500">
                                {order.address?.state} - {order.address?.pincode}
                            </p>
                            <p className="mt-2 text-sm">
                                📞 {order.address?.phone}
                            </p>
                        </div>

                        {/* 🚚 Order Status */}
                        <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                            <h2 className="font-semibold text-lg mb-3">
                                Order Status
                            </h2>

                            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                                {order.status || "Placed"}
                            </span>

                            <p className="text-sm text-gray-500 mt-3">
                                Your order has been placed successfully.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails