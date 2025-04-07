import { Link } from "react-router-dom";

const NewsSection2 = () => {
  return (
    <div className="py-4 bg-gradient-to-r from-blue-500 to-teal-400 text-center text-white bg-cover bg-center bg-[url('/images/2.png')] mb-24 ">
      <h2 className="text-4xl font-extrabold tracking-wide text-shadow-md">
        Latest News
      </h2>
      <p className="text-lg mt-4 max-w-6xl mx-auto text-opacity-90">
        Discover the exciting updates at our newly renovated restaurant in
        Lozenets! We've added stunning features to enhance your dining
        experience, from a refreshing garden space to a modern, cozy ambiance.
        Check out the latest developments and join us for a unique culinary
        adventure.
      </p>

      {/* News Image as Link */}
      <Link to="/news" className="mt-8 inline-block">
        <img
          src="/images/garden.jpg"
          alt="Garden at our restaurant"
          className="w-full sm:w-4/5 md:w-3/5 lg:w-5/5 max-w-2xl mx-auto rounded-lg shadow-2xl transform transition-transform hover:scale-105 duration-300"
        />
      </Link>
    </div>
  );
};

export default NewsSection2;
