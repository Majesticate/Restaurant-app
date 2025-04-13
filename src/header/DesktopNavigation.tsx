import React from "react";
import { Link } from "react-router-dom";
import CartLink from "./CartLink";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

interface DesktopNavigationProps {
  user: any;
  cartCount: number;
  location: any;
  navigate: Function;
  logout: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  user,
  cartCount,
  location,
  navigate,
  logout,
}) => {
  const { t, i18n } = useTranslation(); // Initialize t and i18n

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang); // Change language using i18next
    window.scrollTo(0, 0); // Scroll to the top after language change
  };

  return (
    <nav className="hidden md:flex space-x-15 items-center font-semibold">
      <Link to="/" className="nav-link">
        {t("home")}
      </Link>
      <Link to="/menu" className="nav-link">
        {t("menu")}
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
        {t("restaurants")}
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
        {t("navigation.reservation")}
      </Link>
      <Link to="/about" className={`nav-link ${!user ? "ml-20" : ""}`}>
        {t("about")}
      </Link>
      <Link to="/contact" className="nav-link">
        {t("contact")}
      </Link>
      <CartLink cartCount={cartCount}></CartLink>
      {user ? (
        <>
          <Link
            to="/"
            onClick={logout}
            className="nav-link flex items-center space-x-1 relative"
          >
            {t("logout")}
          </Link>
          <Link
            to="/orders"
            className="nav-link flex items-center space-x-1 relative"
          >
            {t("orders")}
          </Link>
        </>
      ) : (
        <Link to="/login" className="nav-link">
          {t("login")}
        </Link>
      )}

      {/* Language Switcher Button */}
      {/* <button
        onClick={() =>
          handleLanguageChange(i18n.language === "en" ? "bg" : "en")
        }
        className="nav-link flex items-center space-x-1 relative"
      >
        {i18n.language === "en" ? "BG" : "EN"}{" "}
      </button> */}
    </nav>
  );
};

export default DesktopNavigation;
