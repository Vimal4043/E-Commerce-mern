import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiSliders, FiPlus, FiMinus, FiX, FiChevronDown, FiHeart } from "react-icons/fi";
import { fadeInUp, cartAddAnimation, buttonHover, imageZoom, goldLineAnimation } from "../../utils/animations";

export default function LuxuryCart() {
    const userId = localStorage.getItem("userId");
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [showCouponInput, setShowCouponInput] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            loadCart();
        } else {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        window.dispatchEvent(new Event("cartUpdated"));
    }, [cart]);

    const loadCart = async () => {
        try {
            const res = await api.get(`/cart`);
            setCart(res.data);
        } catch (err) {
            console.error("Cart load error:", err);
            setCart({ items: [] });
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (productId) => {
        await api.post(`/cart/remove`, { productId });
        loadCart();
    };

    const updateQty = async (productId, quantity) => {
        if (quantity === 0) {
            await removeItem(productId);
            return;
        }
        await api.post(`/cart/update`, { productId, quantity });
        loadCart();
    };

    const applyCoupon = () => {
        if (couponCode.toLowerCase() === "luxury10") {
            setDiscount(0.1);
            alert("Coupon applied! 10% discount");
        } else {
            alert("Invalid coupon code");
        }
    };

    const validItems = (cart?.items || []).filter((i) => i?.productId?._id);
    const subtotal = validItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    const shippingCost = subtotal > 5000 ? 0 : 50;
    const tax = subtotal * 0.08;
    const total = subtotal - discount * subtotal + shippingCost + tax;

    if (!userId) {
        navigate("/login");
        return null;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="typo-body-sm text-text-muted">Loading your cart...</p>
                </div>
            </div>
        );
    }

    if (validItems.length === 0) {
        return <LuxuryEmptyCart />;
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
                        <span className="typo-label-gold mb-4 block">Shopping Bag</span>
                        <h1 className="typo-h1 text-white mb-4">Your Cart</h1>
                        <motion.div className="divider-gold" variants={goldLineAnimation} initial="initial" animate="animate" />
                    </motion.div>
                </div>
            </div>

            <div className="container-lux section-padding-sm">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence>
                            {validItems.map((item, index) => (
                                <motion.div
                                    key={item.productId._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-dark-card border border-dark-border rounded-2xl p-6 card-hover"
                                >
                                    <div className="grid md:grid-cols-12 gap-6">
                        {/* Product Image */}
                        <div className="md:col-span-3">
                            <div className="aspect-square bg-linear-to-br from-dark-elevated to-dark-card rounded-xl overflow-hidden border border-dark-border">
                                <motion.div
                                    className="w-full h-full flex items-center justify-center"
                                    whileHover="hover"
                                    variants={imageZoom}
                                >
                                    {item.productId.image ? (
                                        <img src={item.productId.image} alt={item.productId.title} className="w-full h-full object-cover" onError={(event) => { event.currentTarget.alt = ""; event.currentTarget.style.display = "none"; }} />
                                    ) : (
                                        <span className="text-5xl">⌚</span>
                                    )}
                                </motion.div>
                            </div>
                        </div>

                                        {/* Product Details */}
                                        <div className="md:col-span-5 flex flex-col justify-between">
                                            <div>
                                                <p className="text-xs text-accent uppercase tracking-wider mb-2">
                                                    {item.productId.category}
                                                </p>
                                                <Link to={`/product/${item.productId._id}`}>
                                                    <h3 className="typo-h4 text-white hover:text-accent transition-colors mb-2">
                                                        {item.productId.title}
                                                    </h3>
                                                </Link>
                                                <p className="typo-price">₹ {item.productId.price}</p>
                                            </div>
                                            <div className="flex items-center gap-4 mt-4 md:mt-0">
                                                <motion.button
                                                    onClick={() => updateQty(item.productId._id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center hover:border-accent transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FiMinus size={14} className="text-text-muted" />
                                                </motion.button>
                                                <span className="typo-product-name text-white min-w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <motion.button
                                                    onClick={() => updateQty(item.productId._id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center hover:border-accent transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FiPlus size={14} className="text-text-muted" />
                                                </motion.button>
                                            </div>
                                        </div>

                                        {/* Price & Actions */}
                                        <div className="md:col-span-4 flex flex-col justify-between items-end">
                                            <motion.button
                                                onClick={() => removeItem(item.productId._id)}
                                                className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center hover:border-red-500/30 hover:text-red-400 transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <FiX size={18} />
                                            </motion.button>
                                            <div className="text-right">
                                                <p className="text-sm text-text-muted mb-1">
                                                    {"\u20B9"} {item.productId.price} {"\u00D7"} {item.quantity}
                                                </p>
                                                <p className="typo-price-lg">
                                                    ₹ {(item.productId.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Continue Shopping */}
                        <Link to="/shop">
                            <motion.button
                                className="btn btn-outline w-full md:w-auto group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Continue Shopping
                                <FiSearch className="group-hover:translate-x-1 transition-transform" size={16} />
                            </motion.button>
                        </Link>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            className="sticky top-24 bg-dark-card border border-dark-border rounded-2xl p-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2 className="typo-h3 text-white mb-6">Order Summary</h2>

                            {/* Coupon Code */}
                            <div className="mb-6">
                                {!showCouponInput ? (
                                    <button
                                        onClick={() => setShowCouponInput(true)}
                                        className="text-sm text-accent hover:text-accent-alt transition-colors flex items-center gap-2"
                                    >
                                        <FiSliders size={14} />
                                        Add Coupon Code
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="Enter code"
                                            className="input flex-1 py-2 rounded-lg"
                                        />
                                        <button
                                            onClick={applyCoupon}
                                            className="btn btn-primary px-4 py-2 rounded-lg"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="divider mb-6" />

                            {/* Totals */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-muted">Subtotal</span>
                                    <span className="text-white">₹ {subtotal.toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">Discount (10%)</span>
                                        <span className="text-green-400">-₹${(discount * subtotal).toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-muted">Shipping</span>
                                    <span className="text-white">
                                        {shippingCost === 0 ? (
                                            <span className="text-green-400">FREE</span>
                                        ) : (
                                            `\u20B9${shippingCost.toFixed(2)}`
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-muted">Tax (8%)</span>
                                    <span className="text-white">₹ {tax.toFixed(2)}</span>
                                </div>
                                <div className="divider-gold-thin my-4" />
                                <div className="flex justify-between items-center">
                                    <span className="typo-h4 text-white">Total</span>
                                    <motion.span
                                        className="typo-price-lg"
                                        key={total}
                                        initial={{ scale: 1.2, color: "#C8A45D" }}
                                        animate={{ scale: 1, color: "#FFFFFF" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        ₹ {total.toFixed(2)}
                                    </motion.span>
                                </div>
                            </div>

                            {/* Free Shipping Progress */}
                            {shippingCost > 0 && (
                                <div className="mb-6">
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-text-muted">Add ₹ ${(5000 - subtotal).toFixed(2)} more for FREE shipping</span>
                                    </div>
                                    <div className="h-2 bg-dark-elevated rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-linear-to-r from-accent to-accent-alt"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((subtotal / 5000) * 100, 100)}%` }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Checkout Button */}
                            <motion.button
                                onClick={() => navigate("/checkout")}
                                className="w-full py-4 rounded-full bg-accent text-dark hover:bg-accent-alt transition-all duration-300 text-sm tracking-[0.15em] uppercase font-medium shadow-lg mb-4 relative overflow-hidden"
                                variants={buttonHover}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                Proceed to Checkout
                            </motion.button>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-dark-border">
                                <div className="text-center">
                                    <div className="text-lg mb-1">{"\uD83D\uDD12"}</div>
                                    <p className="text-[10px] text-text-muted">Secure</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg mb-1">{"\uD83D\uDEE1\uFE0F"}</div>
                                    <p className="text-[10px] text-text-muted">Insured</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg mb-1">{"\u21A9\uFE0F"}</div>
                                    <p className="text-[10px] text-text-muted">Returns</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function LuxuryEmptyCart() {
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
                    <span className="text-6xl">{"\uD83D\uDED2"}</span>
                </motion.div>
                <motion.h2
                    className="typo-h2 text-white mb-4"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                >
                    Your Cart is Empty
                </motion.h2>
                <motion.div
                    className="divider-gold mx-auto mb-6"
                    variants={goldLineAnimation}
                    initial="initial"
                    animate="animate"
                />
                <p className="typo-body-sm text-text-secondary mb-8">
                    Discover our exquisite collection of luxury timepieces and find the perfect addition to your collection.
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
