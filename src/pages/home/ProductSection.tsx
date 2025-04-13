import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    image: "/images/pizza1.png",
    name: "Classic Margherita",
    description:
      "A delicious combination of fresh tomatoes, mozzarella, and basil.",
    link: "/products/margherita",
    category: "Pizzas",
  },
  {
    image: "/images/pizza2.png",
    name: "Pepperoni Feast",
    description:
      "Loaded with spicy pepperoni and melted cheese on a crispy crust.",
    link: "/products/pepperoni",
    category: "Pizzas",
  },
  {
    image: "/images/pizza3.png",
    name: "Veggie Delight",
    description:
      "Topped with fresh bell peppers, mushrooms, onions, and olives.",
    link: "/products/veggie",
    category: "Pizzas",
  },
  {
    image: "/images/pasta.png",
    name: "Creamy Alfredo Pasta",
    description:
      "Rich and creamy Alfredo sauce served over perfectly cooked pasta.",
    link: "/products/alfredo",
    category: "Pastas",
  },
];

const ProductSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };
  const handleViewProductClick = () => {
    // Navigate to the menu page with the 'Pizzas' category
    navigate("/menu");
    // Optional: you could also trigger the category change on the sidebar here
  };

  return (
    <>
      <div className="relative w-full max-w-screen-xl flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 mt-10 lg:mt-20 bg-[url('/images/2.png')] bg-cover bg-center">
        {/* <div className="absolute inset-0 bg-black opacity-10"></div>{" "} */}
        {/* Overlay for readability */}
        <button
          onClick={prevProduct}
          className="absolute bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 lg:p-4 rounded-full transition left-4 sm:left-8 md:left-2 lg:left-[-40px] xl:left-[-60px] top-1/2 transform -translate-y-1/2"
        >
          <ChevronLeft className="w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
        </button>
        <div className="lg:w-1/3 text-center lg:text-left mb-6 lg:mb-0 flex flex-col items-center lg:items-start relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif">
            {products[currentIndex].name}
          </h2>
          <p className="text-white text-sm sm:text-lg lg:text-xl mt-2 font-light italic">
            {products[currentIndex].description}
          </p>
          <a
            onClick={handleViewProductClick} // Add onClick to handle the view product click
            className="inline-block mt-4 bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            View Product
          </a>
        </div>
        <img
          src={products[currentIndex].image}
          alt="Product"
          className="w-3/4 h-auto object-cover sm:w-2/3 lg:w-1/2 xl:w-[60%] transition-all duration-500"
        />
        <button
          onClick={nextProduct}
          className="absolute bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 lg:p-4 rounded-full transition right-4 sm:right-8 md:right-2 lg:right-[-40px] xl:right-[-60px] top-1/2 transform -translate-y-1/2"
        >
          <ChevronRight className="w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
        </button>
      </div>
      {/* Make Order Button */}
      <div className="mt-4">
        <button
          className="bg-gradient-to-r from-green-500 via-green-550 to-green-600 
             text-black py-3 px-12 sm:py-5 sm:px-20 
             rounded-full font-semibold 
             hover:from-green-500 hover:to-green-600 
             transition-all duration-300 transform hover:scale-105 
             shadow-lg hover:shadow-2xl text-base sm:text-lg shadow-md"
          onClick={() => navigate("/menu")}
        >
          Order for Home
        </button>
      </div>
    </>
  );
};

export default ProductSection;
