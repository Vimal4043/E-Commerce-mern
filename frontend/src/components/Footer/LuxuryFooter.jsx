import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock, FiArrowRight, FiInstagram, FiLinkedin, FiTwitter, FiFacebook } from "react-icons/fi";

export default function LuxuryFooter() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const collections = [
        { name: "Heritage", href: "#" },
        { name: "Avant-Garde", href: "#" },
        { name: "Sport", href: "#" },
        { name: "Limited Edition", href: "#" },
        { name: "New Arrivals", href: "/shop" }
    ];

    const customerService = [
        { name: "Contact Us", href: "/contact-us" },
        { name: "Shipping Info", href: "#" },
        { name: "Returns & Exchanges", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Size Guide", href: "#" }
    ];

    const socialLinks = [
        { icon: FiInstagram, href: "https://instagram.com/horologium", label: "Instagram" },
        { icon: FiLinkedin, href: "https://linkedin.com/company/horologium", label: "LinkedIn" },
        { icon: FiTwitter, href: "https://twitter.com/horologium", label: "Twitter" },
        { icon: FiFacebook, href: "https://facebook.com/horologium", label: "Facebook" }
    ];

    return (
        <footer className="relative bg-dark-elevated/30 border-t border-dark-border overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[100px]" />
            </div>

            <div className="relative z-10">
                {/* Main Footer */}
                <div className="container-lux py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
                        {/* Brand Column */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Luxury Logo */}
                            <Link to="/" className="inline-block mb-6">
                                <h2 className="typo-h3 text-white mb-2">HOROLOGIUM</h2>
                                <div className="divider-gold" />
                            </Link>

                            {/* About Brand */}
                            <p className="typo-body-sm text-text-muted mb-8 leading-relaxed">
                                Crafting exceptional timepieces since 1923. Each watch represents
                                the pinnacle of Swiss horological excellence, designed for those
                                who appreciate the finer things in life.
                            </p>

                            {/* Social Media */}
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Icon size={18} />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Collections */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h3 className="typo-label text-white mb-6">Collections</h3>
                            <ul className="space-y-3">
                                {collections.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.href}
                                            className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2 group"
                                        >
                                            <FiArrowRight
                                                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                                size={14}
                                            />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Customer Service */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="typo-label text-white mb-6">Customer Service</h3>
                            <ul className="space-y-3">
                                {customerService.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.href}
                                            className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2 group"
                                        >
                                            <FiArrowRight
                                                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                                size={14}
                                            />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Newsletter */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h3 className="typo-label text-white mb-6">Newsletter</h3>
                            <p className="typo-body-sm text-text-muted mb-4">
                                Subscribe to receive exclusive updates on new collections and special offers.
                            </p>
                            <form className="flex gap-2 mb-6" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input flex-1 py-3 rounded-xl"
                                    required
                                />
                                <button type="submit" className="btn btn-primary px-6 rounded-xl">
                                    <FiMail size={18} />
                                </button>
                            </form>

                            {/* Contact Information */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-text-muted">
                                    <FiMapPin className="text-accent" size={16} />
                                    <span>123 Luxury Avenue, Geneva, Switzerland</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-text-muted">
                                    <FiPhone className="text-accent" size={16} />
                                    <span>+41 123 456 7890</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-text-muted">
                                    <FiClock className="text-accent" size={16} />
                                    <span>Mon - Fri: 9:00 AM - 6:00 PM CET</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Gold Line Separator */}
                <div className="divider-gold-thin" />

                {/* Bottom Bar */}
                <div className="container-lux py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <motion.p
                            className="text-sm text-text-muted"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: mounted ? 1 : 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            © {new Date().getFullYear()} Horologium. All rights reserved.
                        </motion.p>

                        {/* Legal Links */}
                        <motion.div
                            className="flex flex-wrap items-center gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: mounted ? 1 : 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Link to="#" className="text-sm text-text-muted hover:text-accent transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="#" className="text-sm text-text-muted hover:text-accent transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="#" className="text-sm text-text-muted hover:text-accent transition-colors">
                                Cookie Policy
                            </Link>
                        </motion.div>

                        {/* Certifications */}
                        <motion.div
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: mounted ? 1 : 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
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