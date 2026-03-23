import React, { use, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import api from '../api/axios';

const OrderDetails = () => {

    const { orderId } = useParams();
    const [order, setorder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadOrderDetails = async () => {
        try {
            const res = await api.get(`/orders/${orderId}`);
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
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">

            {/* 🔹 Order Info */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                    Order #{order._id.slice(-6).toUpperCase()}
                </h1>
                <p className="text-gray-500">
                    {new Date(order.createdAt).toDateString()}
                </p>

                <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    {order.status || "Placed"}
                </span>
            </div>

            {/* 🔹 Products */}
            <div className="border rounded-xl p-4 mb-6">
                <h2 className="font-semibold mb-4">Items</h2>

                <div className="space-y-4">
                    {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-4">

                            <img
                                src={item.productId?.image}
                                alt={item.productId?.title}
                                className="w-16 h-16 rounded-lg object-cover border"
                            />

                            <div className="flex-1">
                                <p className="font-medium">
                                    {item.productId?.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                </p>
                            </div>

                            <p className="font-medium">
                                ₹{item.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🔹 Address */}
            <div className="border rounded-xl p-4 mb-6">
                <h2 className="font-semibold mb-2">Delivery Address</h2>

                <p>{order.address?.fullName}</p>
                <p className="text-gray-500">
                    {order.address?.addressLine}, {order.address?.city}
                </p>
                <p className="text-gray-500">
                    {order.address?.state} - {order.address?.pincode}
                </p>
                <p className="mt-1">📞 {order.address?.phone}</p>
            </div>

            {/* 🔹 Payment */}
            <div className="border rounded-xl p-4">
                <h2 className="font-semibold mb-2">Payment Summary</h2>

                <div className="flex justify-between text-sm text-gray-600">
                    <span>Payment Method</span>
                    <span>{order.paymentMethod || "COD"}</span>
                </div>

                <div className="flex justify-between mt-2 font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{order.totalPrice}</span>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails