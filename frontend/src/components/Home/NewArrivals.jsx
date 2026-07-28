import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        name: "Chronograph Elite",
        price: "$12,500",
        category: "New Arrival",
        badge: "Exclusive"
    },
    {
        id: 2,
        name: "Perpetual Calendar",
        price: "$18,900",
        category: "Limited Edition",
        badge: "Limited"
    },
    {
        id: 3,
        name: "Tourbillon Classic",
        price: "$25,000",
        category: "Masterpiece",
        badge: "Rare"
    },
    {
        id: 4,
        name: "Moonphase Aurora",
        price: "$15,750",
        category: "New Release",
        badge: "New"
    }
];

export default function NewArrivals() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="section-padding bg-dark">
            <div className="container-lux">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
                >
                    <span className="typo-label-gold mb-4 block">Just Landed</span>
                    <h2 className="typo-h1 text-white mb-4">New Arrivals</h2>
                    <div className="divider-gold mx-auto mb-6" />
                    <p className="typo-body-sm max-w-2xl mx-auto">
                        Discover our latest additions, each piece meticulously crafted to redefine luxury.
                    </p>
                </motion.div>

                {/* Horizontal Scroll Cards - 2x2 Grid on Desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.7,
                                delay: 0.1 + index * 0.1,
                                ease: [0.165, 0.84, 0.44, 1]
                            }}
                        >
                            <div className="group relative h-full">
                                {/* Product Card */}
                                <div className="relative h-full bg-dark-card border border-dark-border rounded-2xl overflow-hidden card-hover">
                                    {/* Image Placeholder with Gradient */}
                                    <div className="relative aspect-square bg-gradient-to-br from-dark-elevated to-dark-card overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-32 h-32 rounded-full border-2 border-accent/20 bg-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                                <span className="text-6xl">⌚</span>
                                            </div>
                                        </div>

                                        {/* Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="badge-gold px-3 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase">
                                                {product.badge}
                                            </span>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button className="btn-icon bg-dark/80 backdrop-blur-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                            <button className="btn-icon bg-dark/80 backdrop-blur-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <span className="typo-category text-accent mb-2 block">
                                            {product.category}
                                        </span>
                                        <h3 className="typo-h4 text-white mb-3 group-hover:text-accent transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="typo-price-lg">{product.price}</span>
                                            <button className="btn btn-primary btn-sm">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    <Link to="/" className="btn btn-outline btn-lg group">
                        View All New Arrivals
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}