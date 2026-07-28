import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiInfo, FiAlertTriangle } from "react-icons/fi";

const icons = {
    success: FiCheck,
    error: FiX,
    info: FiInfo,
    warning: FiAlertTriangle
};

const styles = {
    success: "bg-green-500/10 border-green-500/30 text-green-400",
    error: "bg-red-500/10 border-red-500/30 text-red-400",
    info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
};

export default function LuxuryToast({
    message,
    type = "info",
    isVisible,
    onClose,
    duration = 4000
}) {
    const Icon = icons[type];

    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`fixed bottom-6 right-6 z-[var(--z-toast)] max-w-sm w-full ${styles[type]} border rounded-2xl p-4 shadow-2xl backdrop-blur-xl`}
                    initial={{ opacity: 0, y: 20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20, x: 20 }}
                    transition={{ duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
                >
                    <div className="flex items-start gap-3">
                        <Icon size={20} className="mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white">{message}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-text-muted hover:text-white transition-colors"
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                    
                    {/* Progress bar */}
                    <motion.div
                        className="mt-3 h-0.5 bg-white/10 rounded-full overflow-hidden"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: duration / 1000, ease: "linear" }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}