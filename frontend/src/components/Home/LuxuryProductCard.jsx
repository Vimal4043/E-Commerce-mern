import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LuxuryProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <motion.div
            className="group relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-dark-elevated to-dark-card">
                {/* Image */}
                <Link to={`/product/${product._id}`}>
                    <motion.div
                        className="w-full h-full flex items-center justify-center"
                        animate={{ 
                            scale: isHovered ? 1.1 : 1,
                            rotateY: isHovered ? 360 : 0
                        }}
                        transition={{ 
                            scale: { duration: 0.7, ease: [0.165, 0.84, 0.44, 1] },
                            rotateY: { duration: 1.2, ease: "linear" }
                        }}
                        style={{ perspective: 1000 }}
                    >
                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-accent/20 bg-accent/5 flex items-center justify-center">
                            <span className="text-7xl md:text-8xl">⌚</span>
                        </div>
                    </motion.div>
                </Link>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                        <span className="px-3 py-1.5 rounded-full bg-accent text-dark text-[10px] tracking-[0.15em] uppercase font-medium shadow-lg">
                            New
                        </span>
                    )}
                    {product.isLimited && (
                        <span className="px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-[10px] tracking-[0.15em] uppercase font-medium backdrop-blur-sm">
                            Limited Edition
                        </span>
                    )}
                </div>

                {/* Action Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {/* Wishlist */}
                    <motion.button
                        className="w-10 h-10 rounded-full bg-dark/60 backdrop-blur-md border border-dark-border flex items-center justify-center hover:border-accent/30 transition-all"
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg
                            className={`w-4 h-4 ${isWishlisted ? 'text-accent fill-accent' : 'text-white'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </motion.button>

                    {/* Quick View */}
                    <motion.button
                        className="w-10 h-10 rounded-full bg-dark/60 backdrop-blur-md border border-dark-border flex items-center justify-center hover:border-accent/30 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                    </motion.button>
                </div>

                {/* Gold Accent Line */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
                />
            </div>

            {/* Product Info */}
            <div className="p-6">
                {/* Category */}
                <p className="text-[10px] tracking-[0.2em] uppercase text-accent mb-2">
                    {product.category}
                </p>

                {/* Title */}
                <Link to={`/product/${product._id}`}>
                    <h3 className="font-display text-lg font-light text-white mb-3 hover:text-accent transition-colors line-clamp-1">
                        {product.title}
                    </h3>
                </Link>

                {/* Rating */}
                {product.rating && (
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-accent' : 'text-dark-border'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-xs text-text-muted">({product.reviewCount || 128})</span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                    {product.oldPrice && (
                        <span className="text-sm text-text-muted line-through">
                            ${product.oldPrice}
                        </span>
                    )}
                    <span className="font-display text-2xl font-light text-accent">
                        ${product.price}
                    </span>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                    className="w-full py-3.5 rounded-full border border-accent text-accent hover:bg-accent hover:text-dark transition-all duration-300 text-xs tracking-[0.15em] uppercase font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Add to Cart
                </motion.button>
            </div>

            {/* Soft Shadow Overlay on Hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{
                    boxShadow: "0 20px 60px -10px rgba(200, 164, 93, 0.15), 0 0 0 1px rgba(200, 164, 93, 0.1)"
                }}
            />
        </motion.div>
    );
};

export default LuxuryProductCard;