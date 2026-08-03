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
        if (!userId) return alert("Please log in to add items to your cart.");
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
                            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-2 border-accent/20 bg-accent/5 flex items-center justify-center">
                                <span className="text-6xl sm:text-7xl md:text-8xl">⌚</span>
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

                <div className="mb-4 flex flex-col gap-3 sm:gap-2 md:flex-row md:items-start md:justify-between">
                    {/* Title */}
                    <Link
                        to={`/product/${product._id}`}
                        className="flex-1 min-w-0"
                    >
                        <h3 className="font-display text-base sm:text-lg lg:text-xl font-light text-white hover:text-accent transition-colors line-clamp-2 md:line-clamp-1 wrap-break-word">
                            {product.title}
                        </h3>
                    </Link>

                    {/* Price */}
                    <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-end md:text-right shrink-0">
                        {product.oldPrice && (
                            <span className="text-xs sm:text-sm text-text-muted line-through">
                                ₹ {product.oldPrice}
                            </span>
                        )}

                        <span className="font-display text-xl sm:text-2xl lg:text-3xl font-light text-accent whitespace-nowrap">
                            ₹ {product.price}
                        </span>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <LuxuryButton
                    variant={cartAdded ? "primary" : "outline"}
                    size="xs"
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                >
                    {cartAdded ? "Added to Cart \u2713" : addingToCart ? "Adding..." : "Add to Cart"}
                </LuxuryButton>
            </div>

        </motion.div>
    );
};

export default LuxuryProductCard;
