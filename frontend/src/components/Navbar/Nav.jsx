import { useState, useEffect, useRef } from "react";
import NavLinks from "./NavLinks";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const Nav = ({ logout }) => {
  const [open, setOpen] = useState(false);
  const toggler = () => setOpen(!open);
  const menuRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        onClick={toggler}
        className="btn-icon"
        aria-label="Menu"
      >
        {open ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Mobile Drawer Overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 md:hidden animate-slide-in-right">
            <div className="h-full glass-strong shadow-xl flex flex-col">
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-glass-border">
                <span className="text-sm font-display font-light tracking-[0.15em] uppercase text-white">
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="btn-icon"
                  aria-label="Close menu"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="flex flex-col gap-1">
                  <NavLinks logout={logout} closeMenu={toggler} />
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="px-6 py-4 border-t border-glass-border">
                <p className="text-[10px] tracking-widest text-text-muted uppercase text-center">
                  Horologium — Luxury Timepieces
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;