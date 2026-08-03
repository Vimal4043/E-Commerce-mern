import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiInstagram, FiLinkedin, FiGithub } from "react-icons/fi";

export default function LuxuryFooter() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const exploreLinks = [
        { name: "Home", href: "/" },
        { name: "Cart", href: "/cart" },
        { name: "Orders", href: "/orders" },
        { name: "Profile", href: "/profile" }
    ];

    const socialLinks = [
        { icon: FiGithub, href: "https://github.com/Vimal4043", label: "GitHub" },
        { icon: FiLinkedin, href: "https://www.linkedin.com/in/vimal-kumar-bb3258218", label: "LinkedIn" },
        { icon: FiInstagram, href: "https://www.instagram.com/vimal_.kr/", label: "Instagram" }
    ];

    return (
        <footer className="relative bg-dark-elevated/30 border-t border-dark-border overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute bottom-0 left-1/4 w-60 h-60 sm:w-125 sm:h-125 rounded-full bg-accent/3 blur-[100px]" />
            </div>

            <div className="relative z-10">
                {/* Main Footer */}
                <div className="container-lux py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Logo */}
                            <Link to="/" className="inline-block mb-6">
                                <h2 className="typo-h4 text-white mb-2">HOROLOGIUM</h2>
                                <div className="divider-gold" />
                            </Link>

                            {/* About Brand */}
                            <p className="typo-body-sm text-text-muted mb-8 leading-relaxed">
                                Curated luxury timepieces where timeless design meets modern precision.
                            </p>
                        </motion.div>

                        {/* Explore */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h3 className="typo-label text-white mb-6">Explore</h3>
                            <ul className="space-y-3">
                                {exploreLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.href}
                                            className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2 group"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Connect With Us */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="typo-label text-white mb-6">Connect With Us</h3>
                            <ul className="space-y-3">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <li key={social.label}>
                                            <a
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2 group"
                                            >
                                                <Icon size={16} />
                                                <span>{social.label}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>

                        {/* Get in Touch */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h3 className="typo-label text-white mb-6">Get in Touch</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-text-muted">
                                    <FiMail className="text-accent" size={16} />
                                    <a
                                        href="mailto:vimalkumar40437@gmail.com"
                                        className="hover:text-accent transition-colors"
                                    >
                                        vimalkumar40437@gmail.com
                                    </a>
                                </div>
                                {/* <div className="flex items-center gap-3 text-sm text-text-muted">
                                    <FiPhone className="text-accent" size={16} />
                                    <span>+91 12345 67890</span>
                                </div> */}
                            </div>

                            <a
                                href="https://github.com/Vimal4043/E-Commerce-mern"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary px-4 py-2 rounded-xl inline-flex items-center gap-2"
                            >
                                <FiGithub size={18} />
                                View Code
                            </a>
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
                            © {new Date().getFullYear()} HOROLOGIUM • Designed & Developed by{" "}
                            <a
                                href="https://github.com/Vimal4043"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline"
                            >
                                Vimal Kumar
                            </a>
                        </motion.p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
