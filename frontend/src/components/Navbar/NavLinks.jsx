import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiPackage, FiHeadphones, FiShield, FiLogOut, FiGrid } from "react-icons/fi";
import { fadeInUp, staggerContainer, staggerItem, navLinkHover } from "../../utils/animations";

const NavLinks = ({ logout, closeMenu }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const linkClass = "flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-text-secondary hover:text-white hover:bg-dark-hover transition-all duration-200 group";

  const iconClass = "text-text-muted group-hover:text-accent transition-colors duration-200 shrink-0";

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate="open"
      exit="closed"
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

      {/* Divider for mobile */}
      <motion.div variants={staggerItem} className="my-2 mx-4 h-px bg-dark-border md:hidden" />

      <motion.div variants={staggerItem}>
        <motion.div {...navLinkHover} whileHover="hover">
          <Link to="/profile" onClick={closeMenu} className={linkClass}>
            <FiUser size={16} className={iconClass} />
            <span>Profile</span>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div variants={staggerItem}>
        <motion.div {...navLinkHover} whileHover="hover">
          <Link to="/orders" onClick={closeMenu} className={linkClass}>
            <FiPackage size={16} className={iconClass} />
            <span>Orders</span>
          </Link>
        </motion.div>
      </motion.div>

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

      {isAdmin && (
        <motion.div variants={staggerItem}>
          <motion.div {...navLinkHover} whileHover="hover">
            <Link to="/admin" onClick={closeMenu} className={linkClass}>
              <FiShield size={16} className={iconClass} />
              <span>Admin Panel</span>
            </Link>
          </motion.div>
        </motion.div>
      )}

      {/* Divider before logout */}
      <motion.div variants={staggerItem} className="my-2 mx-4 h-px bg-dark-border" />

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
          <span>Sign Out</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default NavLinks;