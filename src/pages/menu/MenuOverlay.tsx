import React from "react";

interface MenuOverlayProps {
  onClick: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ onClick }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-10" onClick={onClick}></div>
  );
};

export default MenuOverlay;
