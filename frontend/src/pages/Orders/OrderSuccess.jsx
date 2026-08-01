import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck, FiPackage, FiHome } from "react-icons/fi";
import { fadeInUp, goldLineAnimation, checkmarkAnimation, buttonHover } from "../../utils/animations";

export default function OrderSuccess() {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center">
            <motion.div
                className="text-center max-w-md mx-auto px-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
            >
                {/* Success Icon */}
                <motion.div
                    className="w-32 h-32 mx-auto mb-8 rounded-full bg-linear-to-br from-dark-card to-dark-elevated border border-accent/30 flex items-center justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <motion.svg
                        className="w-16 h-16 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        variants={checkmarkAnimation}
                        initial="initial"
                        animate="animate"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M5 13l4 4L19 7"
                        />
                    </motion.svg>
                </motion.div>

                {/* Title */}
                <motion.h2
                    className="typo-h2 text-white mb-4"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                >
                    Order Placed Successfully
                </motion.h2>

                {/* Gold Divider */}
                <motion.div
                    className="divider-gold mx-auto mb-6"
                    variants={goldLineAnimation}
                    initial="initial"
                    animate="animate"
                />

                {/* Order ID */}
                <p className="typo-body-sm text-text-secondary mb-2">
                    Your Order ID:
                </p>
                <p className="font-display text-lg text-accent mb-6 break-all">
                    {id}
                </p>

                {/* Message */}
                <p className="typo-body-sm text-text-muted mb-8">
                    Thank you for your purchase! Your order will be delivered soon.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/">
                        <motion.button
                            className="btn btn-outline btn-lg w-full sm:w-auto group"
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <FiHome size={16} className="group-hover:translate-x-1 transition-transform" />
                            Continue Shopping
                        </motion.button>
                    </Link>
                    <Link to="/orders">
                        <motion.button
                            className="btn btn-primary btn-lg w-full sm:w-auto group"
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <FiPackage size={16} />
                            View Orders
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}