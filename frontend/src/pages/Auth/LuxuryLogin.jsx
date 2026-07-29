import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff, FiLock, FiMail, FiArrowRight, FiCheck } from "react-icons/fi";
import api from "../../api/axios";

export default function LuxuryLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting form:", form);
        setIsLoading(true);
        setMsg("");

        try {
            console.log("Sending login request to API...");
            const res = await api.post("/auth/login", form);
            console.log("Login response:", res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user.id);
            localStorage.setItem("username", res.data.user.name);
            localStorage.setItem("email", res.data.user.email);
            localStorage.setItem("isAdmin", res.data.user.isAdmin);

            setMsg("Login successful!");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            console.log("Error", error);
            console.log("Error response:", error.response);
            setMsg(error.response?.data?.message || "An error occurred");
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
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
                                <div className="w-64 h-64 rounded-full border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center">
                                    <span className="text-9xl">⌚</span>
                                </div>
                            </div>
                            {/* Orbiting Dots */}
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-2 h-2 rounded-full bg-accent/40"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: `rotate(${i * 60}deg) translateX(140px) translateY(-50%)`,
                                        transformOrigin: 'center'
                                    }}
                                />
                            ))}
                        </div>

                        <h2 className="typo-h2 text-white mb-4">
                            Timeless <span className="text-accent">Elegance</span>
                        </h2>
                        <p className="typo-body-sm text-text-secondary max-w-md mx-auto mb-8">
                            Experience the pinnacle of Swiss horological excellence. Each timepiece is crafted for those who appreciate the finer things in life.
                        </p>

                        {/* Brand Message */}
                        <div className="flex items-center justify-center gap-2 text-accent">
                            <div className="w-8 h-px bg-accent" />
                            <span className="text-xs tracking-[0.2em] uppercase">Est. 1923</span>
                            <div className="w-8 h-px bg-accent" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Glassmorphism Card */}
                    <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="text-center mb-8">
                            <h1 className="typo-h2 text-white mb-2">Welcome Back</h1>
                            <p className="typo-body-sm text-text-muted">Sign in to your account</p>
                        </div>

                        {msg && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mb-6 p-4 rounded-xl text-sm text-center ${
                                    msg.includes("successful")
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
                                <label className="block text-xs text-text-muted mb-2 uppercase tracking-wider">Email</label>
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

                            {/* Password Input */}
                            <div className="relative">
                                <label className="block text-xs text-text-muted mb-2 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="input w-full py-4 pl-12 pr-12 rounded-xl"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors"
                                    >
                                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-dark-border bg-dark-card text-accent focus:ring-accent"
                                    />
                                    <span className="text-sm text-text-muted">Remember me</span>
                                </label>
                                <Link to="/forgot-password" className="text-sm text-accent hover:text-accent-alt transition-colors">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 rounded-full bg-accent text-dark hover:bg-accent-alt transition-all duration-300 text-sm tracking-[0.15em] uppercase font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="divider" />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-card px-4 text-xs text-text-muted">
                                OR
                            </span>
                        </div>

                        {/* Google Login */}
                        <motion.button
                            className="w-full py-4 rounded-full border border-dark-border text-white hover:border-accent/30 hover:bg-dark-elevated/50 transition-all duration-300 flex items-center justify-center gap-3"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.03 2.53-2.18 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </motion.button>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-text-muted mt-8">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-accent hover:text-accent-alt transition-colors font-medium">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
