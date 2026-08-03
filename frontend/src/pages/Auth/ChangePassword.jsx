import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiCheck, FiLock } from "react-icons/fi";
import api from "../../api/axios";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", oldPassword: "", newPassword: "", confirmPassword: "" });
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (form.newPassword !== form.confirmPassword) {
            setMsg("New password and confirm password do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.post("/auth/change-password", form);
            setMsg(response.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);

            setMsg(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
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
                            Change your password and regain access to your exclusive account.
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
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Glassmorphism Card */}
                    <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div>
                            <div className="text-center mb-8">
                                <h1 className="typo-h2 text-white mb-2">Change Password</h1>
                                <p className="typo-body-sm text-text-muted">Enter your new password below</p>
                            </div>

                            {msg && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mb-6 p-4 rounded-xl text-sm text-center ${msg.includes("successful")
                                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                                        }`}
                                >
                                    {msg}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div className="relative">
                                    <label className="block text-xs text-text-muted mb-2 uppercase tracking-wider">Email Address</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="your@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="input w-full py-4 pl-12 pr-4 rounded-xl"
                                            required
                                        />
                                    </div>
                                </div>

                                { /* Old Password Input */}
                                <div className="relative">
                                    <label className="block text-xs text-text-muted mb-2 uppercase tracking-wider">Old Password</label>
                                    <div className="relative">
                                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            placeholder="Enter your old password"
                                            value={form.oldPassword}
                                            onChange={handleChange}
                                            className="input w-full py-4 pl-12 pr-4 rounded-xl"
                                            required
                                        />
                                    </div>
                                </div>

                                { /* New Password Input */}
                                <div className="relative">
                                    <label className="block text-xs text-text-muted mb-2 uppercase tracking-wider">New Password</label>
                                    <div className="relative">
                                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                        <input
                                            type="password"
                                            name="newPassword"
                                            placeholder="Enter your new password"
                                            value={form.newPassword}
                                            onChange={handleChange}
                                            className="input w-full py-4 pl-12 pr-4 rounded-xl"
                                            required
                                        />
                                    </div>
                                </div>

                                { /* Confirm Password Input */}
                                <div className="relative">
                                    <label className="block text-xs text-text-muted mb-2 uppercase tracking-wider">Confirm Password</label>
                                    <div className="relative">
                                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm your new password"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            className="input w-full py-4 pl-12 pr-4 rounded-xl"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 rounded-full bg-accent text-dark hover:bg-accent-alt transition-all duration-300 text-sm tracking-[0.15em] uppercase font-medium shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Change Password
                                </motion.button>
                            </form>

                            {/* Back to Login */}
                            {/* <p className="text-center text-sm text-text-muted mt-8">
                                Remember your password?{" "}
                                <Link to="/login" className="text-accent hover:text-accent-alt transition-colors font-medium">
                                    Sign In
                                </Link>
                            </p> */}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ChangePassword