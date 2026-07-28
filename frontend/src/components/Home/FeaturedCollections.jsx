import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const collections = [
    {
        id: 1,
        title: "Heritage",
        subtitle: "Classic Timepieces",
        count: "24 Pieces",
        image: "⌚",
        gradient: "from-amber-900/20 to-stone-900/20"
    },
    {
        id: 2,
        title: "Avant-Garde",
        subtitle: "Modern Design",
        count: "18 Pieces",
        image: "⌚",
        gradient: "from-slate-800/20 to-zinc-900/20"
    },
    {
        id: 3,
        title: "Sport",
        subtitle: "Performance",
        count: "32 Pieces",
        image: "⌚",
        gradient: "from-neutral-800/20 to-stone-900/20"
    },
    {
        id: 4,
        title: "Limited",
        subtitle: "Exclusive Editions",
        count: "12 Pieces",
        image: "⌚",
        gradient: "from-yellow-900/10 to-amber-950/20"
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
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
                >
                    <span className="typo-label-gold mb-4 block">Explore Our World</span>
                    <h2 className="typo-h1 text-white mb-4">Featured Collections</h2>
                    <div className="divider-gold mx-auto mb-6" />
                    <p className="typo-body-sm max-w-2xl mx-auto">
                        Each collection tells a unique story, blending tradition with innovation
                        to create timepieces that transcend generations.
                    </p>
                </motion.div>

                {/* Masonry-style Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden bg-dark-card border border-dark-border card-hover">
                                    {/* Gradient Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-60`} />
                                    
                                    {/* Watch Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-8xl opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-700">
                                            {collection.image}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-between p-8">
                                        <div>
                                            <span className="typo-category text-accent mb-2 block">
                                                {collection.count}
                                            </span>
                                            <h3 className="typo-h4 text-white mb-2 group-hover:text-accent transition-colors">
                                                {collection.title}
                                            </h3>
                                            <p className="typo-body-sm text-text-muted">
                                                {collection.subtitle}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <div className="mt-6 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-xs tracking-[0.15em] uppercase font-medium">
                                                Discover
                                            </span>
                                            <svg
                                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}