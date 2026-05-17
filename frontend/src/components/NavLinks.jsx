import { Link } from "react-router";

const NavLinks = ({ logout, closeMenu }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <>
      <Link to="/" onClick={closeMenu} className="block md:hidden w-full text-left px-4 py-2 hover:bg-gray-100">
        Browse
      </Link>

      <Link to="/profile" onClick={closeMenu} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
        Profile
      </Link>

      <Link to="/orders" onClick={closeMenu} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
        Orders
      </Link>

      {!isAdmin && (
        <Link to="/contact-us" onClick={closeMenu} className="block md:hidden w-full text-left px-4 py-2 hover:bg-gray-100">
          contact us
        </Link>
      )}

      {isAdmin && (
        <>
          <Link to="/admin" onClick={closeMenu} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Admin
          </Link>
        </>
      )}

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