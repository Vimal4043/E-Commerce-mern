import { Link } from "react-router-dom";
import { FiHome, FiUser, FiPackage, FiHeadphones, FiShield, FiLogOut, FiGrid } from "react-icons/fi";

const NavLinks = ({ logout, closeMenu }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const linkClass = "flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-text-secondary hover:text-white hover:bg-dark-hover transition-all duration-200 group";

  const iconClass = "text-text-muted group-hover:text-accent transition-colors duration-200 shrink-0";

  return (
    <>
      {/* Mobile-only home link */}
      <Link to="/" onClick={closeMenu} className={`${linkClass} md:hidden`}>
        <FiHome size={16} className={iconClass} />
        <span>Home</span>
      </Link>

      {/* Collections (mobile) */}
      <Link to="/" onClick={closeMenu} className={`${linkClass} md:hidden`}>
        <FiGrid size={16} className={iconClass} />
        <span>Collections</span>
      </Link>

      {/* Divider for mobile */}
      <div className="my-2 mx-4 h-px bg-dark-border md:hidden" />

      <Link to="/profile" onClick={closeMenu} className={linkClass}>
        <FiUser size={16} className={iconClass} />
        <span>Profile</span>
      </Link>

      <Link to="/orders" onClick={closeMenu} className={linkClass}>
        <FiPackage size={16} className={iconClass} />
        <span>Orders</span>
      </Link>

      {!isAdmin && (
        <Link to="/contact-us" onClick={closeMenu} className={`${linkClass} md:hidden`}>
          <FiHeadphones size={16} className={iconClass} />
          <span>Contact Us</span>
        </Link>
      )}

      {isAdmin && (
        <Link to="/admin" onClick={closeMenu} className={linkClass}>
          <FiShield size={16} className={iconClass} />
          <span>Admin Panel</span>
        </Link>
      )}

      {/* Divider before logout */}
      <div className="my-2 mx-4 h-px bg-dark-border" />

      <button
        onClick={() => {
          logout();
          closeMenu();
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-error/80 hover:text-error hover:bg-error/5 transition-all duration-200 w-full text-left group"
      >
        <FiLogOut size={16} className="shrink-0" />
        <span>Sign Out</span>
      </button>
    </>
  );
};

export default NavLinks;