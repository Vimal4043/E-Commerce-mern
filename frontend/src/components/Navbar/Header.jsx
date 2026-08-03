import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import Nav from "./Nav";
import { FiSearch, FiHome, FiShoppingBag, FiUser } from "react-icons/fi";
import { badgeBounce, fadeInUp, iconHover, navLinkHover } from "../../utils/animations";

export default function Header() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef(null);
    const userId = localStorage.getItem("userId");
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [mounted, setMounted] = useState(false);

    // Scroll detection for glass effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close search on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const loadUser = async () => {
        if (!userId) return;
        try {
            const res = await api.get(`/user/${userId}`);
            setUser(res.data);
        } catch {
            // silent
        }
    };

    useEffect(() => {
        loadUser();

        const loadCart = async () => {
            try {
                if (!userId) {
                    setCartCount(0);
                    return;
                }
                const res = await api.get(`/cart`);
                const items = res.data?.items || [];
                const total = items.reduce((sum, item) => sum + item.quantity, 0);
                setCartCount(total);
            } catch {
                setCartCount(0);
            }
        };

        loadCart();

        window.addEventListener("cartUpdated", loadCart);
        return () => {
            window.removeEventListener("cartUpdated", loadCart);
        };
    }, [userId]);

    const formatName = (name) => {
        return name
            ?.trim()
            .split(/\s+/)
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
    };

    // Check admin status from API
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && userId) {
            const checkAdminStatus = async () => {
                try {
                    const response = await api.get("/user/check-admin");
                    setIsAdmin(response.data.isAdmin);
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    setIsAdmin(false);
                }
            };
            checkAdminStatus();
        } else {
            setIsAdmin(false);
        }
    }, [userId]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const logout = () => {
        localStorage.clear();
        setCartCount(0);
        navigate("/login");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-(--z-navbar) transition-all duration-500 ease-out-expo ${
                scrolled ? "glass-nav shadow-sm" : "bg-transparent"
            }`}
            initial={{ y: -100 }}
            animate={{ y: mounted ? 0 : -100 }}
            transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
        >
            <div className="container-lux">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Left: Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link to="/" className="flex items-center gap-2 group shrink-0">
                            <span className="text-lg md:text-xl font-display font-light tracking-[0.15em] text-white uppercase group-hover:text-accent transition-colors duration-300">
                                Horologium
                            </span>
                        </Link>
                    </motion.div>

                    {/* Center: Navigation (desktop only, hide for admin) */}
                    {!isAdmin && (
                        <motion.nav
                            className="hidden md:flex items-center gap-10"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -10 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {["Home", "Contact"].map((item, index) => (
                                <motion.div
                                    key={item}
                                    {...navLinkHover}
                                    whileHover="hover"
                                >
                                    <Link
                                        to={item === "Contact" ? "/contact-us" : "/"}
                                        className="nav-link inline-block"
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.nav>
                    )}

                    {/* Right: Icons + Auth */}
                    <motion.div
                        className="flex items-center gap-3 md:gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 20 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >

                        {/* Wishlist */}
                        <motion.div {...iconHover} whileHover="hover">
                            <Link to="/" className="btn-icon relative" aria-label="Wishlist">
                                <FiHome size={18} />
                            </Link>
                        </motion.div>

                        {/* Cart */}
                        <motion.div {...iconHover} whileHover="hover">
                            <Link to="/cart" className="btn-icon relative" aria-label="Cart">
                                <FiShoppingBag size={18} />
                                <AnimatePresence>
                                    {cartCount > 0 && (
                                        <motion.span
                                            className="absolute -top-1 -right-1 min-w-4.5 h-4.5 flex items-center justify-center bg-accent text-dark text-[10px] font-semibold rounded-full leading-none px-1"
                                            variants={badgeBounce}
                                            initial="initial"
                                            animate="animate"
                                            key="cart-badge"
                                        >
                                            {cartCount > 99 ? "99+" : cartCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        </motion.div>

                        {/* Divider */}
                        <span className="hidden md:block w-px h-6 bg-dark-border"></span>

                        {/* Auth (desktop only) */}
                        {!userId ? (
                            <motion.div
                                className="hidden md:flex items-center gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: mounted ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <Link to="/login" className="btn btn-sm btn-ghost">Sign In</Link>
                                <Link to="/signup" className="btn btn-sm btn-outline">Get Started</Link>
                            </motion.div>
                        ) : (
                            <Link
                                to="/profile"
                                className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-dark-border hover:border-accent/30 transition-all duration-300 group"
                            >
                                <FiUser size={14} className="text-text-secondary group-hover:text-accent transition-colors" />
                                <span className="text-xs font-medium text-text-secondary group-hover:text-white transition-colors">
                                    {formatName(user?.name?.split(" ")[0]) || "Profile"}
                                </span>
                            </Link>
                        )}

                        {/* Hamburger Menu (dropdown below hamburger) */}
                        {userId ? (
                            <Nav logout={logout} />
                        ) : (
                            <div className="md:hidden">
                                <Nav logout={logout} />
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
}
