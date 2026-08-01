import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiHome, FiUser, FiPackage, FiHeadphones, FiShield, FiLogOut, FiGrid, FiLogIn, FiUserPlus, FiHeart } from "react-icons/fi";
import { fadeInUp, staggerContainer, staggerItem, navLinkHover } from "../../utils/animations";
import api from "../../api/axios";

const NavLinks = ({ logout, closeMenu }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const linkClass = "flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-text-secondary hover:text-white hover:bg-dark-hover transition-all duration-200 group";

  const iconClass = "text-text-muted group-hover:text-accent transition-colors duration-200 shrink-0";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Check admin status from API
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
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  // Variants use "initial"/"animate"/"exit" keys to match staggerItem from animations.js
  const menuVariants = {
    initial: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  return (
    <motion.div
      variants={menuVariants}
      className="flex flex-col"
    >
      {/* Mobile-only home link */}
      <motion.div variants={staggerItem}>
        <Link to="/" onClick={closeMenu} className={`${linkClass} md:hidden`}>
          <FiHome size={16} className={iconClass} />
          <span>Home</span>
        </Link>
      </motion.div>

      {/* Collections (mobile) */}
      <motion.div variants={staggerItem}>
        <Link to="/" onClick={closeMenu} className={`${linkClass} md:hidden`}>
          <FiGrid size={16} className={iconClass} />
          <span>Collections</span>
        </Link>
      </motion.div>

      {/* Contact Us (mobile only, non-admin) */}
      {!isAdmin && (
        <motion.div variants={staggerItem}>
          <motion.div {...navLinkHover} whileHover="hover">
            <Link to="/contact-us" onClick={closeMenu} className={`${linkClass} md:hidden`}>
              <FiHeadphones size={16} className={iconClass} />
              <span>Contact Us</span>
            </Link>
          </motion.div>
        </motion.div>
      )}

      {isLoggedIn ? (
        <>
          {/* Admin Dashboard (admin only) */}
          {isAdmin && (
            <motion.div variants={staggerItem}>
              <motion.div {...navLinkHover} whileHover="hover">
                <Link to="/admin" onClick={closeMenu} className={linkClass}>
                  <FiShield size={16} className={iconClass} />
                  <span>Admin Dashboard</span>
                </Link>
              </motion.div>
            </motion.div>
          )}

          {/* My Profile */}
          <motion.div variants={staggerItem}>
            <motion.div {...navLinkHover} whileHover="hover">
              <Link to="/profile" onClick={closeMenu} className={linkClass}>
                <FiUser size={16} className={iconClass} />
                <span>My Profile</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* My Orders */}
          <motion.div variants={staggerItem}>
            <motion.div {...navLinkHover} whileHover="hover">
              <Link to="/orders" onClick={closeMenu} className={linkClass}>
                <FiPackage size={16} className={iconClass} />
                <span>My Orders</span>
              </Link>
            </motion.div>
          </motion.div>

           {/* Wishlist */}
           <motion.div variants={staggerItem}>
             <motion.div {...navLinkHover} whileHover="hover">
               <Link to="/wishlist" onClick={closeMenu} className={linkClass}>
                 <FiHeart size={16} className={iconClass} />
                 <span>Wishlist</span>
               </Link>
             </motion.div>
           </motion.div>

          {/* Logout */}
          <motion.div variants={staggerItem}>
            <motion.button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-error/80 hover:text-error hover:bg-error/5 transition-all duration-200 w-full text-left group"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiLogOut size={16} className="shrink-0" />
              <span>Logout</span>
            </motion.button>
          </motion.div>
        </>
      ) : (
        <>
          {/* Sign In */}
          <motion.div variants={staggerItem}>
            <motion.div {...navLinkHover} whileHover="hover">
              <Link to="/login" onClick={closeMenu} className={linkClass}>
                <FiLogIn size={16} className={iconClass} />
                <span>Sign In</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Sign Up */}
          <motion.div variants={staggerItem}>
            <motion.div {...navLinkHover} whileHover="hover">
              <Link to="/signup" onClick={closeMenu} className={linkClass}>
                <FiUserPlus size={16} className={iconClass} />
                <span>Sign Up</span>
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default NavLinks;
