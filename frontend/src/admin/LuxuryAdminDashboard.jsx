import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPackage, FiShoppingBag, FiUsers, FiTrendingUp, FiActivity, FiPlus, FiEye, FiEdit, FiTrash2, FiSearch, FiBell, FiSettings, FiLogOut, FiMenu, FiX, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

export default function LuxuryAdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0,
        revenue: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [pRes, oRes, uRes] = await Promise.allSettled([
                api.get('/products'),
                api.get('/orders/admin'),
                api.get('/user')
            ]);

            const products = pRes.status === 'fulfilled' ? (pRes.value.data.products || []) : [];
            const orders = oRes.status === 'fulfilled' ? oRes.value.data : [];
            const users = uRes.status === 'fulfilled' ? uRes.value.data : [];

            const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

            setStats({
                products: products.length,
                orders: orders.length,
                users: users.length,
                revenue: totalRevenue
            });

            setRecentOrders(orders.slice(0, 5));
            setInventory(products.slice(0, 6));

            // Mock recent activity
            setRecentActivity([
                { id: 1, action: "New order placed", user: "John Doe", time: "2 min ago", type: "order" },
                { id: 2, action: "Product updated", user: "Admin", time: "15 min ago", type: "product" },
                { id: 3, action: "New user registered", user: "Jane Smith", time: "1 hour ago", type: "user" },
                { id: 4, action: "Order shipped", user: "System", time: "2 hours ago", type: "order" },
                { id: 5, action: "Payment received", user: "Payment Gateway", time: "3 hours ago", type: "payment" }
            ]);
        } catch (err) {
            console.error('Failed to load dashboard data', err);
        }
    };

    const menuItems = [
        { label: "Dashboard", icon: FiActivity, active: true },
        { label: "Products", icon: FiPackage, href: "/admin/products" },
        { label: "Orders", icon: FiShoppingBag, href: "/admin/orders" },
        { label: "Users", icon: FiUsers, href: "/admin/users" },
        { label: "Contacts", icon: FiBell, href: "/admin/contacts" },
        { label: "Settings", icon: FiSettings, href: "/admin" }
    ];

    const StatCard = ({ label, value, icon: Icon, trend, delay }) => (
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
                {trend && (
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                        <FiTrendingUp size={16} />
                        <span>{trend}</span>
                    </div>
                )}
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

    return (
        <div className="min-h-screen bg-dark">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-dark/80 backdrop-blur-sm z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                className={`fixed top-0 left-0 bottom-0 z-50 bg-dark-elevated/50 border-r border-dark-border backdrop-blur-xl transition-all duration-300 ${
                    sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"
                }`}
                initial={false}
                animate={{ x: sidebarOpen ? 0 : "-100%" }}
            >
                <div className="p-6">
                    {/* Logo */}
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h1 className="typo-h3 text-white mb-1">HOROLOGIUM</h1>
                            <p className="text-xs text-text-muted">Admin Panel</p>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-text-muted hover:text-white"
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.a
                                    key={index}
                                    href={item.href || "#"}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                        item.active
                                            ? "bg-accent/10 text-accent border border-accent/20"
                                            : "text-text-muted hover:text-white hover:bg-dark-card"
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                    {item.active && <FiChevronRight className="ml-auto" size={16} />}
                                </motion.a>
                            );
                        })}
                    </nav>

                    {/* User Section */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-dark-border">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center">
                                <span className="text-accent font-display">A</span>
                            </div>
                            <div>
                                <p className="text-sm text-white">Admin User</p>
                                <p className="text-xs text-text-muted">admin@horologium.com</p>
                            </div>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-dark-border text-text-muted hover:text-white hover:border-accent/30 transition-colors">
                            <FiLogOut size={18} />
                            <span className="text-sm">Logout</span>
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-dark/80 backdrop-blur-xl border-b border-dark-border">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden text-text-muted hover:text-white"
                            >
                                {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                            <div>
                                <h2 className="text-xl font-display text-white">Dashboard Overview</h2>
                                <p className="text-xs text-text-muted">Welcome back, Admin</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="relative p-2 rounded-xl border border-dark-border text-text-muted hover:text-white hover:border-accent/30 transition-colors">
                                <FiBell size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                            </button>
                            <button className="p-2 rounded-xl border border-dark-border text-text-muted hover:text-white hover:border-accent/30 transition-colors">
                                <FiSettings size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-6">
                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                        <StatCard label="Total Revenue" value={`₹${stats.revenue.toFixed(0)}`} icon={FaRupeeSign} trend="+12.5%" delay={0.1} />
                        <StatCard label="Total Orders" value={stats.orders} icon={FiShoppingBag} trend="+8.2%" delay={0.2} />
                        <StatCard label="Total Customers" value={stats.users} icon={FiUsers} trend="+15.3%" delay={0.3} />
                        <StatCard label="Products" value={stats.products} icon={FiPackage} trend="+3.1%" delay={0.4} />
                    </div>

                    {/* Charts & Recent Activity */}
                    <div className="grid lg:grid-cols-3 gap-6 mb-8">
                        {/* Revenue Chart Placeholder */}
                        <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-2xl p-6">
                            <h3 className="typo-h4 text-white mb-6">Revenue Overview</h3>
                            <div className="h-80 flex items-end justify-between gap-4">
                                {[65, 45, 75, 55, 85, 70, 90, 60, 80, 50, 95, 75].map((height, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex-1 bg-gradient-to-t from-accent/20 to-accent/40 rounded-t-lg relative group cursor-pointer"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ duration: 0.8, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="absolute bottom-0 left-0 right-0 h-full bg-accent/20 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-xs text-text-muted">
                                <span>Jan</span>
                                <span>Feb</span>
                                <span>Mar</span>
                                <span>Apr</span>
                                <span>May</span>
                                <span>Jun</span>
                                <span>Jul</span>
                                <span>Aug</span>
                                <span>Sep</span>
                                <span>Oct</span>
                                <span>Nov</span>
                                <span>Dec</span>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                            <h3 className="typo-h4 text-white mb-6">Recent Activity</h3>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-dark-elevated/50 transition-colors"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                                        <div className="flex-1">
                                            <p className="text-sm text-white">{activity.action}</p>
                                            <p className="text-xs text-text-muted">{activity.user} {"\u2022"} {activity.time}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions & Inventory */}
                    <div className="grid lg:grid-cols-3 gap-6 mb-8">
                        {/* Quick Actions */}
                        <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                            <h3 className="typo-h4 text-white mb-6">Quick Actions</h3>
                            <div className="space-y-3">
                                <a href="/admin/products/add" className="flex items-center justify-between p-4 rounded-xl bg-dark-elevated/50 border border-dark-border hover:border-accent/30 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                            <FiPlus className="text-accent" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white font-medium">Add Product</p>
                                            <p className="text-xs text-text-muted">Create new listing</p>
                                        </div>
                                    </div>
                                    <FiArrowRight className="text-text-muted group-hover:text-accent transition-colors" size={16} />
                                </a>
                                <a href="/admin/orders" className="flex items-center justify-between p-4 rounded-xl bg-dark-elevated/50 border border-dark-border hover:border-accent/30 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                            <FiEye className="text-accent" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white font-medium">Review Orders</p>
                                            <p className="text-xs text-text-muted">{stats.orders} pending</p>
                                        </div>
                                    </div>
                                    <FiArrowRight className="text-text-muted group-hover:text-accent transition-colors" size={16} />
                                </a>
                                <a href="/admin/users" className="flex items-center justify-between p-4 rounded-xl bg-dark-elevated/50 border border-dark-border hover:border-accent/30 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                            <FiUsers className="text-accent" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white font-medium">Manage Users</p>
                                            <p className="text-xs text-text-muted">{stats.users} registered</p>
                                        </div>
                                    </div>
                                    <FiArrowRight className="text-text-muted group-hover:text-accent transition-colors" size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Inventory Overview */}
                        <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="typo-h4 text-white">Inventory Overview</h3>
                                <a href="/admin/products" className="text-sm text-accent hover:text-accent-alt flex items-center gap-2">
                                    View All <FiChevronRight size={14} />
                                </a>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-dark-border">
                                            <th className="text-left text-xs text-text-muted uppercase tracking-wider pb-3">Product</th>
                                            <th className="text-left text-xs text-text-muted uppercase tracking-wider pb-3">Category</th>
                                            <th className="text-left text-xs text-text-muted uppercase tracking-wider pb-3">Price</th>
                                            <th className="text-left text-xs text-text-muted uppercase tracking-wider pb-3">Status</th>
                                            <th className="text-left text-xs text-text-muted uppercase tracking-wider pb-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventory.map((product, index) => (
                                            <motion.tr
                                                key={product._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="border-b border-dark-border/50"
                                            >
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-dark-elevated overflow-hidden flex items-center justify-center shrink-0">
                                                            {product.image ? (
                                                                <img src={product.image} alt={product.title} className="w-full h-full object-cover" onError={(event) => { event.currentTarget.alt = ""; event.currentTarget.style.display = "none"; }} />
                                                            ) : (
                                                                <span className="text-xl">⌚</span>
                                                            )}
                                                        </div>
                                                        <span className="text-sm text-white">{product.title}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-xs text-accent uppercase tracking-wider">{product.category}</span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-sm text-white">₹ {product.price}</span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20">
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-2 rounded-lg border border-dark-border text-text-muted hover:text-accent hover:border-accent/30 transition-colors">
                                                            <FiEye size={16} />
                                                        </button>
                                                        <button className="p-2 rounded-lg border border-dark-border text-text-muted hover:text-accent hover:border-accent/30 transition-colors">
                                                            <FiEdit size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="typo-h4 text-white">Recent Orders</h3>
                            <a href="/admin/orders" className="text-sm text-accent hover:text-accent-alt flex items-center gap-2">
                                View All <FiChevronRight size={14} />
                            </a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-dark-border">
                                        <th className="text-left text-xs text-text-muted uppercase tracking-wider pb-3">Order ID</th>
                                        <th className="text-left text-xs text-text-muted uppercase tracking-wider pb-3">Customer</th>
                                        <th className="text-left text-xs text-text-muted uppercase tracking-wider pb-3">Date</th>
                                        <th className="text-left text-xs text-text-muted uppercase tracking-wider pb-3">Amount</th>
                                        <th className="text-left text-xs text-text-muted uppercase tracking-wider pb-3">Status</th>
                                        <th className="text-left text-xs text-text-muted uppercase tracking-wider pb-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order, index) => (
                                        <motion.tr
                                            key={order._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-dark-border/50"
                                        >
                                            <td className="py-4">
                                                <span className="text-sm text-accent font-mono">#{order._id.slice(-6)}</span>
                                            </td>
                                            <td className="py-4">
                                                <span className="text-sm text-white">{order.userId?.name || "Guest"}</span>
                                            </td>
                                            <td className="py-4">
                                                <span className="text-sm text-text-muted">{new Date(order.createdAt).toLocaleDateString()}</span>
                                            </td>
                                            <td className="py-4">
                                                <span className="text-sm text-white font-medium">₹ {order.totalAmount?.toFixed(2)}</span>
                                            </td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    order.status === 'delivered'
                                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                        : order.status === 'shipped'
                                                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                                }`}>
                                                    {order.status || 'Processing'}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-2 rounded-lg border border-dark-border text-text-muted hover:text-accent hover:border-accent/30 transition-colors">
                                                        <FiEye size={16} />
                                                    </button>
                                                    <button className="p-2 rounded-lg border border-dark-border text-text-muted hover:text-accent hover:border-accent/30 transition-colors">
                                                        <FiEdit size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
