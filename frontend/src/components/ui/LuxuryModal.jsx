import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function LuxuryModal({
    isOpen,
    onClose,
    title,
    children,
    size = "md"
}) {
    const sizes = {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-4xl",
        xl: "max-w-6xl"
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className={`relative bg-dark-card border border-dark-border rounded-2xl shadow-2xl w-full ${sizes[size]}`}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        {/* Header */}
                        {title && (
                            <div className="flex items-center justify-between p-6 border-b border-dark-border">
                                <h2 className="typo-h4 text-white">{title}</h2>
                                <motion.button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center text-text-muted hover:text-white hover:border-accent/30 transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FiX size={18} />
                                </motion.button>
                            </div>
                        )}

                        {/* Body */}
                        <div className="p-6">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}