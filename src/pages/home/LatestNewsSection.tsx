import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewsSection2 = () => {
  const { t } = useTranslation();

  return (
    <div className="py-4 bg-gradient-to-r from-blue-500 to-teal-400 text-center text-white bg-cover bg-center bg-[url('/images/2.png')] mb-24">
      <h2 className="text-4xl font-extrabold tracking-wide text-shadow-md">
        {t("newsSection.title")}
      </h2>
      <p className="text-lg mt-4 max-w-6xl mx-auto text-opacity-90">
        {t("newsSection.description")}
      </p>

      {/* News Image as Link */}
      <Link to="/" className="mt-8 inline-block">
        <img
          src="/images/garden.jpg"
          alt={t("newsSection.imageAlt")}
          className="w-full sm:w-4/5 md:w-3/5 lg:w-5/5 max-w-2xl mx-auto rounded-lg shadow-2xl transform transition-transform hover:scale-105 duration-300"
        />
      </Link>
    </div>
  );
};

export default NewsSection2;
