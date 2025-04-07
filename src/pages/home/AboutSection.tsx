import { Link, useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();
  return (
    <div className="py-16 text-center px-6 relative bg-[url('/images/2.png')] bg-cover bg-center mt-8 w-full h-full ">
      <div className="absolute inset-0 bg-black opacity-40 w-full h-full"></div>

      <div className="relative z-10 text-white">
        <h2 className="text-4xl lg:text-5xl font-serif font-bold drop-shadow-lg mb-6">
          Why Our Restaurant?
        </h2>

        <p className="text-lg lg:text-xl max-w-3xl mx-auto mb-12">
          We believe in quality ingredients, amazing flavors, and the best
          dining experience. Our chefs are passionate about creating memorable
          meals using only the finest ingredients.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-screen-xl mx-auto mt-8">
          <div className="text-center">
            <img
              src="/images/chef.jpg"
              alt="Chef at Work"
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
            <h3 className="mt-4 text-2xl font-semibold">Expert Chefs</h3>
            <p className="mt-2 text-sm text-gray-200">
              Our chefs bring years of experience to the kitchen, crafting
              dishes with precision and love.
            </p>
          </div>

          <div className="text-center">
            <img
              src="/images/ingredients.jpg"
              alt="Fresh Ingredients"
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
            <h3 className="mt-4 text-2xl font-semibold">Fresh Ingredients</h3>
            <p className="mt-2 text-sm text-gray-200">
              We use only the freshest ingredients to create dishes that are
              flavorful and satisfying.
            </p>
          </div>

          <div className="text-center">
            <img
              src="/images/dining.jpg"
              alt="Dining Experience"
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
            <h3 className="mt-4 text-2xl font-semibold">Dining Experience</h3>
            <p className="mt-2 text-sm text-gray-200">
              Our restaurant offers a cozy and inviting ambiance, perfect for
              any occasion.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname === "/") {
                // Already on Home, just scroll
                const section = document.getElementById("reservation");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              } else {
                // Navigate to Home and then scroll
                navigate("/", { state: { scrollTo: "reservation" } });
              }
            }}
          >
            Make a Reservation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
