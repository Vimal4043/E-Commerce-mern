import { useState } from "react";
import NavLinks from "./NavLinks";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Nav = ({ logout }) => {
  const [open, setOpen] = useState(false);
  const toggler = () => setOpen(!open);

  return (
    <div className="relative">

      {/* 3 dots */}
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