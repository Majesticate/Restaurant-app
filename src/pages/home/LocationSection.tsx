import { useTranslation } from "react-i18next";

const LocationsSection = () => {
  const { t } = useTranslation();

  const locationData = [
    {
      image: "/images/downtown-restaurant.jpg",
      link: "https://www.google.com/maps?q=123+Main+Street,+Dubai,+UAE",
    },
    {
      image: "/images/seaside-caffe.jpg",
      link: "https://www.google.com/maps?q=456+Ocean+Road,+Dubai+Marina,+UAE",
    },
    {
      image: "/images/roof-top.jpg",
      link: "https://www.google.com/maps?q=789+High+Tower,+Business+Bay,+UAE",
    },
  ];

  const translations = t("locationsSection.locations", {
    returnObjects: true,
  }) as {
    name: string;
    address: string;
    description: string;
    button: string;
  }[];

  return (
    <div
      id="restaurants"
      className="py-16 text-center px-6 relative w-full h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30 w-full h-full"></div>

      <div className="relative z-10 text-white">
        <h2 className="text-4xl lg:text-5xl font-serif font-bold drop-shadow-lg mb-6">
          {t("locationsSection.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {translations.map((location, index) => (
            <div
              key={index}
              className="rounded-lg shadow-lg p-6 transition-all hover:scale-105 bg-cover bg-opacity-60"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                {location.name}
              </h3>
              <img
                src={locationData[index].image}
                alt={location.name}
                className="w-120 h-52 object-cover rounded-lg mb-4 mx-auto"
              />
              <p className="text-sm text-gray-300 mt-2">{location.address}</p>
              <p className="mt-4 text-gray-400">{location.description}</p>
              <a
                href={locationData[index].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
              >
                {location.button}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationsSection;
