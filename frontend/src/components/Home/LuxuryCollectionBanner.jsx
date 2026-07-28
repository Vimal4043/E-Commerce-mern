import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function LuxuryCollectionBanner() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="section-padding overflow-hidden bg-dark">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[100px]" />
            </div>

            <div className="container-lux relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left: Image/Visual */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                            {/* Main Watch Display */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-dark-card to-dark-elevated border border-dark-border overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center">
                                            <span className="text-9xl">⌚</span>
                                        </div>
                                        {/* Rotating Ring */}
                                        <div className="absolute inset-0 rounded-full border border-dashed border-accent/20 animate-spin"
                                            style={{ animationDuration: "20s", animationTimingFunction: "linear" }} />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-accent/20 bg-accent/5" />
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full border border-accent/10 bg-accent/3" />
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        className="text-center lg:text-left"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <span className="typo-label-gold mb-6 block">
                            The Pinnacle of Excellence
                        </span>
                        <h2 className="typo-h1 text-white mb-6">
                            Luxury Collection
                        </h2>
                        <div className="divider-gold mx-auto lg:mx-0 mb-8" />
                        <p className="typo-body text-text-secondary mb-12 leading-relaxed">
                            Experience the epitome of horological artistry. Our luxury collection
                            features timepieces crafted from the finest materials, each one a
                            testament to centuries of Swiss watchmaking tradition.
                        </p>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-3 gap-8 mb-12">
                            <div className="text-center">
                                <div className="typo-price-lg mb-2">18K</div>
                                <div className="typo-category">Gold</div>
                            </div>
                            <div className="text-center">
                                <div className="typo-price-lg mb-2">100</div>
                                <div className="typo-category">Meter WR</div>
                            </div>
                            <div className="text-center">
                                <div className="typo-price-lg mb-2">72</div>
                                <div className="typo-category">Hr Reserve</div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                            <Link to="/" className="btn btn-primary btn-lg group" aria-label="Explore luxury collection">
                                Explore Collection
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
                            <Link to="/" className="btn btn-outline btn-lg" aria-label="Book an appointment">
                                Book Appointment
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}