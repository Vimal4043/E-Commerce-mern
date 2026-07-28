import { motion } from "framer-motion";
import { shimmer } from "../../utils/animations";

export default function LoadingSkeleton({ className = "", variant = "default" }) {
    const baseStyles = "bg-gradient-to-r from-dark-elevated via-dark-border/30 to-dark-elevated bg-[length:200%_100%] rounded-xl overflow-hidden relative";

    if (variant === "card") {
        return (
            <motion.div
                className={`${baseStyles} ${className}`}
                variants={shimmer}
                initial="initial"
                animate="animate"
            >
                <div className="aspect-square bg-dark-border/30" />
                <div className="p-6 space-y-3">
                    <div className="h-4 bg-dark-border/30 rounded w-3/4" />
                    <div className="h-3 bg-dark-border/30 rounded w-1/2" />
                    <div className="h-6 bg-dark-border/30 rounded w-1/3" />
                </div>
            </motion.div>
        );
    }

    if (variant === "text") {
        return (
            <motion.div
                className={`space-y-3 ${className}`}
                variants={shimmer}
                initial="initial"
                animate="animate"
            >
                <div className="h-4 bg-dark-border/30 rounded w-full" />
                <div className="h-4 bg-dark-border/30 rounded w-5/6" />
                <div className="h-4 bg-dark-border/30 rounded w-4/6" />
            </motion.div>
        );
    }

    if (variant === "circle") {
        return (
            <motion.div
                className={`w-20 h-20 rounded-full bg-dark-border/30 ${className}`}
                variants={shimmer}
                initial="initial"
                animate="animate"
            />
        );
    }

    if (variant === "button") {
        return (
            <motion.div
                className={`h-12 bg-dark-border/30 rounded-xl ${className}`}
                variants={shimmer}
                initial="initial"
                animate="animate"
            />
        );
    }

    // Default rectangle
    return (
        <motion.div
            className={`h-48 bg-dark-border/30 rounded-xl ${className}`}
            variants={shimmer}
            initial="initial"
            animate="animate"
        />
    );
}

// Profile Skeleton
export function ProfileSkeleton() {
    return (
        <div className="min-h-screen bg-dark p-6">
            <div className="max-w-3xl mx-auto">
                <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <LoadingSkeleton variant="circle" />
                        <div className="flex-1 space-y-4">
                            <LoadingSkeleton variant="text" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Product Detail Skeleton
export function ProductDetailSkeleton() {
    return (
        <div className="min-h-screen bg-dark">
            <div className="container-lux section-padding">
                <div className="grid md:grid-cols-2 gap-12">
                    <LoadingSkeleton variant="card" className="aspect-square" />
                    <div className="space-y-6">
                        <LoadingSkeleton variant="text" />
                        <LoadingSkeleton variant="button" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Cart Skeleton
export function CartSkeleton() {
    return (
        <div className="min-h-screen bg-dark p-6">
            <div className="container-lux">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <LoadingSkeleton key={i} variant="card" className="h-32" />
                        ))}
                    </div>
                    <LoadingSkeleton variant="card" className="h-96" />
                </div>
            </div>
        </div>
    );
}
