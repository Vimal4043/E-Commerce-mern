import { useState, useEffect, useRef } from "react";
import NavLinks from "./NavLinks";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>

      <button
        onClick={toggler}
        className="p-1 rounded-full hover:bg-gray-700 transition text-white"
      >
        {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-10 bg-white text-black rounded-xl shadow-lg w-40 py-2">
          <NavLinks logout={logout} closeMenu={toggler} />
        </div>
      )}
    </div>
  );
};

export default Nav;