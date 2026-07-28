import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function LuxuryFooter() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const footerLinks = {
        "Collections": ["Heritage", "Avant-Garde", "Sport", "Limited Edition", "New Arrivals"],
        "Services": ["Watch Servicing", "Authentication", "Customization", "Trade-In", "Consultation"],
        "About": ["Our Story", "Craftsmanship", "Sustainability", "Careers", "Press"],
        "Connect": ["Contact Us", "Store Locator", "Newsletter", "Instagram", "LinkedIn"]
    };

    return (
        <footer ref={sectionRef} className="relative bg-dark-elevated/50 border-t border-dark-border">
            {/* Background Accent */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[100px]" />
            </div>

            <div className="container-lux relative z-10">
                {/* Main Footer */}
                <div className="section-padding-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
                        {/* Brand Column */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
                        >
                            <div className="mb-6">
                                <h3 className="typo-h3 text-white mb-2">HOROLOGIUM</h3>
                                <div className="divider-gold mb-6" />
                            </div>

                            <p className="typo-body-sm text-text-muted mb-8 max-w-sm">
                                Crafting exceptional timepieces since 1923. Each watch represents
                                the pinnacle of Swiss horological excellence.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-4">
                                {['Instagram', 'LinkedIn', 'Twitter', 'YouTube'].map((social, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
                                    >
                                        <span className="text-xs">{social[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Links Columns */}
                        {Object.entries(footerLinks).map(([title, links], colIndex) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.1 + colIndex * 0.1,
                                    ease: [0.165, 0.84, 0.44, 1]
                                }}
                            >
                                <h4 className="typo-label text-white mb-6">{title}</h4>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-sm text-text-muted hover:text-accent transition-colors duration-300"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Gold Line Separator */}
                <div className="divider-gold-thin" />

                {/* Bottom Bar */}
                <div className="py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Copyright */}
                        <motion.div
                            className="text-center md:text-left"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.5 }}
                        >
                            <p className="text-sm text-text-muted">
                                © 2024 Horologium. All rights reserved.
                            </p>
                        </motion.div>

                        {/* Legal Links */}
                        <motion.div
                            className="flex flex-wrap items-center gap-6"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.6 }}
                        >
                            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="text-sm text-text-muted hover:text-accent transition-colors duration-300"
                                >
                                    {link}
                                </a>
                            ))}
                        </motion.div>

                        {/* Certification */}
                        <motion.div
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.7 }}
                        >
                            <div className="px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
                                <span className="text-xs text-accent tracking-wider uppercase">
                                    Swiss Made
                                </span>
                            </div>
                            <div className="px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
                                <span className="text-xs text-accent tracking-wider uppercase">
                                    COSC
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
}