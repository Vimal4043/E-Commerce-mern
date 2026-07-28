import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import LuxuryButton from "../../components/UI/LuxuryButton";

export default function Luxury404() {
    return (
        <div className="min-h-screen bg-dark flex items-center justify-center px-6">
            <motion.div
                className="text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* 404 Number */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
                >
                    <h1 className="typo-hero text-accent font-display">404</h1>
                </motion.div>

                {/* Gold Divider */}
                <motion.div
                    className="divider-gold mx-auto mb-8"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                />

                {/* Title */}
                <motion.h2
                    className="typo-h2 text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Page Not Found
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="typo-body-sm text-text-secondary max-w-md mx-auto mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    The timepiece you're looking for doesn't exist or has been moved to a different location.
                </motion.p>

                {/* Actions */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <Link to="/">
                        <LuxuryButton variant="primary" icon={FiArrowLeft}>
                            Back to Home
                        </LuxuryButton>
                    </Link>
                    <Link to="/shop">
                        <LuxuryButton variant="outline">
                            Browse Collection
                        </LuxuryButton>
                    </Link>
                </motion.div>

                {/* Decorative Element */}
                <motion.div
                    className="mt-16 text-6xl opacity-20"
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    ⌚
                </motion.div>
            </motion.div>
        </div>
    );
}