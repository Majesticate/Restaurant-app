// Sidebar.tsx
import React from "react";

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onClose: () => void;
  menuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  onClose,
  menuOpen,
}) => {
  return (
    <aside
      className={`absolute md:relative bg-black/20 w-64 md:w-1/4 p-6 rounded-2xl mt-6 mx-4 max-h-fit overflow-hidden transition-transform ${
        menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } z-20`}
    >
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer p-2 rounded-lg text-center md:text-left ${
              selectedCategory === category
                ? "bg-yellow-500 text-black"
                : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setSelectedCategory(category);
              onClose();
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
