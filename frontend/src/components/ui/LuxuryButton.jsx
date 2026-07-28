import { motion } from "framer-motion";
import { buttonHover, ripple } from "../../utils/animations";

export default function LuxuryButton({
    children,
    variant = "primary",
    size = "md",
    onClick,
    disabled = false,
    className = "",
    type = "button",
    icon: Icon
}) {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 relative overflow-hidden";

    const variants = {
        primary: "bg-accent text-dark hover:bg-accent/90 shadow-lg shadow-accent/20",
        secondary: "bg-dark-card text-white border border-dark-border hover:border-accent/30",
        outline: "bg-transparent text-accent border border-accent/30 hover:bg-accent/10",
        ghost: "bg-transparent text-text-muted hover:text-white hover:bg-dark-card"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
            variants={buttonHover}
            whileHover={!disabled ? "hover" : undefined}
            whileTap={!disabled ? "tap" : undefined}
        >
            {Icon && <Icon size={size === "sm" ? 16 : size === "md" ? 18 : 20} />}
            {children}
        </motion.button>
    );
}