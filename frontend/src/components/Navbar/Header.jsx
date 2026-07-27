import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import api from "../../api/axios";
import Nav from "./Nav";
import { FiSearch, FiHeart, FiShoppingBag, FiUser } from "react-icons/fi";

export default function Header() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef(null);
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const [user, setUser] = useState(null);

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
        <header
            className={`fixed top-0 left-0 right-0 z-[var(--z-navbar)] transition-all duration-500 ease-out-expo ${
                scrolled ? "glass-nav shadow-sm" : "bg-transparent"
            }`}
        >
            <div className="container-lux">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Left: Logo */}
                    <Link to="/" className="flex items-center gap-2 group shrink-0">
                        <span className="text-lg md:text-xl font-display font-light tracking-[0.15em] text-white uppercase group-hover:text-accent transition-colors duration-300">
                            Horologium
                        </span>
                    </Link>

                    {/* Center: Navigation (desktop only, hide for admin) */}
                    {!isAdmin && (
                        <nav className="hidden md:flex items-center gap-10">
                            <Link to="/" className="nav-link">Collections</Link>
                            <Link to="/" className="nav-link">New Arrivals</Link>
                            <Link to="/" className="nav-link">Craftsmanship</Link>
                            <Link to="/contact-us" className="nav-link">Contact</Link>
                        </nav>
                    )}

                    {/* Right: Icons + Auth */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Search */}
                        <div className="relative" ref={searchRef}>
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="btn-icon"
                                aria-label="Search"
                            >
                                <FiSearch size={18} />
                            </button>

                            {searchOpen && (
                                <form
                                    onSubmit={handleSearch}
                                    className="absolute right-0 top-full mt-2 w-72 glass-strong rounded-lg p-3 animate-fade-in-down"
                                >
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search timepieces..."
                                            className="input pr-10 text-sm"
                                            autoFocus
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors"
                                        >
                                            <FiSearch size={16} />
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Wishlist */}
                        <Link to="/cart" className="btn-icon relative" aria-label="Wishlist">
                            <FiHeart size={18} />
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" className="btn-icon relative" aria-label="Cart">
                            <FiShoppingBag size={18} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-accent text-dark text-[10px] font-semibold rounded-full leading-none px-1">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Divider */}
                        <span className="hidden md:block w-px h-6 bg-dark-border"></span>

                        {/* Auth */}
                        {!userId ? (
                            <div className="hidden md:flex items-center gap-3">
                                <Link to="/login" className="btn btn-sm btn-ghost">Sign In</Link>
                                <Link to="/signup" className="btn btn-sm btn-outline">Get Started</Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/profile"
                                    className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-dark-border hover:border-accent/30 transition-all duration-300 group"
                                >
                                    <FiUser size={14} className="text-text-secondary group-hover:text-accent transition-colors" />
                                    <span className="text-xs font-medium text-text-secondary group-hover:text-white transition-colors">
                                        {formatName(user?.name?.split(" ")[0]) || "Profile"}
                                    </span>
                                </Link>
                                <Nav logout={logout} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}