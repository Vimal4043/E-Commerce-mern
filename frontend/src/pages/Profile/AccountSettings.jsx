import { motion } from "framer-motion";
import { FiLock, FiLogOut, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AccountSettings = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <h2 className="typo-h3 text-white mb-6">Account Settings</h2>

            <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">

                {/* Change Password */}
                <button
                    onClick={() => navigate("/change-password")}
                    className="w-full flex items-center justify-between px-6 py-5 border-b border-dark-border hover:bg-dark-elevated transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                            <FiLock className="text-accent" size={20} />
                        </div>

                        <div className="text-left">
                            <p className="text-white font-medium">
                                Change Password
                            </p>
                            <p className="text-sm text-text-muted">
                                Update your account password
                            </p>
                        </div>
                    </div>

                    <FiChevronRight className="text-text-muted" size={20} />
                </button>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between px-6 py-5 hover:bg-red-500/10 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center">
                            <FiLogOut className="text-red-400" size={20} />
                        </div>

                        <div className="text-left">
                            <p className="text-red-400 font-medium">
                                Logout
                            </p>
                            <p className="text-sm text-text-muted">
                                Sign out of your account
                            </p>
                        </div>
                    </div>

                    <FiChevronRight className="text-text-muted" size={20} />
                </button>

            </div>
        </motion.div>
    );
};

export default AccountSettings;