import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { FiEye, FiCalendar } from "react-icons/fi";

const OrderCard = ({ order }) => {
    const navigate = useNavigate();

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
        <motion.div
            className="bg-dark-card border border-dark-border rounded-2xl p-6 card-hover shadow-2xl"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
        >
            {/* Top: Order Info & Status */}
            <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="min-w-0">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                        Order #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                        <FiCalendar size={14} className="text-text-muted shrink-0" />
                        <span>
                            {new Date(order.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                        <span className="w-1 h-1 bg-text-muted rounded-full shrink-0" />
                        <span>
                            {formatDistanceToNow(new Date(order.createdAt), {
                                addSuffix: true,
                            })}
                        </span>
                    </div>
                </div>

                <span className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ${getStatusClass(order.status)}`}>
                    {order.status || "Placed"}
                </span>
            </div>

            <div className="my-4 h-px bg-dark-border" />

            {/* Products with price */}
            <div className="mt-4 space-y-3">
                {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center gap-3">
                        {/* LEFT */}
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-dark-elevated border border-dark-border overflow-hidden flex items-center justify-center text-lg shrink-0">
                                {item.productId?.image ? (
                                    <img src={item.productId.image} alt={item.productId?.title || "Product"} className="w-full h-full object-cover" onError={(event) => { event.currentTarget.alt = ""; event.currentTarget.style.display = "none"; }} />
                                ) : (
                                    <span>⌚</span>
                                )}
                            </div>
                            <p className="font-medium text-sm text-white truncate">
                                <span className="inline-flex items-center justify-center w-5 h-5 text-xs text-text-muted bg-dark-elevated rounded-full mr-2 shrink-0">
                                    {item.quantity}×
                                </span>
                                {item.productId?.title || "Product"}
                            </p>
                        </div>

                        {/* RIGHT */}
                        <p className="typo-price shrink-0">
                            ₹ {item.price * item.quantity}
                        </p>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-dark-border" />

            {/* Bottom */}
            <div className="flex justify-between items-center">
                {/* Left Side */}
                <div>
                    <p className="text-sm text-text-muted">
                        Payment: {order.paymentMethod || "COD"}
                    </p>
                </div>

                {/* Right Side */}
                <div className="text-right">
                    <p className="text-xl font-bold text-white mb-1">
                        <span className="text-sm text-text-muted mr-1">₹</span>
                        {order.totalAmount}
                    </p>

                    <motion.button
                        className="text-accent text-sm font-medium hover:text-accent-alt flex items-center gap-1 transition-colors"
                        onClick={() => navigate(`/orders/${order._id}`)}
                        whileHover={{ x: 2 }}
                    >
                        View Details <FiEye size={14} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderCard;
