import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FiChevronDown, FiArrowRight, FiShield, FiClock, FiDroplet } from "react-icons/fi";
import { fadeInUp, fadeInScale, staggerContainer, imageZoom, goldLineAnimation, floatingAnimation } from "../../utils/animations";

// ---------- Floating spec cards data ----------
const specs = [
    { icon: FiClock, label: "Swiss Movement", value: "COSC Certified" },
    { icon: FiDroplet, label: "Water Resistance", value: "300m / 1000ft" },
    { icon: FiShield, label: "Sapphire Crystal", value: "Scratch-Proof" },
];

export default function Hero() {
    const sectionRef = useRef(null);
    const specsRef = useRef(null);
    const isSpecsInView = useInView(specsRef, { once: true, margin: "-80px" });
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.6]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen overflow-hidden"
        >
            {/* ---------- Background Layers ---------- */}
            {/* Radial lighting */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 sm:w-200 sm:h-200 rounded-full bg-accent/3 blur-[120px]" />
                <div className="absolute bottom-0 left-1/3 w-75 h-75 sm:w-150 sm:h-150 rounded-full bg-accent/2 blur-[100px]" />
                <div className="absolute top-1/3 right-1/4 w-50 h-50 sm:w-100 sm:h-100 rounded-full bg-white/2 blur-[80px]" />
            </div>

            {/* Dark overlay for scroll effect */}
            <motion.div
                className="absolute inset-0 z-10 bg-dark"
                style={{ opacity: overlayOpacity }}
            />

            {/* ---------- Main Content ---------- */}
            <div className="relative z-20 w-full h-full">
                <div className="container-lux min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-16 pt-24 lg:py-16">

                    {/* Left: Text Content */}
                    <motion.div
                        className="flex-1 w-full max-w-xl text-center lg:text-left"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Premium badge */}
                        {/* <motion.span
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-[11px] tracking-[0.2em] uppercase mb-10"
                            variants={fadeInUp}
                            custom={0}
                            aria-label="Swiss Made since 1923"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
                            Swiss Made Since 1923
                        </motion.span> */}

                        {/* Main headline */}
                        <motion.h1
                            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] text-white mb-6"
                            variants={fadeInUp}
                            custom={0.15}
                        >
                            Crafted For
                            <br />
                            <span className="text-accent">Generations</span>
                        </motion.h1>

                        {/* Gold divider */}
                        <motion.div
                            className="divider-gold mx-auto lg:mx-0 mb-8"
                            variants={goldLineAnimation}
                        />

                        {/* Subheadline */}
                        <motion.p
                            className="text-base sm:text-lg text-text-secondary max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
                            variants={fadeInUp}
                            custom={0.4}
                        >
                            Every timepiece is a masterpiece of precision engineering,
                            born from decades of Swiss horological tradition and
                            uncompromising artistry.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 justify-center lg:justify-start"
                            variants={fadeInUp}
                            custom={0.55}
                        >
                            <button
                                onClick={() =>
                                    document.getElementById("products")?.scrollIntoView({
                                        behavior: "smooth",
                                    })
                                }
                                className="btn btn-primary btn-lg group w-full sm:w-auto"
                                aria-label="Explore our collection of luxury watches"
                            >
                                Explore Collection
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                            </button>
                            <Link
                                to="/contact-us"
                                className="btn btn-outline btn-lg w-full sm:w-auto"
                                aria-label="Visit our virtual showroom"
                            >
                                Contact Us
                            </Link>
                        </motion.div>
                        {/* Mobile Specs */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 lg:hidden w-full">
                            {specs.map((spec) => (
                                <div
                                    key={spec.label}
                                    className="glass-strong rounded-xl p-4 border border-white/6 flex items-center gap-3"
                                >
                                    <spec.icon className="text-accent shrink-0" size={18} />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.12em] text-text-muted">
                                            {spec.label}
                                        </p>
                                        <p className="text-sm text-white font-medium">
                                            {spec.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Watch Image */}
                    <motion.div
                        className="hidden lg:flex flex-1 items-center justify-center relative"
                        style={{ y: heroY, opacity: heroOpacity }}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInScale}
                        custom={0.3}
                    >
                        {/* Glass ring decoration */}
                        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 lg:w-lg lg:h-lg rounded-full border border-accent/10 glass-card" />

                        {/* Inner glass ring */}
                        <div className="absolute w-56 h-56 sm:w-72 sm:h-72 lg:w-104 lg:h-104 rounded-full border border-white/4 glass" />

                        {/* Watch image with subtle scale on scroll */}
                        <motion.div
                            className="relative z-10 w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
                            style={{ scale: imageScale }}
                        >
                            <div className="w-full h-full rounded-full bg-dark-card border border-dark-border overflow-hidden shadow-2xl flex items-center justify-center">
                                {/* Premium watch placeholder */}
                                <div className="text-center p-8">
                                    <div className="w-32 h-32 md:w-44 md:h-44 mx-auto rounded-full bg-linear-to-br from-accent/10 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                                        <span className="text-5xl md:text-6xl font-display text-accent font-light">⌚</span>
                                    </div>
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-text-muted">
                                        Horologium<br />
                                        <span className="text-accent">Chronograph</span>
                                    </p>
                                </div>
                            </div>

                            {/* Gold accent ring */}
                            <div className="absolute -inset-4 rounded-full border border-accent/10 opacity-50" />
                        </motion.div>

                        {/* Floating specs on the right side of the image */}
                        <motion.div
                            ref={specsRef}
                            className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10"
                            initial="hidden"
                            animate={isSpecsInView ? "visible" : "hidden"}
                            variants={staggerContainer}
                        >
                            {specs.map((spec, i) => (
                                <motion.div
                                    key={spec.label}
                                    className="glass-strong rounded-xl px-4 py-3 w-40 flex items-center gap-3 border border-white/6"
                                    variants={{
                                        hidden: { opacity: 0, x: 20, scale: 0.9 },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                            scale: 1,
                                            transition: { duration: 0.6, delay: 0.8 + i * 0.15, ease: [0.165, 0.84, 0.44, 1] }
                                        }
                                    }}
                                    whileHover={{ scale: 1.05, x: -4 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <spec.icon size={16} className="text-accent shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-text-muted">{spec.label}</span>
                                        <span className="text-[11px] sm:text-xs font-medium text-white">{spec.value}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* ---------- Bottom: Scroll Indicator ---------- */}
            <motion.div
                className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted">
                    Scroll to explore
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FiChevronDown size={16} className="text-text-muted" />
                </motion.div>
            </motion.div>
        </section>
    );
}
