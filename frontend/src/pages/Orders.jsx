import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api/axios';
import OrderCard from '../components/OrderCard';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem('userId');

    const loadOrders = async () => {
        try {
            const res = await api.get(`/order/${userId}`);
            setOrders(res.data);
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    };

    useEffect(() => {
        loadOrders();
        setLoading(false);
    }, []);

    if (orders.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold">No Orders Yet</h2>
                <p className="text-gray-500">Start shopping to see orders here</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-[60vh] flex justify-center items-center">
                <p className="text-gray-500">Loading orders...</p>
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