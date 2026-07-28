import { motion } from "framer-motion";

export default function LuxurySpinner({
    size = "md",
    color = "accent",
    className = ""
}) {
    const sizes = {
        sm: "w-6 h-6",
        md: "w-12 h-12",
        lg: "w-16 h-16",
        xl: "w-24 h-24"
    };

    const colors = {
        accent: "border-accent",
        white: "border-white",
        muted: "border-text-muted"
    };

    return (
        <motion.div
            className={`${sizes[size]} ${className}`}
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }}
        >
            <div className={`w-full h-full rounded-full border-2 ${colors[color]} border-t-transparent`} />
        </motion.div>
    );
}

// Dots Spinner
export function LuxuryDotsSpinner({ className = "" }) {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="w-2 h-2 rounded-full bg-accent"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.2
                    }}
                />
            ))}
        </div>
    );
}

// Pulse Spinner
export function LuxuryPulseSpinner({ className = "" }) {
    return (
        <motion.div
            className={`w-12 h-12 rounded-full bg-accent/20 ${className}`}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
}