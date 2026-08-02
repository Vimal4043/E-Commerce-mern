import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail } from "react-icons/fi";
import api from "../../api/axios";
import { goldLineAnimation } from "../../utils/animations";

const EditProfile = () => {
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const navigate = useNavigate();

    const loadUser = async () => {
        if (!userId) return;
        try {
            const res = await api.get(`/user/${userId}`);
            const data = res.data;
            setUser(data);
            setName(data?.name || "");
        } catch (error) {
            console.error("Failed to load user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, [userId]);

    const handleChange = (e) => {
        if (e.target.name === "name") {
            // Only allow letters and space in name
            if (!/^[A-Za-z ]*$/.test(e.target.value)) return;
        }
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaveMessage("");

        if (!name.trim()) {
            setSaveMessage("Name cannot be empty.");
            return;
        }

        setIsSaving(true);
        try {
            const res = await api.put(`/user/${userId}`, { name });
            const updatedUser = { ...user, name: res.data.name || name };
            setUser(updatedUser);
            setSaveMessage("Profile updated successfully!");

            // Update localStorage
            if (res.data.name || name) {
                localStorage.setItem("username", res.data.name || name);
            }
        } catch (error) {
            setSaveMessage(error.response?.data?.message || "Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="typo-body-sm text-text-muted">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <p className="typo-body-sm text-text-muted">Unable to load profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark">
            {/* Banner */}
            <div className="bg-dark-elevated/30 border-b border-dark-border">
                <div className="container-lux py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <span className="typo-label-gold mb-4 block">Account Settings</span>
                        <h1 className="typo-h1 text-white mb-4">Edit Profile</h1>
                        <motion.div
                            className="divider-gold"
                            variants={goldLineAnimation}
                            initial="initial"
                            animate="animate"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Form */}
            <div className="container-lux section-padding-sm">
                <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
                >
                    <div className="bg-dark-card border border-dark-border rounded-3xl p-8 shadow-2xl">
                        {/* Avatar & Name Preview */}
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-linear-to-br from-accent to-accent/30 border-2 border-accent/30 flex items-center justify-center text-3xl font-display text-dark font-light">
                                {user?.name?.trim().charAt(0).toUpperCase() || "U"}
                            </div>
                            <div>
                                <h2 className="typo-h3 text-white">{user?.name}</h2>
                                <p className="typo-body-sm text-text-secondary">{user?.email}</p>
                            </div>
                        </div>

                        {/* Save Message */}
                        {saveMessage && (
                            <motion.div
                                className={`mb-6 p-4 rounded-xl text-sm ${
                                    saveMessage.includes("success")
                                        ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                        : "border border-rose-500/20 bg-rose-500/10 text-rose-300"
                                }`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {saveMessage}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6 stagger-children">
                            {/* Full Name */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                        className="input w-full py-3.5 pl-12 pr-4 rounded-xl"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Email (read-only) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        disabled
                                        className="input w-full py-3.5 pl-12 pr-4 rounded-xl bg-dark-elevated/50 text-text-secondary cursor-not-allowed"
                                    />
                                </div>
                            </motion.div>

                            {/* Buttons */}
                            <motion.div
                                className="flex gap-4 pt-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <motion.button
                                    type="submit"
                                    disabled={isSaving}
                                    className="btn btn-primary flex-1"
                                    whileHover={!isSaving ? "hover" : undefined}
                                    whileTap={!isSaving ? "tap" : undefined}
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </motion.button>

                                <motion.button
                                    type="button"
                                    onClick={() => navigate("/profile")}
                                    className="btn btn-secondary flex-1"
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    Cancel
                                </motion.button>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EditProfile;
