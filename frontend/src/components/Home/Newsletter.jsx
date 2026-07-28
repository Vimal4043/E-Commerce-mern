import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Newsletter() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="section-padding bg-dark">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
            </div>

            <div className="container-lux relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <span className="inline-block px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs tracking-[0.15em] uppercase mb-8">
                            Exclusive Access
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        className="typo-h1 text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        Join Our Inner Circle
                    </motion.h2>

                    {/* Divider */}
                    <motion.div
                        className="divider-gold mx-auto mb-8"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
                    />

                    {/* Description */}
                    <motion.p
                        className="typo-body-sm text-text-secondary max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        Subscribe to receive exclusive previews of new collections, invitations to
                        private events, and insights into the world of fine watchmaking.
                    </motion.p>

                    {/* Form */}
                    <motion.form
                        className="max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="input flex-1 px-6 py-4 rounded-full bg-dark-card border border-dark-border focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,164,93,0.08)] transition-all"
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg px-8 rounded-full group whitespace-nowrap"
                            >
                                Subscribe Now
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        {/* Privacy Note */}
                        <p className="text-xs text-text-muted mt-6">
                            By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
                        </p>
                    </motion.form>

                    {/* Stats */}
                    <motion.div
                        className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-dark-border"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <div>
                            <div className="typo-price-lg mb-2">50K+</div>
                            <div className="typo-category">Subscribers</div>
                        </div>
                        <div>
                            <div className="typo-price-lg mb-2">120+</div>
                            <div className="typo-category">Countries</div>
                        </div>
                        <div>
                            <div className="typo-price-lg mb-2">Weekly</div>
                            <div className="typo-category">Insights</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}