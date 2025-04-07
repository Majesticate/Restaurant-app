import React from "react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  user: any;
  navigate: Function;
  location: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  user,
  navigate,
  location,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full bg-black bg-opacity-50 z-50 transition-all duration-300 ${
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setIsMenuOpen(false)}
    >
      <nav
        className="absolute top-16 left-0 w-full bg-[url('/images/2.png')] bg-cover bg-center shadow-lg p-6 
                   text-center space-y-4 rounded-b-lg backdrop-blur-md bg-opacity-90 transition-all duration-300 z-50"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the menu
      >
        <Link
          to="/"
          className="block hover:text-yellow-500 text-white font-semibold"
          onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen(false);
            if (location.pathname === "/") {
              const section = document.getElementById("restaurants");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            } else {
              navigate("/", { state: { scrollTo: "restaurants" } });
            }
          }}
        >
          Restaurants
        </Link>
        <Link
          to="/"
          className="block hover:text-yellow-500 text-white font-semibold"
          onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen(false);
            if (location.pathname === "/") {
              const section = document.getElementById("reservation");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            } else {
              navigate("/", { state: { scrollTo: "reservation" } });
            }
          }}
        >
          Reservation
        </Link>
        <Link
          to="/about"
          className="block hover:text-yellow-500 text-white font-semibold"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="block hover:text-yellow-500 text-white font-semibold"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
        {user ? (
          <>
            <Link
              to="/orders"
              className="block hover:text-yellow-500 text-white font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              to="/"
              className="block hover:text-yellow-500 text-white font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Logout
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className="block hover:text-yellow-500 text-white font-semibold"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
