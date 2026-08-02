import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiCheck } from "react-icons/fi";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate password reset API call
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-dark flex">
            {/* Left Side - Luxury Watch Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-dark-elevated/30 border-r border-dark-border">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-accent/5 blur-[120px]" />
                </div>

                <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }}
                        transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        {/* Watch Illustration */}
                        <div className="relative w-80 h-80 mx-auto mb-8">
                            <div className="absolute inset-0 rounded-full border-2 border-accent/20 bg-accent/5 flex items-center justify-center">
                                <div className="w-64 h-64 rounded-full border-2 border-accent/30 bg-linear-to-br from-accent/10 to-transparent flex items-center justify-center">
                                    <span className="text-9xl">⌚</span>
                                </div>
                            </div>
                            {/* Animated Ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full border border-accent/20"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>

                        <h2 className="typo-h2 text-white mb-4">
                            We're Here to <span className="text-accent">Help</span>
                        </h2>
                        <p className="typo-body-sm text-text-secondary max-w-md mx-auto mb-8">
                            Reset your password and regain access to your exclusive account.
                        </p>

                        {/* Brand Message */}
                        <div className="flex items-center justify-center gap-2 text-accent">
                            <div className="w-8 h-px bg-accent" />
                            <span className="text-xs tracking-[0.2em] uppercase">Secure Recovery</span>
                            <div className="w-8 h-px bg-accent" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Forgot Password Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Glassmorphism Card */}
                    <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-3xl p-8 md:p-12 shadow-2xl">
                        {!isSubmitted ? (
                            <>
                                <div className="text-center mb-8">
                                    <h1 className="typo-h2 text-white mb-2">Forgot Password?</h1>
                                    <p className="typo-body-sm text-text-muted">We'll send you a reset link</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email Input */}
                                    <div className="relative">
                                        <label className="block text-xs text-text-muted mb-2 uppercase tracking-wider">Email Address</label>
                                        <div className="relative">
                                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="input w-full py-4 pl-12 pr-4 rounded-xl"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        className="w-full py-4 rounded-full bg-accent text-dark hover:bg-accent-alt transition-all duration-300 text-sm tracking-[0.15em] uppercase font-medium shadow-lg"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Send Reset Link
                                    </motion.button>
                                </form>

                                {/* Back to Login */}
                                <p className="text-center text-sm text-text-muted mt-8">
                                    Remember your password?{" "}
                                    <Link to="/login" className="text-accent hover:text-accent-alt transition-colors font-medium">
                                        Sign In
                                    </Link>
                                </p>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                {/* Success Icon */}
                                <motion.div
                                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border-2 border-green-500/20 flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 15 }}
                                >
                                    <FiCheck className="text-green-400" size={40} />
                                </motion.div>

                                <h2 className="typo-h3 text-white mb-4">Check Your Email</h2>
                                <p className="typo-body-sm text-text-secondary mb-8">
                                    We've sent a password reset link to <span className="text-accent">{email}</span>
                                </p>

                                <Link to="/login">
                                    <motion.button
                                        className="btn btn-primary btn-lg w-full"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Back to Login
                                    </motion.button>
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}