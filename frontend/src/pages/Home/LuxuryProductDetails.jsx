import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function LuxuryProductDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [activeTab, setActiveTab] = useState("description");
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Mock multiple images for gallery
    const productImages = [
        product?.image,
        product?.image,
        product?.image,
        product?.image
    ].filter(Boolean);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            const res = await api.get(`/products/${id}`);
            setProduct(res.data);
            
            // Load related products (same category)
            if (res.data.category) {
                const relatedRes = await api.get(`/products?category=${res.data.category}&limit=4`);
                setRelatedProducts(relatedRes.data.products?.filter(p => p._id !== id) || []);
            }
        } catch (error) {
            console.error("Failed to load product:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addToCart = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {
            const res = await api.post("/cart/add", {
                userId,
                productId: product._id,
            });

            const total = res.data.cart.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            localStorage.setItem("cartCount", total);
            window.dispatchEvent(new Event("cartUpdated"));
            alert("Added to cart successfully!");
        } catch (error) {
            console.error("Error adding item to cart:", error);
            alert(error.response?.data?.message || "Unable to add item to cart");
        }
    };

    const buy = async () => {
        const added = await addToCart();
        if (added) {
            navigate("/cart");
        }
    };

    if (isLoading || !product) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="typo-body-sm text-text-muted">Loading...</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: "description", label: "Description" },
        { id: "specifications", label: "Specifications" },
        { id: "shipping", label: "Shipping & Warranty" },
        { id: "reviews", label: `Reviews (${reviews.length || 128})` }
    ];

    return (
        <div className="min-h-screen bg-dark">
            {/* Breadcrumb */}
            <div className="container-lux pt-8 pb-4">
                <nav className="flex items-center gap-2 text-xs">
                    <button onClick={() => navigate("/")} className="text-text-muted hover:text-accent transition-colors">
                        Home
                    </button>
                    <span className="text-text-muted">/</span>
                    <button onClick={() => navigate("/products")} className="text-text-muted hover:text-accent transition-colors">
                        Products
                    </button>
                    <span className="text-text-muted">/</span>
                    <span className="text-accent">{product.title}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="container-lux section-padding-sm">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* LEFT: Image Gallery */}
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        {/* Main Image */}
                        <motion.div
                            className="relative aspect-square bg-gradient-to-br from-dark-card to-dark-elevated border border-dark-border rounded-3xl overflow-hidden mb-6 cursor-zoom-in"
                            onClick={() => setIsZoomed(!isZoomed)}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                {productImages[selectedImage] ? (
                                    <img src={productImages[selectedImage]} alt={product.title} className="w-full h-full object-cover" onError={(event) => { event.currentTarget.alt = ""; event.currentTarget.style.display = "none"; }} />
                                ) : (
                                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-accent/20 bg-accent/5 flex items-center justify-center">
                                        <span className="text-8xl md:text-9xl">⌚</span>
                                    </div>
                                )}
                            </div>

                            {/* Badges */}
                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                {product.isNew && (
                                    <span className="px-4 py-2 rounded-full bg-accent text-dark text-xs tracking-[0.15em] uppercase font-medium shadow-lg">
                                        New
                                    </span>
                                )}
                                {product.isLimited && (
                                    <span className="px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs tracking-[0.15em] uppercase font-medium backdrop-blur-sm">
                                        Limited Edition
                                    </span>
                                )}
                            </div>

                            {/* Zoom Icon */}
                            <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-dark/60 backdrop-blur-md border border-dark-border flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {[0, 1, 2, 3].map((index) => (
                                <motion.button
                                    key={index}
                                    className={`aspect-square bg-dark-card border rounded-xl overflow-hidden transition-all ${
                                        selectedImage === index 
                                            ? 'border-accent shadow-lg' 
                                            : 'border-dark-border hover:border-accent/30'
                                    }`}
                                    onClick={() => setSelectedImage(index)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="w-full h-full flex items-center justify-center">
                                        {productImages[index] ? (
                                            <img src={productImages[index]} alt={product.title} className="w-full h-full object-cover" onError={(event) => { event.currentTarget.alt = ""; event.currentTarget.style.display = "none"; }} />
                                        ) : (
                                            <span className="text-3xl">⌚</span>
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Product Details */}
                    <div className="space-y-8">
                        {/* Category & Title */}
                        <div>
                            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">
                                {product.category}
                            </p>
                            <h1 className="typo-h1 text-white mb-4">
                                {product.title}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < 4 ? 'text-accent' : 'text-dark-border'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-text-muted">4.8 (128 reviews)</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-4 pb-8 border-b border-dark-border">
                            <span className="font-display text-4xl font-light text-accent">
                                ₹ {product.price}
                            </span>
                            {product.oldPrice && (
                                <>
                                    <span className="text-xl text-text-muted line-through mb-1">
                                        ₹ {product.oldPrice}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs tracking-wider uppercase mb-1">
                                        Save ₹{product.oldPrice - product.price}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <p className="typo-body-sm text-text-secondary leading-relaxed">
                            {product.description || "A masterpiece of Swiss horological excellence, crafted with precision and passion for those who appreciate the finer things in life."}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <motion.button
                                onClick={addToCart}
                                className="flex-1 py-4 rounded-full border border-accent text-accent hover:bg-accent hover:text-dark transition-all duration-300 text-sm tracking-[0.15em] uppercase font-medium"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Add to Cart
                            </motion.button>
                            <motion.button
                                onClick={buy}
                                className="flex-1 py-4 rounded-full bg-accent text-dark hover:bg-accent-alt transition-all duration-300 text-sm tracking-[0.15em] uppercase font-medium shadow-lg"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Buy Now
                            </motion.button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-dark-border">
                            <div className="text-center">
                                <div className="text-2xl mb-2">{"\uD83D\uDCE6"}</div>
                                <p className="text-xs text-text-muted">Free Shipping</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">{"\uD83D\uDEE1\uFE0F"}</div>
                                <p className="text-xs text-text-muted">5-Year Warranty</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">{"\u21A9\uFE0F"}</div>
                                <p className="text-xs text-text-muted">Easy Returns</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="container-lux section-padding-sm">
                <div className="border-t border-dark-border">
                    {/* Tab Headers */}
                    <div className="flex gap-8 overflow-x-auto hide-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative py-4 text-sm tracking-[0.1em] uppercase whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? 'text-accent'
                                        : 'text-text-muted hover:text-white'
                                }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                                        layoutId="activeTab"
                                        transition={{ duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="py-12"
                        >
                            {activeTab === "description" && (
                                <div className="max-w-3xl">
                                    <h3 className="typo-h3 text-white mb-6">Product Description</h3>
                                    <p className="typo-body-sm text-text-secondary leading-relaxed mb-6">
                                        {product.description || "A masterpiece of Swiss horological excellence, crafted with precision and passion for those who appreciate the finer things in life. This timepiece represents the pinnacle of watchmaking artistry, combining traditional techniques with modern innovation."}
                                    </p>
                                    <p className="typo-body-sm text-text-secondary leading-relaxed">
                                        Each watch is meticulously assembled by master watchmakers with decades of experience, ensuring uncompromising quality and precision. The perfect companion for the discerning individual who values both form and function.
                                    </p>
                                </div>
                            )}

                            {activeTab === "specifications" && (
                                <div className="max-w-3xl">
                                    <h3 className="typo-h3 text-white mb-8">Technical Specifications</h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {[
                                            { label: "Movement", value: "Automatic, COSC Certified" },
                                            { label: "Case Material", value: "18K Rose Gold" },
                                            { label: "Glass Type", value: "Sapphire Crystal, AR Coated" },
                                            { label: "Case Size", value: "42mm" },
                                            { label: "Water Resistance", value: "300m / 1000ft" },
                                            { label: "Power Reserve", value: "80 Hours" },
                                            { label: "Dial", value: "Mother of Pearl" },
                                            { label: "Strap", value: "Alligator Leather" }
                                        ].map((spec, index) => (
                                            <div key={index} className="flex justify-between py-4 border-b border-dark-border">
                                                <span className="text-sm text-text-muted uppercase tracking-wider">{spec.label}</span>
                                                <span className="text-sm text-white font-medium">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "shipping" && (
                                <div className="max-w-3xl">
                                    <h3 className="typo-h3 text-white mb-8">Shipping & Warranty</h3>
                                    <div className="space-y-6">
                                        <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                                            <h4 className="typo-h4 text-white mb-3">{"\uD83D\uDE9A"} Shipping Information</h4>
                                            <p className="typo-body-sm text-text-secondary mb-4">
                                                Complimentary worldwide shipping with premium packaging and full insurance coverage. Delivery within 3-5 business days.
                                            </p>
                                            <ul className="space-y-2 text-sm text-text-muted">
                                                <li>{"\u2022"} Express delivery available</li>
                                                <li>{"\u2022"} Secure packaging with authentication certificate</li>
                                                <li>{"\u2022"} Real-time tracking</li>
                                                <li>{"\u2022"} Signature required upon delivery</li>
                                            </ul>
                                        </div>
                                        <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                                            <h4 className="typo-h4 text-white mb-3">{"\uD83D\uDEE1\uFE0F"} Warranty</h4>
                                            <p className="typo-body-sm text-text-secondary mb-4">
                                                Comprehensive 5-year international warranty covering manufacturing defects. Includes complimentary servicing and maintenance.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "reviews" && (
                                <div className="max-w-3xl">
                                    <h3 className="typo-h3 text-white mb-8">Customer Reviews</h3>
                                    <div className="space-y-6">
                                        {[1, 2, 3].map((review) => (
                                            <div key={review} className="bg-dark-card border border-dark-border rounded-2xl p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center">
                                                        <span className="text-accent font-display">JD</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">John Doe</p>
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="typo-quote text-text-secondary">
                                                    "Exceptional craftsmanship and attention to detail. This watch exceeded all my expectations."
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="container-lux section-padding-sm">
                    <div className="text-center mb-12">
                        <span className="typo-label-gold mb-4 block">You May Also Like</span>
                        <h2 className="typo-h1 text-white mb-4">Related Watches</h2>
                        <div className="divider-gold mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.slice(0, 4).map((relatedProduct) => (
                            <motion.div
                                key={relatedProduct._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div
                                    onClick={() => navigate(`/product/${relatedProduct._id}`)}
                                    className="group cursor-pointer bg-dark-card border border-dark-border rounded-2xl overflow-hidden card-hover"
                                >
                                    <div className="aspect-square bg-gradient-to-br from-dark-elevated to-dark-card flex items-center justify-center overflow-hidden">
                                        {relatedProduct.image ? (
                                            <img src={relatedProduct.image} alt={relatedProduct.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(event) => { event.currentTarget.alt = ""; event.currentTarget.style.display = "none"; }} />
                                        ) : (
                                            <span className="text-6xl group-hover:scale-110 transition-transform duration-500">⌚</span>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <p className="text-xs text-accent uppercase tracking-wider mb-2">{relatedProduct.category}</p>
                                        <h3 className="typo-h4 text-white mb-3 group-hover:text-accent transition-colors">
                                            {relatedProduct.title}
                                        </h3>
                                        <p className="typo-price">₹ {relatedProduct.price}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
