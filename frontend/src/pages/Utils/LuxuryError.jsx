import { motion } from "framer-motion";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import LuxuryButton from "../../components/ui/LuxuryButton";

export default function LuxuryError({
    title = "Something Went Wrong",
    description = "We encountered an unexpected error. Please try again later.",
    onRetry
}) {
    return (
        <div className="min-h-screen bg-dark flex items-center justify-center px-6">
            <motion.div
                className="text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Error Icon */}
                <motion.div
                    className="w-24 h-24 mx-auto mb-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <FiAlertCircle size={48} className="text-red-400" />
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="typo-h1 text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {title}
                </motion.h1>

                {/* Gold Divider */}
                <motion.div
                    className="divider-gold mx-auto mb-6"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                />

                {/* Description */}
                <motion.p
                    className="typo-body-sm text-text-secondary max-w-md mx-auto mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {description}
                </motion.p>

                {/* Actions */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    {onRetry && (
                        <LuxuryButton variant="primary" icon={FiRefreshCw} onClick={onRetry}>
                            Try Again
                        </LuxuryButton>
                    )}
                    <LuxuryButton
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </LuxuryButton>
                </motion.div>

                {/* Error Code */}
                <motion.div
                    className="mt-12 inline-block px-6 py-2 rounded-full bg-dark-elevated/50 border border-dark-border"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <span className="text-xs text-text-muted uppercase tracking-wider">
                        Error Code: 500
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
}