// CartLink.tsx
import React from "react";
import { Link } from "react-router-dom";

interface CartLinkProps {
  cartCount: number;
}

const CartLink: React.FC<CartLinkProps> = ({ cartCount }) => {
  return (
    <Link to="/cart" className="nav-link flex items-center space-x-1 relative">
      <span>🛒</span>
      {cartCount > 0 && (
        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
          {cartCount}
        </span>
      )}
      <span>Cart</span>
    </Link>
  );
};

export default CartLink;
