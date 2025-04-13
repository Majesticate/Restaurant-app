import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import MenuOverlay from "./MenuOverlay";
import MenuItems from "./MenuItems";

const defaultMenuItems = [
  {
    id: "static-1",
    name: "Caesar Salad",
    category: ["Salads", "news"], // Category is now an array
    image: "/images/ceasar.jpg",
    description: "Lettuce, parmesan, croutons, caesar dressing.",
    price: 3.0,
  },
  {
    id: "static-2",
    name: "Grilled Salmon",
    category: ["Fish"], // Category is now an array
    image: "https://via.placeholder.com/80",
    description: "Fresh salmon with lemon butter sauce.",
    price: 4.0,
  },
  {
    id: "static-3",
    name: "Roasted Chicken",
    category: ["Chicken"], // Category is now an array
    image: "https://via.placeholder.com/80",
    description: "Oven-roasted chicken with herbs.",
    price: 5.0,
  },
];

const categories = [
  "All",
  "Salads",
  "Soups",
  "Fish",
  "Chicken",
  "Beef",
  "Pastas",
  "Pizzas",
  "Burgers",
  "Desserts",
  "Cocktails",
  "Soft Drinks",
  "Alcohol",
];

const MenuPage = ({
  cart,
  setCart,
}: {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the category from the URL if it exists
    const categoryFromUrl = location.pathname.split("/")[2];
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl); // Set the category to Pizzas if the URL has '/menu/pizzas'
    }

    setLoading(true);
    console.log("Fetching menu for category:", selectedCategory);

    let menuQuery =
      selectedCategory === "All"
        ? collection(db, "menuItems")
        : query(
            collection(db, "menuItems"),
            where("category", "array-contains", selectedCategory)
          );

    const unsubscribe = onSnapshot(menuQuery, (snapshot) => {
      const fetchedItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredDefaults =
        selectedCategory === "All"
          ? defaultMenuItems
          : defaultMenuItems.filter((item) =>
              item.category.includes(selectedCategory)
            );

      setMenuItems([...filteredDefaults, ...fetchedItems]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedCategory, location.pathname]);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  return (
    <div className="relative min-h-screen bg-[url('/images/2.png')] bg-cover bg-center text-white flex flex-col md:flex-row">
      <button className="md:hidden p-4" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {menuOpen && <MenuOverlay onClick={() => setMenuOpen(false)} />}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onClose={() => setMenuOpen(false)}
        menuOpen={menuOpen}
      />

      <main className="w-full md:w-3/4 p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Menu</h2>

        {loading ? (
          <p className="text-center">Loading menu items...</p>
        ) : (
          <MenuItems items={menuItems} addToCart={addToCart} cart={cart} />
        )}
      </main>
    </div>
  );
};

export default MenuPage;
