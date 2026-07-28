import { motion } from "framer-motion";
import { FiInbox, FiSearch, FiShoppingCart, FiHeart, FiMail } from "react-icons/fi";
import LuxuryButton from "./LuxuryButton";

const icons = {
    inbox: FiInbox,
    search: FiSearch,
    cart: FiShoppingCart,
    heart: FiHeart,
    mail: FiMail
};

export default function LuxuryEmptyState({
    title = "No Data Found",
    description = "There are no items to display at this time.",
    icon = "inbox",
    actionLabel,
    onAction,
    iconClassName = ""
}) {
    const Icon = icons[icon] || FiInbox;

    return (
        <motion.div
            className="flex flex-col items-center justify-center py-16 px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Icon */}
            <motion.div
                className={`w-24 h-24 rounded-full bg-dark-elevated/50 border border-dark-border flex items-center justify-center mb-6 ${iconClassName}`}
                animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Icon size={36} className="text-accent" />
            </motion.div>

            {/* Title */}
            <h3 className="typo-h3 text-white mb-3">{title}</h3>

            {/* Divider */}
            <div className="divider-gold mx-auto mb-4" />

            {/* Description */}
            <p className="typo-body-sm text-text-secondary max-w-md mb-8">
                {description}
            </p>

            {/* Action Button */}
            {actionLabel && onAction && (
                <LuxuryButton onClick={onAction}>
                    {actionLabel}
                </LuxuryButton>
            )}
        </motion.div>
    );
}