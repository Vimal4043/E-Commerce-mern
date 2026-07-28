import { motion } from "framer-motion";

const variants = {
    primary: "bg-accent text-dark",
    secondary: "bg-dark-card text-white border border-dark-border",
    success: "bg-green-500/10 text-green-400 border border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    error: "bg-red-500/10 text-red-400 border border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/20"
};

const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm"
};

export default function LuxuryBadge({
    children,
    variant = "primary",
    size = "md",
    className = "",
    animated = false
}) {
    return (
        <motion.span
            className={`inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-wider ${variants[variant]} ${sizes[size]} ${className}`}
            initial={animated ? { scale: 0.8, opacity: 0 } : undefined}
            animate={animated ? { scale: 1, opacity: 1 } : undefined}
            transition={animated ? { type: "spring", stiffness: 500, damping: 15 } : undefined}
        >
            {children}
        </motion.span>
    );
}

// Tag Component
export function LuxuryTag({
    children,
    onRemove,
    className = "",
    variant = "secondary"
}) {
    return (
        <motion.span
            className={`inline-flex items-center gap-2 rounded-lg font-medium ${variants[variant]} ${sizes.md} ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
        >
            {children}
            {onRemove && (
                <motion.button
                    onClick={onRemove}
                    className="hover:text-white transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </motion.button>
            )}
        </motion.span>
    );
}