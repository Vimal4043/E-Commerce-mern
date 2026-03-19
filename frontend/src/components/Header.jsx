import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";
import Nav from "./Nav";

export default function Header() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    useEffect(() => {
        const loadCart = async () => {
            if (!userId) return setCartCount(0);

            const res = await api.get(`/cart/${userId}`);
            const items = res.data?.items || [];
            const total = items.reduce(
                (sum, item) => sum + item.quantity, 0
            );
            setCartCount(total);
        }
        loadCart();
        window.addEventListener("cartUpdated", loadCart);

        return () => {
            window.removeEventListener("cartUpdated", loadCart);
        }
    }, [userId]);

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

            {/* Right Section */}
            <div className="flex items-center gap-6">

                {/* Cart */}
                <Link to="/cart" className="relative text-2xl hover:border">
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
                        <Link to="/login" className="hover:text-gray-300 transition">
                            Login
                        </Link>
                        <Link to="/signup" className="hover:text-gray-300 transition">
                            Signup
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="bg-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition shadow-sm"
                        >
                            <span className="text-gray-600 text-sm">
                                Hi, <span className="font-semibold text-black">{username}</span>
                            </span>
                        </Link>
                        <Nav logout={logout} />
                    </div>
                )}

            </div>
        </nav>
    )
}