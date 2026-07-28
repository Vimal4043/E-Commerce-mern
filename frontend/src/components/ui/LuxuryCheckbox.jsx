import { motion } from "framer-motion";

export default function LuxuryCheckbox({
    checked,
    onChange,
    label,
    className = ""
}) {
    return (
        <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
            <div className="relative">
                <motion.input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <motion.div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                        checked
                            ? "bg-accent border-accent"
                            : "border-dark-border hover:border-accent/50"
                    }`}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence>
                        {checked && (
                            <motion.svg
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="w-3 h-3 text-dark"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </motion.svg>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            {label && (
                <span className="text-sm text-text-secondary">{label}</span>
            )}
        </label>
    );
}

// Radio Component
export function LuxuryRadio({
    checked,
    onChange,
    label,
    name,
    value,
    className = ""
}) {
    return (
        <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
            <div className="relative">
                <motion.input
                    type="radio"
                    checked={checked}
                    onChange={onChange}
                    name={name}
                    value={value}
                    className="sr-only"
                />
                <motion.div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        checked
                            ? "border-accent"
                            : "border-dark-border hover:border-accent/50"
                    }`}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence>
                        {checked && (
                            <motion.div
                                className="w-2.5 h-2.5 rounded-full bg-accent"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            {label && (
                <span className="text-sm text-text-secondary">{label}</span>
            )}
        </label>
    );
}