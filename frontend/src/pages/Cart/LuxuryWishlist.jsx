import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiX, FiShoppingBag, FiSearch } from "react-icons/fi";
import { fadeInUp, goldLineAnimation, buttonHover, imageZoom, cardHover } from "../../utils/animations";

export default function LuxuryWishlist() {
    const userId = localStorage.getItem("userId");
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            loadWishlist();
        } else {
            setLoading(false);
        }
    }, [userId]);

    const loadWishlist = async () => {
        try {
            const res = await api.get(`/wishlist`);
            setWishlist(res.data);
        } catch (err) {
            console.error("Wishlist load error:", err);
            setWishlist({ items: [] });
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (productId) => {
        try {
            await api.post(`/wishlist/remove`, { productId });
            loadWishlist();
        } catch (err) {
            console.error("Remove from wishlist error:", err);
        }
    };

    const moveToCart = async (productId) => {
        try {
            await api.post(`/cart/add`, { productId });
            await api.post(`/wishlist/remove`, { productId });
            window.dispatchEvent(new Event("cartUpdated"));
            loadWishlist();
        } catch (err) {
            console.error("Move to cart error:", err);
        }
    };

    const validItems = (wishlist?.items || []).filter((i) => i?.productId?._id);

    if (!userId) {
        navigate("/login");
        return null;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="typo-body-sm text-text-muted">Loading your wishlist...</p>
                </div>
            </div>
        );
    }

    if (validItems.length === 0) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <motion.div
                    className="text-center max-w-md mx-auto px-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
                >
                    <motion.div
                        className="w-32 h-32 mx-auto mb-8 rounded-full bg-linear-to-br from-dark-card to-dark-elevated border border-dark-border flex items-center justify-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <FiHeart size={48} className="text-text-muted" />
                    </motion.div>
                    <motion.h2
                        className="typo-h2 text-white mb-4"
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                    >
                        Your Wishlist is Empty
                    </motion.h2>
                    <motion.div
                        className="divider-gold mx-auto mb-6"
                        variants={goldLineAnimation}
                        initial="initial"
                        animate="animate"
                    />
                    <p className="typo-body-sm text-text-secondary mb-8">
                        Save your favorite timepieces here by clicking the heart icon on any product.
                    </p>
                    <Link to="/shop">
                        <motion.button
                            className="btn btn-primary btn-lg group"
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Explore Collection
                            <FiSearch className="group-hover:translate-x-1 transition-transform" size={16} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark">
            {/* Banner */}
            <div className="bg-dark-elevated/30 border-b border-dark-border">
                <div className="container-lux py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <span className="typo-label-gold mb-4 block">Saved Items</span>
                        <h1 className="typo-h1 text-white mb-4">My Wishlist</h1>
                        <motion.div className="divider-gold" variants={goldLineAnimation} initial="initial" animate="animate" />
                    </motion.div>
                </div>
            </div>

            <div className="container-lux section-padding-sm">
                {/* Items Count */}
                <p className="typo-body-sm text-text-muted mb-8">
                    {validItems.length} {validItems.length === 1 ? "item" : "items"} in your wishlist
                </p>

                {/* Wishlist Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {validItems.map((item, index) => (
                            <motion.div
                                key={item.productId._id}
                                className="group relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover="hover"
                                variants={cardHover}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-square overflow-hidden bg-linear-to-br from-dark-elevated to-dark-card">
                                    <Link to={`/product/${item.productId._id}`}>
                                        <motion.div
                                            className="w-full h-full flex items-center justify-center"
                                            variants={imageZoom}
                                            whileHover="hover"
                                        >
                                            <div className="w-40 h-40 rounded-full border-2 border-accent/20 bg-accent/5 flex items-center justify-center">
                                                <span className="text-6xl">⌚</span>
                                            </div>
                                        </motion.div>
                                    </Link>

                                    {/* Remove Button */}
                                    <motion.button
                                        onClick={() => removeItem(item.productId._id)}
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark/60 backdrop-blur-md border border-dark-border flex items-center justify-center hover:border-red-500/30 hover:text-red-400 transition-all"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label="Remove from wishlist"
                                    >
                                        <FiX size={18} />
                                    </motion.button>

                                    {/* Gold Accent Line */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent"
                                        variants={goldLineAnimation}
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="p-6">
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-accent mb-2">
                                        {item.productId.category}
                                    </p>
                                    <Link to={`/product/${item.productId._id}`}>
                                        <h3 className="font-display text-lg font-light text-white mb-3 hover:text-accent transition-colors line-clamp-1">
                                            {item.productId.title}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="font-display text-2xl font-light text-accent">
                                            ${item.productId.price}
                                        </span>
                                    </div>

                                    {/* Move to Cart Button */}
                                    <motion.button
                                        onClick={() => moveToCart(item.productId._id)}
                                        className="w-full py-3 rounded-full bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-dark transition-all duration-300 text-sm tracking-[0.15em] uppercase font-medium"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FiShoppingBag size={14} className="inline mr-2" />
                                        Move to Cart
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Continue Shopping */}
                <div className="mt-12 text-center">
                    <Link to="/shop">
                        <motion.button
                            className="btn btn-outline group"
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Continue Shopping
                            <FiSearch className="group-hover:translate-x-1 transition-transform" size={16} />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
}