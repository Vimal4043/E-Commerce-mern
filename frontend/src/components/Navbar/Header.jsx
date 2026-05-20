import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import Nav from "./Nav";

export default function Header() {
    // console.log("BASE URL:", import.meta.env.VITE_API_URL);
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        if (!userId) return;
        const res = await api.get(`/user/${userId}`);
        setUser(res.data);
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

                const total = items.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );

                setCartCount(total);

            } catch (error) {
                console.error("Cart fetch error:", error);

                // ✅ fallback (important)
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
    }

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center bg-black/90 backdrop-blur-md text-white px-6 py-4 shadow-md">

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-wide m-1">
                Shopverse
            </Link>

            {/* middle section */}
                {!isAdmin && (
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/" className="hidden md:block text-lg px-4">
                        <span className="underline-anim">browse</span>
                    </Link>
                    <Link to="/contact-us" className="hidden md:block text-lg px-4">
                        <span className="underline-anim">contact us</span>
                    </Link>
                </div>
            )}

            {/* Right Section */}
            <div className="flex items-center gap-6">

                {/* Cart */}
                <Link to="/cart" className="relative text-2xl underline-anim transition">
                    🛒
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {/* Auth Section */}
                {!userId ? (
                    <div className="flex gap-4">
                        <Link to="/login" className="">
                            <span className="underline-anim transition">Login</span>
                        </Link>
                        <Link to="/signup" className="">
                            <span className="underline-anim transition">Signup</span>
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link
                            to="/profile"
                            className="bg-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition shadow-sm"
                        >
                            <span className="text-gray-600 text-sm">
                                Hi, <span className="font-semibold text-black">{formatName(user?.name)}</span>
                            </span>
                        </Link>
                        <Nav logout={logout} />
                    </div>
                )}

            </div>
        </nav>
    )
}