import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiShoppingBag, FiHeart, FiMapPin, FiSettings, FiChevronRight, FiPackage, FiTruck, FiCheck, FiX, FiEye, FiEdit, FiTrash2, FiHome, FiBriefcase } from "react-icons/fi";
import api from "../../api/axios";

export default function LuxuryDashboard() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [activeSection, setActiveSection] = useState("profile");
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        totalOrders: 0,
        totalSpent: 0,
        wishlistCount: 0,
        addressesCount: 0
    });

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }
        loadDashboardData();
    }, [userId, navigate]);

    const loadDashboardData = async () => {
        try {
            const [userRes, addressesRes, ordersRes] = await Promise.all([
                api.get(`/user/${userId}`),
                api.get(`/address`),
                api.get(`/orders/user/${userId}`)
            ]);

            setUser(userRes.data);
            setAddresses(addressesRes.data);
            setOrders(ordersRes.data || []);

            // Calculate stats
            const totalSpent = ordersRes.data?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0;
            setStats({
                totalOrders: ordersRes.data?.length || 0,
                totalSpent,
                wishlistCount: 3, // Mock data
                addressesCount: addressesRes.data.length
            });

            // Mock wishlist
            setWishlist([
                { _id: 1, title: "Chronograph Elite", price: 12500, image: "⌚" },
                { _id: 2, title: "Perpetual Calendar", price: 18900, image: "⌚" },
                { _id: 3, title: "Tourbillon Classic", price: 25000, image: "⌚" }
            ]);
        } catch (error) {
            console.error("Failed to load dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    const menuItems = [
        { id: "profile", label: "Profile", icon: FiUser },
        { id: "orders", label: "Orders", icon: FiShoppingBag },
        { id: "wishlist", label: "Wishlist", icon: FiHeart },
        { id: "addresses", label: "Addresses", icon: FiMapPin },
        { id: "settings", label: "Settings", icon: FiSettings }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="typo-body-sm text-text-muted">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    const StatCard = ({ label, value, icon: Icon, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="bg-dark-card border border-dark-border rounded-2xl p-6 card-hover"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="text-accent" size={24} />
                </div>
            </div>
            <motion.div
                className="typo-price-lg mb-1"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.2 }}
            >
                {value}
            </motion.div>
            <p className="text-sm text-text-muted">{label}</p>
        </motion.div>
    );

    const OrderTimeline = ({ order }) => {
        const steps = [
            { status: "placed", label: "Order Placed", icon: FiShoppingBag },
            { status: "processing", label: "Processing", icon: FiPackage },
            { status: "shipped", label: "Shipped", icon: FiTruck },
            { status: "delivered", label: "Delivered", icon: FiCheck }
        ];

        const currentStep = steps.findIndex(step => step.status === order.status);

        return (
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 card-hover">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className="text-xs text-accent uppercase tracking-wider mb-1">Order #{order._id.slice(-6)}</p>
                        <p className="text-sm text-text-muted">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="typo-price">${order.totalAmount?.toFixed(2)}</p>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = index <= currentStep;
                        const isCurrent = index === currentStep;

                        return (
                            <div key={step.status} className="flex-1">
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        isCompleted
                                            ? "bg-accent text-dark"
                                            : "bg-dark-elevated text-text-muted"
                                    }`}>
                                        <Icon size={18} />
                                    </div>
                                    <span className="text-xs text-text-muted hidden md:block">{step.label}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="h-0.5 bg-dark-border mt-2 mx-2">
                                        {isCompleted && (
                                            <motion.div
                                                className="h-full bg-accent"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Order Items Preview */}
                <div className="pt-4 border-t border-dark-border">
                    <p className="text-sm text-text-muted mb-2">{order.items?.length || 0} items</p>
                    <button
                        onClick={() => navigate(`/orders/${order._id}`)}
                        className="text-sm text-accent hover:text-accent-alt flex items-center gap-2"
                    >
                        View Details <FiChevronRight size={14} />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-dark">
            {/* Banner */}
            <div className="bg-dark-elevated/30 border-b border-dark-border">
                <div className="container-lux py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="typo-label-gold mb-4 block">My Account</span>
                        <h1 className="typo-h1 text-white mb-4">Dashboard</h1>
                        <div className="divider-gold" />
                    </motion.div>
                </div>
            </div>

            <div className="container-lux section-padding-sm">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;

                                return (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                            isActive
                                                ? "bg-accent/10 text-accent border border-accent/20"
                                                : "bg-dark-card border border-dark-border text-text-muted hover:text-white hover:border-accent/30"
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                        <FiChevronRight className="ml-auto" size={16} />
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {/* Profile Section */}
                            {activeSection === "profile" && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <StatCard label="Total Orders" value={stats.totalOrders} icon={FiShoppingBag} delay={0.1} />
                                        <StatCard label="Total Spent" value={`$${stats.totalSpent.toFixed(0)}`} icon={FiPackage} delay={0.2} />
                                        <StatCard label="Wishlist" value={stats.wishlistCount} icon={FiHeart} delay={0.3} />
                                        <StatCard label="Addresses" value={stats.addressesCount} icon={FiMapPin} delay={0.4} />
                                    </div>

                                    {/* Profile Card */}
                                    <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                                        <h2 className="typo-h3 text-white mb-6">Profile Information</h2>
                                        <div className="flex flex-col md:flex-row items-start gap-6">
                                            <div className="w-24 h-24 rounded-full bg-linear-to-br from-accent/20 to-accent/5 border-2 border-accent/20 flex items-center justify-center">
                                                <span className="text-4xl font-display text-accent font-light">
                                                    {user?.name?.trim().charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Full Name</p>
                                                        <p className="text-white">{user?.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Email</p>
                                                        <p className="text-white">{user?.email}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Member Since</p>
                                                        <p className="text-white">{new Date(user?.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Account Type</p>
                                                        <p className="text-white">{user?.isAdmin ? "Admin" : "Customer"}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => navigate("/edit-profile")}
                                                    className="btn btn-outline"
                                                >
                                                    Edit Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Orders Section */}
                            {activeSection === "orders" && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <h2 className="typo-h3 text-white mb-6">Order History</h2>
                                    {orders.length === 0 ? (
                                        <div className="bg-dark-card border border-dark-border rounded-2xl p-12 text-center">
                                            <FiShoppingBag className="text-6xl text-text-muted mx-auto mb-4" />
                                            <p className="typo-body-sm text-text-muted mb-4">No orders yet</p>
                                            <button onClick={() => navigate("/shop")} className="btn btn-primary">
                                                Start Shopping
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <OrderTimeline key={order._id} order={order} />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Wishlist Section */}
                            {activeSection === "wishlist" && (
                                <motion.div
                                    key="wishlist"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <h2 className="typo-h3 text-white mb-6">My Wishlist</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {wishlist.map((item, index) => (
                                            <motion.div
                                                key={item._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden card-hover group"
                                            >
                                                <div className="aspect-square bg-linear-to-br from-dark-elevated to-dark-card flex items-center justify-center">
                                                    <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{item.image}</span>
                                                </div>
                                                <div className="p-6">
                                                    <p className="text-xs text-accent uppercase tracking-wider mb-2">{item.category || "Luxury"}</p>
                                                    <h3 className="typo-h4 text-white mb-3">{item.title}</h3>
                                                    <div className="flex items-center justify-between">
                                                        <span className="typo-price">${item.price}</span>
                                                        <button className="btn btn-primary btn-sm">
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Addresses Section */}
                            {activeSection === "addresses" && (
                                <motion.div
                                    key="addresses"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <h2 className="typo-h3 text-white">My Addresses</h2>
                                        <button onClick={() => navigate("/add-address")} className="btn btn-primary">
                                            Add Address
                                        </button>
                                    </div>
                                    {addresses.length === 0 ? (
                                        <div className="bg-dark-card border border-dark-border rounded-2xl p-12 text-center">
                                            <FiMapPin className="text-6xl text-text-muted mx-auto mb-4" />
                                            <p className="typo-body-sm text-text-muted mb-4">No addresses saved</p>
                                            <button onClick={() => navigate("/add-address")} className="btn btn-primary">
                                                Add Your First Address
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {addresses.map((address) => (
                                                <motion.div
                                                    key={address._id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-dark-card border border-dark-border rounded-2xl p-6 card-hover"
                                                >
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                                                <FiHome className="text-accent" size={18} />
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-medium">{address.fullName}</p>
                                                                <p className="text-xs text-text-muted">{address.phone}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-text-secondary mb-4">
                                                        {address.street}<br />
                                                        {address.city}, {address.state} {address.zipCode}<br />
                                                        {address.country}
                                                    </p>
                                                    <div className="flex gap-2">
                                                        <button className="flex-1 btn btn-outline btn-sm">
                                                            <FiEye size={14} className="mr-2" />
                                                            View
                                                        </button>
                                                        <button className="flex-1 btn btn-secondary btn-sm">
                                                            <FiEdit size={14} className="mr-2" />
                                                            Edit
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Settings Section */}
                            {activeSection === "settings" && (
                                <motion.div
                                    key="settings"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <h2 className="typo-h3 text-white mb-6">Account Settings</h2>
                                    <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between py-4 border-b border-dark-border">
                                                <div>
                                                    <p className="text-white font-medium mb-1">Email Notifications</p>
                                                    <p className="text-sm text-text-muted">Receive updates about orders and promotions</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-11 h-6 bg-dark-elevated peer-fill-accent rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                                </label>
                                            </div>
                                            <div className="flex items-center justify-between py-4 border-b border-dark-border">
                                                <div>
                                                    <p className="text-white font-medium mb-1">Two-Factor Authentication</p>
                                                    <p className="text-sm text-text-muted">Add an extra layer of security</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-dark-elevated peer-fill-accent rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                                </label>
                                            </div>
                                            <div className="flex items-center justify-between py-4">
                                                <div>
                                                    <p className="text-white font-medium mb-1">Marketing Emails</p>
                                                    <p className="text-sm text-text-muted">Receive news and special offers</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-dark-elevated peer-fill-accent rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}