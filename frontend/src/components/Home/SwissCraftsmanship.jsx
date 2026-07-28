import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SwissCraftsmanship() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const features = [
        {
            icon: "⚙️",
            title: "Swiss Movement",
            description: "COSC certified automatic movements with 80-hour power reserve"
        },
        {
            icon: "💎",
            title: "Sapphire Crystal",
            description: "Scratch-resistant sapphire with anti-reflective coating"
        },
        {
            icon: "🌊",
            title: "Water Resistant",
            description: "Professional diving grade 300m water resistance"
        },
        {
            icon: "🛡️",
            title: "5-Year Warranty",
            description: "Comprehensive coverage for complete peace of mind"
        }
    ];

    return (
        <section ref={sectionRef} className="section-padding bg-dark">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/2 blur-[80px]" />
            </div>

            <div className="container-lux relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        className="order-2 lg:order-1"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <span className="typo-label-gold mb-4 block">
                            Uncompromising Quality
                        </span>
                        <h2 className="typo-h1 text-white mb-6">
                            Swiss Craftsmanship
                        </h2>
                        <div className="divider-gold mx-auto lg:mx-0 mb-8" />
                        <p className="typo-body-sm text-text-secondary mb-12 leading-relaxed">
                            Each timepiece is assembled by master watchmakers with decades of experience,
                            combining traditional techniques with cutting-edge precision engineering.
                        </p>

                        {/* Features Grid - Offset Layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.2 + index * 0.1,
                                        ease: [0.165, 0.84, 0.44, 1]
                                    }}
                                >
                                    <div className="group">
                                        <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
                                            {feature.icon}
                                        </div>
                                        <h3 className="typo-h4 text-white mb-3 group-hover:text-accent transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="typo-body-sm text-text-secondary">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Visual - Centered Watch */}
                    <motion.div
                        className="order-1 lg:order-2 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <div className="relative">
                            {/* Concentric Circles */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-accent/5" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[250px] h-[250px] md:w-[330px] md:h-[330px] rounded-full border border-accent/10" />
                            </div>

                            {/* Main Circle */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-dark-card to-dark-elevated border border-dark-border shadow-2xl flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full border-2 border-accent/30 bg-accent/5 flex items-center justify-center mb-4">
                                        <span className="text-7xl md:text-8xl">⌚</span>
                                    </div>
                                    <p className="typo-category">Swiss Made</p>
                                </div>
                            </div>

                            {/* Orbiting Dots */}
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-2 h-2 rounded-full bg-accent/40"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: `rotate(${i * 45}deg) translateX(${i % 2 === 0 ? '180px' : '200px'}) translateY(-50%)`
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}