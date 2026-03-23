import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api/axios';
import OrderCard from '../components/OrderCard';
import OrderSkeleton from '../loadingSkeleton/OrderSkeleton';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem('userId');

    const loadOrders = async () => {
        try {
            const res = await api.get(`/orders/${userId}`);
            setOrders(res.data);
        } catch (error) {
            console.error("Error loading orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-5">
                {/* Title */}
                <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>
                {[1, 2, 3].map((_, i) => (
                    <OrderSkeleton key={i} />
                ))}
            </div>
        )
    }

    if (!loading && orders.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold">No Orders Yet</h2>
                <p className="text-gray-500">Start shopping to see orders here</p>
            </div>
        );
    }

    return (
        <div className="p-5 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            <div className="space-y-5">
                {orders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders