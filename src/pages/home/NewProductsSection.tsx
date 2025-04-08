import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next"; // Import the translation hook

const newItems = [
  { id: 1, name: "Grilled Salmon", image: "/images/pizza1.png" },
  { id: 2, name: "Pasta Carbonara", image: "/images/pizza2.png" },
  { id: 3, name: "Steak & Fries", image: "/images/pizza3.png" },
  { id: 4, name: "Sushi Platter", image: "/images/pasta.png" },
  { id: 5, name: "Avocado Toast", image: "/images/avocado.jpg" },
  { id: 6, name: "Tiramisu", image: "/images/tiramisu.jpg" },
  { id: 7, name: "Margarita Pizza", image: "/images/pizza4.png" },
  { id: 8, name: "Caesar Salad", image: "/images/salad.jpg" },
  { id: 9, name: "Lobster Roll", image: "/images/lobster.jpg" },
  { id: 10, name: "Ramen Bowl", image: "/images/ramen.jpg" },
];

export default function NewProductsSection() {
  const { t } = useTranslation(); // Get the translation function
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4); // Default to 4 items

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1280) {
        setItemsToShow(4);
      } else if (window.innerWidth >= 1024) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const visibleItems = newItems.slice(startIndex, startIndex + itemsToShow);

  const handleNext = () => {
    if (startIndex + itemsToShow < newItems.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="py-16 bg-white text-center bg-[url('/images/2.png')]">
      <h2 className="text-4xl font-bold text-gray-900">
        {t("newProducts.title")}
      </h2>
      <p className="text-gray-600 mt-2 mb-6 text-lg">
        {t("newProducts.description")}
      </p>

      <div className="relative max-w-8xl mx-auto flex items-center justify-center">
        {/* Left Button (Same as Background) */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`absolute bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 lg:p-4 rounded-full transition 
             top-1/2 transform -translate-y-1/2 
             ${
               itemsToShow === 1
                 ? "-left-9 sm:-left-20"
                 : "left-4 sm:left-8 md:left-2 lg:left-[-50px] xl:left-[-80px]"
             }`}
        >
          <ChevronLeft className="w-6 h-6 sm:w-6 sm:h-6 lg:w-6 lg:h-6" />
        </button>

        {/* Product Row */}
        <div className="flex gap-6 overflow-hidden w-full justify-center">
          {visibleItems.map((item) => (
            <div key={item.id} className="">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-46 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
            </div>
          ))}
        </div>

        {/* Right Button (Same as Background) */}
        <button
          onClick={handleNext}
          disabled={startIndex + itemsToShow >= newItems.length}
          className={`absolute bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 lg:p-4 rounded-full transition 
             top-1/2 transform -translate-y-1/2 
             ${
               itemsToShow === 1
                 ? "-right-9 sm:-right-20"
                 : "right-4 sm:right-8 md:right-2 lg:right-[-50px] xl:right-[-80px]"
             }`}
        >
          <ChevronRight className="w-6 h-6 sm:w-6 sm:h-6 lg:w-6 lg:h-6" />
        </button>
      </div>
    </div>
  );
}
