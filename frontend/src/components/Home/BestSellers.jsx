import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        name: "Heritage Automatic",
        price: "$8,500",
        sales: "2,847",
        rating: 4.9
    },
    {
        id: 2,
        name: "Diver Professional",
        price: "$6,200",
        sales: "3,156",
        rating: 4.8
    },
    {
        id: 3,
        name: "Elegance Dress",
        price: "$9,800",
        sales: "2,543",
        rating: 5.0
    },
    {
        id: 4,
        name: "Pilot Chronograph",
        price: "$11,400",
        sales: "1,987",
        rating: 4.9
    }
];

export default function BestSellers() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="section-padding bg-dark-elevated/30">
            <div className="container-lux">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
                >
                    <span className="typo-label-gold mb-4 block">Most Coveted</span>
                    <h2 className="typo-h1 text-white mb-6">Best Sellers</h2>
                    <div className="divider-gold mx-auto mb-8" />
                    <p className="typo-body text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Join thousands of discerning collectors who have made these iconic
                        timepieces part of their legacy.
                    </p>
                </motion.div>

                {/* Best Sellers List */}
                <div className="space-y-4">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                                duration: 0.7,
                                delay: 0.1 + index * 0.15,
                                ease: [0.165, 0.84, 0.44, 1]
                            }}
                        >
                            <div className="group relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden card-hover">
                                <div className="grid md:grid-cols-12 gap-6 items-center p-6">
                                    {/* Rank Number */}
                                    <div className="md:col-span-1 text-center">
                                        <div className="typo-price-lg text-accent/40 group-hover:text-accent transition-colors duration-300">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                    </div>

                                    {/* Product Image */}
                                    <div className="md:col-span-3">
                                        <div className="relative aspect-square max-w-[180px] mx-auto md:mx-0 bg-gradient-to-br from-dark-elevated to-dark-card rounded-xl overflow-hidden border border-dark-border">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-20 h-20 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                                    <span className="text-4xl">⌚</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="md:col-span-4 text-center md:text-left">
                                        <span className="typo-category text-accent mb-2 block">
                                            Best Seller
                                        </span>
                                        <h3 className="typo-h4 text-white mb-3 group-hover:text-accent transition-colors duration-300">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-4 justify-center md:justify-start text-sm">
                                            <div className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-white font-medium">{product.rating}</span>
                                            </div>
                                            <span className="text-text-muted">•</span>
                                            <span className="text-text-muted text-sm">
                                                {product.sales} sold
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-6">
                                        <div className="text-center md:text-right">
                                            <div className="typo-price">{product.price}</div>
                                        </div>
                                        <button className="btn btn-primary btn-sm whitespace-nowrap">
                                            Add to Cart
                                        </button>
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
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    <Link to="/" className="btn btn-outline btn-lg group">
                        View All Best Sellers
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