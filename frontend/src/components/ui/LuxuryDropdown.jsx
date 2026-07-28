import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { fadeInUp } from "../../utils/animations";

export default function LuxuryDropdown({
    label,
    options = [],
    value,
    onChange,
    placeholder = "Select an option",
    className = ""
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

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
            <div ref={dropdownRef}>
                <motion.button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="input w-full flex items-center justify-between text-left"
                    whileHover={{ borderColor: "rgba(200, 164, 93, 0.3)" }}
                >
                    <span className={selectedOption ? "text-white" : "text-text-muted"}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FiChevronDown size={18} className="text-text-muted" />
                    </motion.div>
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute top-full left-0 right-0 mt-2 bg-dark-card border border-dark-border rounded-xl shadow-2xl z-50 overflow-hidden"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
                        >
                            <div className="max-h-60 overflow-y-auto">
                                {options.map((option) => (
                                    <motion.button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 hover:bg-dark-elevated transition-colors flex items-center justify-between ${
                                            value === option.value ? "text-accent" : "text-white"
                                        }`}
                                        whileHover={{ x: 4 }}
                                    >
                                        <span>{option.label}</span>
                                        {value === option.value && (
                                            <motion.div
                                                className="w-2 h-2 rounded-full bg-accent"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}