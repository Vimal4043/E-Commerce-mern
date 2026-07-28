import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BrandStory() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const milestones = [
        { year: "1923", title: "Founded", description: "Established in Geneva, Switzerland" },
        { year: "1952", title: "Innovation", description: "First in-house automatic movement" },
        { year: "1985", title: "Global", description: "Timepieces in 40 countries" },
        { year: "2024", title: "Legacy", description: "A century of horological excellence" }
    ];

    return (
        <section ref={sectionRef} className="section-padding bg-dark-elevated/30">
            <div className="container-lux">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Timeline/Milestones */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <span className="typo-label-gold mb-4 block">
                            Our Heritage
                        </span>
                        <h2 className="typo-h1 text-white mb-6">
                            Brand Story
                        </h2>
                        <div className="divider-gold mx-auto lg:mx-0 mb-8" />
                        <p className="typo-body-sm text-text-secondary mb-12 leading-relaxed">
                            For over a century, Horologium has been crafting exceptional timepieces 
                            that embody the pinnacle of Swiss horological excellence. Each watch 
                            represents generations of tradition, innovation, and uncompromising 
                            dedication to the art of watchmaking.
                        </p>

                        {/* Timeline */}
                        <div className="relative">
                            <div className="absolute left-4 top-0 bottom-0 w-px bg-accent/20" />
                            <div className="space-y-8">
                                {milestones.map((milestone, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative pl-16"
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.2 + index * 0.15,
                                            ease: [0.165, 0.84, 0.44, 1]
                                        }}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-accent border-4 border-dark-elevated" />

                                        <div>
                                            <div className="typo-price text-accent mb-1">
                                                {milestone.year}
                                            </div>
                                            <h3 className="typo-h4 text-white mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="typo-body-sm text-text-muted">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Image Grid */}
                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <div className="space-y-4">
                            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-dark-card to-dark-elevated border border-dark-border overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-7xl">⌚</span>
                                </div>
                            </div>
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 overflow-hidden flex items-center justify-center">
                                <div className="text-center">
                                    <div className="typo-price-lg mb-1">100+</div>
                                    <div className="typo-category">Years Legacy</div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-dark-card to-dark-elevated border border-dark-border overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-7xl">⌚</span>
                                </div>
                            </div>
                            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-dark-card to-dark-elevated border border-dark-border overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-7xl">⌚</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}