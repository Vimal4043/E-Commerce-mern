import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLinks from "./NavLinks";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const DRAWER_ID = "menu-dropdown";

const Nav = ({ logout }) => {
  const [open, setOpen] = useState(false);
  const toggler = () => setOpen(!open);
  const menuRef = useRef(null);
  const { pathname } = useLocation();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  // Trap focus inside the dropdown when open
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    const dropdown = document.getElementById(DRAWER_ID);
    if (dropdown) {
      dropdown.focus();
    }
    return () => {
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        onClick={toggler}
        className="btn-icon"
        aria-label={open ? "Close menu" : "Menu"}
        aria-expanded={open}
        aria-controls={DRAWER_ID}
      >
        {open ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Dropdown Box (slides out below hamburger) */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={DRAWER_ID}
            role="menu"
            aria-label="Menu"
            tabIndex={-1}
            className="absolute top-full right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-4rem)] z-50 outline-none"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
          >
            <div className="glass-strong shadow-xl rounded-lg flex flex-col overflow-hidden">
              {/* Dropdown Links */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="flex flex-col gap-1">
                  <NavLinks logout={logout} closeMenu={toggler} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
