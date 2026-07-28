import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const images = [
    { id: 1, emoji: "⌚", aspect: "aspect-square" },
    { id: 2, emoji: "⌚", aspect: "aspect-[3/4]" },
    { id: 3, emoji: "⌚", aspect: "aspect-square" },
    { id: 4, emoji: "⌚", aspect: "aspect-[4/5]" },
    { id: 5, emoji: "⌚", aspect: "aspect-square" },
    { id: 6, emoji: "⌚", aspect: "aspect-[3/4]" }
];

export default function InstagramGallery() {
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
                    <span className="typo-label-gold mb-4 block">@Horologium</span>
                    <h2 className="typo-h1 text-white mb-4">Instagram Gallery</h2>
                    <div className="divider-gold mx-auto mb-6" />
                    <p className="typo-body-sm max-w-2xl mx-auto">
                        Follow us for exclusive behind-the-scenes content and join our
                        community of luxury watch enthusiasts.
                    </p>
                </motion.div>

                {/* Masonry-like Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {images.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                                duration: 0.6,
                                delay: 0.05 * index,
                                ease: [0.165, 0.84, 0.44, 1]
                            }}
                        >
                            <div className={`group relative ${image.aspect} rounded-xl overflow-hidden bg-dark-card border border-dark-border cursor-pointer`}>
                                {/* Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-dark-card to-dark-elevated" />

                                {/* Emoji/Image */}
                                <div className="absolute inset-0 flex items-center justify-center p-6">
                                    <span className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-500">
                                        {image.emoji}
                                    </span>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Follow Button */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-lg group inline-flex"
                    >
                        Follow Us on Instagram
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}