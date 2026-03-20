import { Link } from "react-router";

const NavLinks = ({ logout, closeMenu }) => {
  return (
    <>
      <Link to="/" onClick={closeMenu} className="block px-4 py-2 disabled text-gray-400">
        Profile
      </Link>

      <Link to="/" onClick={closeMenu} className="block px-4 py-2 disabled text-gray-400">
        Orders
      </Link>

      <button
        onClick={() => {
          logout();
          closeMenu();
        }}
        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
      >
        Logout
      </button>
    </>
  );
};

export default NavLinks;