// DesktopNavigation.tsx
import React from "react";
import { Link } from "react-router-dom";
import CartLink from "./CartLink";

interface DesktopNavigationProps {
  user: any;
  cartCount: number;
  location: any;
  navigate: Function;
  logout: () => void; // <-- add logout to props
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  user,
  cartCount,
  location,
  navigate,
  logout, // <-- destructure logout from props
}) => {
  return (
    <nav className="hidden md:flex space-x-15 items-center font-semibold">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/menu" className="nav-link">
        Menu
      </Link>
      <Link
        to="/"
        className="nav-link"
        onClick={(e) => {
          e.preventDefault();
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
        className="nav-link"
        onClick={(e) => {
          e.preventDefault();
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
      <Link to="/about" className={`nav-link ${!user ? "ml-45" : ""}`}>
        About
      </Link>
      <Link to="/contact" className="nav-link">
        Contact
      </Link>
      <CartLink cartCount={cartCount}></CartLink>
      {user ? (
        <>
          <Link
            to="/"
            onClick={logout}
            className="nav-link flex items-center space-x-1 relative"
          >
            Logout
          </Link>
          <Link
            to="/orders"
            className="nav-link flex items-center space-x-1 relative"
          >
            Orders
          </Link>
        </>
      ) : (
        <Link to="/login" className="nav-link">
          Login
        </Link>
      )}
    </nav>
  );
};

export default DesktopNavigation;
