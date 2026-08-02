import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function PremiumFeatures() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const features = [
        {
            icon: "📦",
            title: "Complimentary Shipping",
            description: "Secure worldwide delivery with premium packaging and full insurance"
        },
        {
            icon: "⚙️",
            title: "Lifetime Maintenance",
            description: "Expert servicing and care for generations of precision"
        },
        {
            icon: "🔍",
            title: "Certificate of Authenticity",
            description: "Official documentation of provenance and Swiss quality"
        },
        {
            icon: "💬",
            title: "Personal Horologist",
            description: "Dedicated specialist for personalized timepiece guidance"
        }
    ];

    return (
        <section ref={sectionRef} className="section-padding bg-dark">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-accent/5 blur-[120px]" />
            </div>

            <div className="container-lux relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
                >
                    <span className="typo-label-gold mb-4 block">Beyond Time</span>
                    <h2 className="typo-h2 text-white mb-4">Premium Features</h2>
                    <div className="divider-gold mx-auto mb-6" />
                    <p className="typo-body-sm max-w-2xl mx-auto">
                        Every Horologium timepiece comes with an elevated ownership experience,
                        ensuring your watch remains a treasured legacy for generations.
                    </p>
                </motion.div>

                {/* Features Grid - Circular Layout */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Center Circle */}
                    {/* <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-dark-card to-dark-elevated border-2 border-accent/20 flex items-center justify-center z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <div className="text-center">
                            <div className="text-5xl mb-2">⌚</div>
                            <div className="typo-label-gold text-[10px]">Excellence</div>
                        </div>
                    </motion.div> */}

                    {/* Feature Cards in Circle */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-10">
                        {features.map((feature, index) => {
                            const angles = [0, 90, 180, 270];
                            const delay = 0.4 + index * 0.15;

                            return (
                                <motion.div
                                    key={index}
                                    className="relative"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.7,
                                        delay,
                                        ease: [0.165, 0.84, 0.44, 1]
                                    }}
                                >
                                    <div className="group text-center">
                                        {/* Icon Circle */}
                                        <div className="relative w-24 h-24 mx-auto mb-6 rounded-full bg-dark-card border border-dark-border flex items-center justify-center group-hover:border-accent/30 transition-all duration-500 group-hover:scale-110">
                                            <div className="absolute inset-0 rounded-full bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="text-4xl relative z-10">{feature.icon}</span>
                                        </div>

                                        <h3 className="typo-h4 text-white mb-3 group-hover:text-accent transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="typo-body-sm text-text-muted">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}