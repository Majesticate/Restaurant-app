import { Link } from "react-router-dom";

const MenuCategories = () => {
  return (
    <>
      <div className="py-12 bg-white text-center bg-[url('/images/2.png')] bg-cover bg-center">
        <h2 className="text-6xl font-extrabold text-white drop-shadow-lg tracking-wide">
          Our Menu
        </h2>
        <p className="text-gray-300 mt-4 text-lg font-semibold drop-shadow-md">
          Explore our delicious selections
        </p>
      </div>

      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-20 max-w-screen-xl mx-auto justify-items-center">
        <div className="text-center">
          <h3 className="mt-4 mb-4 text-4xl lg:text-5xl font-bold text-[#2c3e50] font-serif drop-shadow-lg">
            Food
          </h3>
          <Link to="/menu">
            <img
              src="/images/food-menu.jpg"
              alt="Food"
              className="w-full h-72 sm:h-80 md:h-96 lg:h-[350px] xl:h-[550px] object-cover rounded-lg shadow-md transform transition duration-300 hover:scale-105"
            />
          </Link>
        </div>

        <div className="text-center">
          <h3 className="mt-0 mb-4 text-3xl lg:text-5xl font-bold text-[#2c3e50] font-serif drop-shadow-lg">
            Drinks
          </h3>
          <Link to="/menu#cocktails">
            <img
              src="/images/drink-menu.jpg"
              alt="Drinks"
              className="w-full h-72 sm:h-80 md:h-96 lg:h-[350px] xl:h-[550px] object-cover rounded-lg shadow-md transform transition duration-300 hover:scale-105"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default MenuCategories;
