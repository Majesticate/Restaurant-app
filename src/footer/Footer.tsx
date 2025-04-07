import FooterList from "./FooterList";

const Footer = () => {
  const footerData = [
    {
      title: "For us",
      links: [
        { name: "RestaurantName", to: "/" },
        { name: "Work with us", to: "/contact" },
        { name: "Contact us", to: "/contact" },
      ],
    },
    {
      title: "Relations",
      links: [
        { name: "Restaurants", to: "/restaurants" },
        { name: "Menu", to: "/menu" },
        { name: "Locations", to: "Maps..." },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "Rules", to: "/rules" },
        { name: "FAQ", to: "/frequent-asked-questions" },
        { name: "Delivery", to: "/delivery" },
      ],
    },
    {
      title: "Follow us",
      links: [
        { name: "Facebook", to: "/facebook" },
        { name: "Instagram", to: "/instagram" },
        { name: "Youtube", to: "/youtube" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800 text-white py-8 px-6 mt-">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {footerData.map((section, index) => (
          <FooterList key={index} title={section.title} links={section.links} />
        ))}
      </div>
    </footer>
  );
};

export default Footer;

{
  /* <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {footerData.map((section, index) => (
          <FooterList key={index} title={section.title} links={section.links} />
        ))}
      </div> */
}
