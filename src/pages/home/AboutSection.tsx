import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Access the translation function

  return (
    <div className="py-16 text-center px-6 relative bg-[url('/images/2.png')] bg-cover bg-center mt-8 w-full h-full">
      <div className="absolute inset-0 bg-black opacity-40 w-full h-full"></div>

      <div className="relative z-10 text-white">
        <h2 className="text-4xl lg:text-5xl font-serif font-bold drop-shadow-lg mb-6">
          {t("aboutSection.title")}
        </h2>

        <p className="text-lg lg:text-xl max-w-3xl mx-auto mb-12">
          {t("aboutSection.description")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-screen-xl mx-auto mt-8">
          <div className="text-center">
            <img
              src="/images/chef.jpg"
              alt={t("aboutSection.cards.chef.alt")}
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
            <h3 className="mt-4 text-2xl font-semibold">
              {t("aboutSection.cards.chef.title")}
            </h3>
            <p className="mt-2 text-sm text-gray-200">
              {t("aboutSection.cards.chef.description")}
            </p>
          </div>

          <div className="text-center">
            <img
              src="/images/ingredients.jpg"
              alt={t("aboutSection.cards.ingredients.alt")}
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
            <h3 className="mt-4 text-2xl font-semibold">
              {t("aboutSection.cards.ingredients.title")}
            </h3>
            <p className="mt-2 text-sm text-gray-200">
              {t("aboutSection.cards.ingredients.description")}
            </p>
          </div>

          <div className="text-center">
            <img
              src="/images/dining.jpg"
              alt={t("aboutSection.cards.dining.alt")}
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
            <h3 className="mt-4 text-2xl font-semibold">
              {t("aboutSection.cards.dining.title")}
            </h3>
            <p className="mt-2 text-sm text-gray-200">
              {t("aboutSection.cards.dining.description")}
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
                const section = document.getElementById("reservation");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              } else {
                navigate("/", { state: { scrollTo: "reservation" } });
              }
            }}
          >
            {t("aboutSection.reserveButton")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
