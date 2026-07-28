import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const reviews = [
    {
        id: 1,
        name: "Alexander V.",
        role: "Collector",
        rating: 5,
        text: "The attention to detail is extraordinary. This is what true luxury timekeeping represents.",
        initials: "AV"
    },
    {
        id: 2,
        name: "Isabella M.",
        role: "Entrepreneur",
        rating: 5,
        text: "Exceptional craftsmanship and service. My Heritage Automatic has become my most prized possession.",
        initials: "IM"
    },
    {
        id: 3,
        name: "William T.",
        role: "Executive",
        rating: 5,
        text: "Worth every penny. The build quality and elegance surpass even my highest expectations.",
        initials: "WT"
    },
    {
        id: 4,
        name: "Sophia L.",
        role: "Designer",
        rating: 5,
        text: "A perfect blend of form and function. The design philosophy speaks volumes.",
        initials: "SL"
    }
];

export default function CustomerReviews() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="section-padding bg-dark">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full bg-accent/3 blur-[100px]" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/2 blur-[80px]" />
            </div>

            <div className="container-lux relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
                >
                    <span className="typo-label-gold mb-4 block">Testimonials</span>
                    <h2 className="typo-h1 text-white mb-4">Customer Reviews</h2>
                    <div className="divider-gold mx-auto mb-6" />
                    <p className="typo-body-sm max-w-2xl mx-auto">
                        Hear from our distinguished clients who have experienced the
                        pinnacle of horological excellence.
                    </p>
                </motion.div>

                {/* Horizontal Scroll Layout */}
                <div className="relative">
                    <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                className="min-w-[350px] md:min-w-[400px] snap-center"
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.1 + index * 0.1,
                                    ease: [0.165, 0.84, 0.44, 1]
                                }}
                            >
                                <div className="h-full bg-dark-card border border-dark-border rounded-2xl p-8 card-hover relative">
                                    {/* Quote Mark */}
                                    <div className="absolute top-6 right-8 text-6xl text-accent/10 font-serif leading-none">
                                        "
                                    </div>

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Review Text */}
                                    <p className="typo-quote text-text-secondary mb-8 leading-relaxed">
                                        "{review.text}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center">
                                            <span className="text-lg font-display text-accent font-light">
                                                {review.initials}
                                            </span>
                                        </div>

                                        <div>
                                            <div className="typo-product-name text-white">
                                                {review.name}
                                            </div>
                                            <div className="typo-category text-text-muted">
                                                {review.role}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gold Accent Line */}
                                    <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* View All Reviews Button */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    <button className="btn btn-outline btn-lg group">
                        Read All Reviews
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
                </motion.div>
            </div>
        </section>
    );
}