// AuthLinks.tsx
import React from "react";
import { Link } from "react-router-dom";

interface AuthLinksProps {
  user: any;
  logout: () => void;
}

const AuthLinks: React.FC<AuthLinksProps> = ({ user, logout }) => {
  return (
    <>
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
    </>
  );
};

export default AuthLinks;
