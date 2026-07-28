import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/animations";

export default function LuxuryInput({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    icon: Icon,
    className = "",
    ...props
}) {
    return (
        <motion.div
            className={`relative ${className}`}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
        >
            {label && (
                <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`input ${Icon ? 'pl-12' : ''} ${error ? 'border-red-500/50 focus:border-red-500' : ''}`}
                    {...props}
                />
            </div>
            {error && (
                <motion.p
                    className="text-red-400 text-xs mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {error}
                </motion.p>
            )}
        </motion.div>
    );
}