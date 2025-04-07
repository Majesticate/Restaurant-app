import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NewSelections from "./NewProductsSection";
import AboutSection from "./AboutSection";
import MenuCategories from "./MenuSection";
import ProductSection from "./ProductSection";
import ReservationSection from "./ReservationSection";
import NewsSection2 from "./LatestNewsSection";
import FloatingItems from "./FloatingItems";
import LocationsSection from "./LocationSection";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "reservation") {
      const section = document.getElementById("reservation");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="relative">
      <FloatingItems />
      <div className="w-full min-h-screen bg-[url('/images/2.png')] bg-cover bg-center bg-fixed flex flex-col items-center">
        <ProductSection />
        <MenuCategories />
        <AboutSection />
        <NewSelections />
        <ReservationSection />
        <LocationsSection />
        <NewsSection2 />
      </div>
    </div>
  );
};

export default Home;
