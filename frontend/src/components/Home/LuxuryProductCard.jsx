import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { buttonHover, imageZoom, wishlistAnimation, goldLineAnimation, cardHover } from "../../utils/animations";
import LuxuryButton from "../ui/LuxuryButton";
import api from "../../api/axios";

const LuxuryProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);
    const [cartAdded, setCartAdded] = useState(false);
    const userId = localStorage.getItem("userId");

    // Check if product is already in wishlist
    useEffect(() => {
        if (!userId) return;
        const checkWishlist = async () => {
            try {
                const res = await api.get(`/wishlist`);
                const exists = res.data.items.some(
                    (i) => i.productId?._id?.toString() === product._id?.toString()
                );
                setIsWishlisted(exists);
            } catch {
                // silent
            }
        };
        checkWishlist();
    }, [userId, product._id]);

    const handleWishlist = async () => {
        if (!userId) return;
        try {
            if (isWishlisted) {
                await api.post(`/wishlist/remove`, { productId: product._id });
                setIsWishlisted(false);
            } else {
                await api.post(`/wishlist/add`, { productId: product._id });
                setIsWishlisted(true);
            }
        } catch (err) {
            console.error("Wishlist error:", err);
        }
    };

    const handleAddToCart = async () => {
        if (!userId) return;
        setAddingToCart(true);
        try {
            await api.post(`/cart/add`, { productId: product._id });
            setCartAdded(true);
            window.dispatchEvent(new Event("cartUpdated"));
            setTimeout(() => setCartAdded(false), 2000);
        } catch (err) {
            console.error("Add to cart error:", err);
        } finally {
            setAddingToCart(false);
        }
    };

    return (
        <motion.div
            className="group relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
            whileHover="hover"
            variants={cardHover}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-linear-to-br from-dark-elevated to-dark-card">
                {/* Image */}
                <Link to={`/product/${product._id}`}>
                    <motion.div
                        className="w-full h-full flex items-center justify-center"
                        variants={imageZoom}
                        whileHover="hover"
                    >
                        {product.image ? (
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" onError={(event) => { event.currentTarget.alt = ""; event.currentTarget.style.display = "none"; }} />
                        ) : (
                            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-accent/20 bg-accent/5 flex items-center justify-center">
                                <span className="text-7xl md:text-8xl">⌚</span>
                            </div>
                        )}
                    </motion.div>
                </Link>

                {/* Badges */}
                <motion.div 
                    className="absolute top-4 left-4 flex flex-col gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {product.isNew && (
                        <motion.span 
                            className="px-3 py-1.5 rounded-full bg-accent text-dark text-[10px] tracking-[0.15em] uppercase font-medium shadow-lg"
                            whileHover={{ scale: 1.05 }}
                        >
                            New
                        </motion.span>
                    )}
                    {product.isLimited && (
                        <motion.span 
                            className="px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-[10px] tracking-[0.15em] uppercase font-medium backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                        >
                            Limited Edition
                        </motion.span>
                    )}
                </motion.div>

                {/* Action Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {/* Wishlist */}
                    <motion.button
                        className="w-10 h-10 rounded-full bg-dark/60 backdrop-blur-md border border-dark-border flex items-center justify-center hover:border-accent/30 transition-all"
                        onClick={handleWishlist}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle wishlist"
                    >
                        <motion.svg
                            className={`w-4 h-4 ${isWishlisted ? 'text-accent fill-accent' : 'text-white'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            variants={wishlistAnimation}
                            animate={isWishlisted ? "animate" : "initial"}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </motion.svg>
                    </motion.button>

                    {/* Quick View */}
                    <motion.button
                        className="w-10 h-10 rounded-full bg-dark/60 backdrop-blur-md border border-dark-border flex items-center justify-center hover:border-accent/30 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Quick view"
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
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent"
                    variants={goldLineAnimation}
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
                            ₹ {product.oldPrice}
                        </span>
                    )}
                    <span className="font-display text-2xl font-light text-accent">
                        ₹ {product.price}
                    </span>
                </div>

                {/* Add to Cart Button */}
                <LuxuryButton
                    variant={cartAdded ? "primary" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={addingToCart || !userId}
                >
                    {cartAdded ? "Added to Cart \u2713" : addingToCart ? "Adding..." : "Add to Cart"}
                </LuxuryButton>
            </div>

        </motion.div>
    );
};

export default LuxuryProductCard;
