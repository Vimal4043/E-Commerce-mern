import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion'
import api from '../../api/axios';
import { formatDistanceToNow } from 'date-fns';
import OrderDetailsSkeleton from '../../loadingSkeleton/OrderDetailsSkeleton';
import { goldLineAnimation, fadeInUp } from '../../utils/animations';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadOrderDetails = async () => {
        try {
            const res = await api.get(`/orders/${orderId}`);
            setOrder(res.data);
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

    const totalItems = order.items.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const statusColors = {
        placed: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
        processing: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
        shipped: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
        delivered: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        cancelled: "bg-red-500/10 text-red-400 border border-red-500/20",
    };

    const getStatusClass = (status) => {
        if (!status) return statusColors.placed;
        return statusColors[status.toLowerCase()] || statusColors.placed;
    };

    return (
        <div className="min-h-screen bg-dark">
            {/* Banner */}
            <div className="bg-dark-elevated/30 border-b border-dark-border">
                <div className="container-lux py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <span className="typo-label-gold mb-4 block">Order Details</span>
                        <h1 className="typo-h1 text-white mb-4">
                            Order #{order._id.slice(-6).toUpperCase()}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                            <p className="typo-body-sm text-text-secondary">
                                Placed on{' '}
                                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                                {' • '}
                                {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                            </p>
                            <span className={`badge ${getStatusClass(order.status)}`}>
                                {order.status || "Placed"}
                            </span>
                        </div>
                        <motion.div
                            className="divider-gold mt-4"
                            variants={goldLineAnimation}
                            initial="initial"
                            animate="animate"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container-lux section-padding-sm">
                <motion.button
                    onClick={() => navigate("/orders")}
                    className="flex items-center gap-1 text-sm text-text-muted hover:text-accent mb-6 transition-colors"
                    whileHover={{ x: -2 }}
                >
                    ← Back to Orders
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* LEFT: Items & Payment */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Items */}
                        <motion.div
                            className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h2 className="typo-h3 text-white mb-1">Items</h2>
                            <p className="text-sm text-text-muted mb-4">
                                {totalItems} item{totalItems > 1 ? 's' : ''}
                            </p>

                            <div className="space-y-4">
                                {order.items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center gap-3 sm:gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                                    >
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-dark-elevated border border-dark-border overflow-hidden flex items-center justify-center flex-shrink-0">
                                            {item.productId?.image ? (
                                                <img src={item.productId.image} alt={item.productId.title} className="w-full h-full object-cover" onError={(event) => { event.currentTarget.alt = ""; event.currentTarget.style.display = "none"; }} />
                                            ) : (
                                                <span className="text-2xl sm:text-3xl">⌚</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-white truncate">{item.productId?.title}</p>
                                            <p className="text-sm text-text-muted">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="text-right typo-price shrink-0">
                                            ₹ {item.price * item.quantity}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Payment Summary */}
                        <motion.div
                            className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="typo-h3 text-white mb-4">Payment Summary</h2>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-muted">Payment Method</span>
                                    <span className="text-white">{order.paymentMethod || "COD"}</span>
                                </div>
                                <div className="divider-gold-thin my-2" />
                                <div className="flex justify-between items-center pt-3 border-t border-dark-border font-semibold text-lg">
                                    <span className="text-white">Total</span>
                                    <span className="typo-price">₹ {order.totalAmount}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: Address & Status */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Delivery Address */}
                        <motion.div
                            className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h2 className="typo-h3 text-white mb-3">Delivery Address</h2>

                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">📍</span>
                                </div>
                                <div>
                                    <p className="font-medium text-white">{order.address?.fullName}</p>
                                    <p className="text-sm text-text-secondary">
                                        {order.address?.addressLine}, {order.address?.city}
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                        {order.address?.state} - {order.address?.pincode}
                                    </p>
                                    <p className="text-sm text-text-secondary mt-1">
                                        📞 {order.address?.phone}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Order Status */}
                        <motion.div
                            className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h2 className="typo-h3 text-white mb-3">Order Status</h2>

                            <span className={`badge ${getStatusClass(order.status)}`}>
                                {order.status || "Placed"}
                            </span>

                            <p className="typo-body-sm text-text-secondary mt-3">
                                Your order has been placed successfully.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;
