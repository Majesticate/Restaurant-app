import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    // Scroll down just enough to hide the header
    window.scrollTo({
      top: 150, // Adjust this value to match your header height
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[url('/images/restaurant-interior-background.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <h1 className="relative text-5xl font-bold text-center">Our Story</h1>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Welcome to Our Restaurant
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Our journey began with a passion for delicious food and a commitment
          to exceptional hospitality. Established in [Year], we have been
          serving authentic dishes crafted with fresh, high-quality ingredients.
          Every plate tells a story of tradition, innovation, and love for great
          cuisine.
        </p>
      </div>

      {/* Our Values */}
      <div className="bg-gray-800 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Values</h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              {/* Image above Fresh Ingredients */}
              <img
                src="/images/ingredients.jpg"
                alt="Fresh Ingredients"
                className="w-64 h-64 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-yellow-500">
                Fresh Ingredients
              </h3>
              <p className="text-gray-300">
                We source the best quality ingredients for our dishes.
              </p>
            </div>

            <div>
              {/* Image above Customer Experience */}
              <img
                src="/images/reservation.jpeg"
                alt="Customer Experience"
                className="w-64 h-64 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-yellow-500">
                Customer Experience
              </h3>
              <p className="text-gray-300">
                Providing a warm and welcoming atmosphere for everyone.
              </p>
            </div>

            <div>
              {/* Image above Authentic Flavors */}
              <img
                src="/images/authentic-flavors.jpg"
                alt="Authentic Flavors"
                className="w-64 h-64 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-yellow-500">
                Authentic Flavors
              </h3>
              <p className="text-gray-300">
                Every meal is crafted with a touch of tradition and creativity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Chefs</h2>
        <div className="grid md:grid-cols-2 gap-6 text-center">
          <div>
            <img
              src="/images/chef1.jpg"
              alt="Chef 1"
              className="w-200 h-70 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Chef John Doe</h3>
            <p className="text-gray-300">Master of Italian Cuisine</p>
          </div>
          <div>
            <img
              src="/images/chef2.jpg"
              alt="Chef 2"
              className="w-100 h-70 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Chef Jane Smith</h3>
            <p className="text-gray-300">Expert in Fusion Dishes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
