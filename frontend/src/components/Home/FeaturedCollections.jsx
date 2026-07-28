import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const collections = [
    {
        id: 1,
        title: "Classic",
        subtitle: "Timeless Elegance",
        count: "24 Models",
        image: "⌚",
        gradient: "from-dark-elevated to-dark-card"
    },
    {
        id: 2,
        title: "Dress",
        subtitle: "Refined Sophistication",
        count: "18 Models",
        image: "⌚",
        gradient: "from-dark-elevated to-dark-card"
    },
    {
        id: 3,
        title: "Diver",
        subtitle: "Professional Grade",
        count: "32 Models",
        image: "⌚",
        gradient: "from-dark-elevated to-dark-card"
    },
    {
        id: 4,
        title: "Chronograph",
        subtitle: "Precision Instruments",
        count: "24 Models",
        image: "⌚",
        gradient: "from-dark-elevated to-dark-card"
    }
];

export default function FeaturedCollections() {
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
                    <span className="typo-label-gold mb-4 block">Our Collections</span>
                    <h2 className="typo-h1 text-white mb-6">Exceptional Timepieces</h2>
                    <div className="divider-gold mx-auto mb-8" />
                    <p className="typo-body text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Each collection represents a distinct philosophy of horological excellence,
                        from classic dress watches to professional diving instruments.
                    </p>
                </motion.div>

                {/* Collections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.7,
                                delay: 0.15 + index * 0.1,
                                ease: [0.165, 0.84, 0.44, 1]
                            }}
                        >
                            <Link to="/" className="group block h-full">
                                <div className="relative h-[28rem] lg:h-[32rem] rounded-2xl overflow-hidden bg-dark-card border border-dark-border card-hover">
                                    {/* Minimal Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/80 opacity-80" />
                                    
                                    {/* Watch Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-7xl opacity-10 group-hover:scale-125 group-hover:opacity-20 transition-all duration-700 ease-out">
                                            {collection.image}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-end p-8">
                                        <div>
                                            <span className="typo-category text-accent mb-3 block">
                                                {collection.count}
                                            </span>
                                            <h3 className="typo-h3 text-white mb-3 group-hover:text-accent transition-colors duration-300">
                                                {collection.title}
                                            </h3>
                                            <p className="typo-body-sm text-text-secondary">
                                                {collection.subtitle}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <div className="mt-8 flex items-center gap-3 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <span className="text-xs tracking-[0.2em] uppercase font-medium">
                                                Explore
                                            </span>
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Gold Accent Line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}