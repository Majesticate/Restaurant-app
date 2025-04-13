import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import DesktopNavigation from "./DesktopNavigation";
import CartLink from "./CartLink";
import { auth } from "../firebaseConfig";
import { logout as logoutFunc } from "../authService";
import { db } from "../firebaseConfig"; // Import Firestore
import { doc, getDoc } from "firebase/firestore";
import "./header.css";

const Header = ({ cartCount }: { cartCount: number }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(auth.currentUser);
  const [role, setRole] = useState<string>(""); // State for role
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        // Fetch the user role from Firestore
        const userRef = doc(db, "users", user.uid); // Reference to the user document
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setRole(userData.role); // Assuming role is a field in the Firestore user document
          } else {
            console.log("No such document!");
          }
          setLoading(false); // Data loaded, set loading to false
        });
      } else {
        setLoading(false); // If user is not logged in, stop loading
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    // Optionally, you can display a loading spinner or something while the data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <header className="w-full bg-[url('/images/2.png')] bg-cover bg-center">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div>
          {user && role === "admin" && (
            <Link to="/admin/add-product">
              <button className="hover:text-yellow-500 font-semibold">
                Add new product
              </button>
            </Link>
          )}
          {user && role === "admin" && (
            <>
              <Link
                className="flex items-center hover:text-yellow-500 font-semibold"
                to="/admin/new-orders"
              >
                New Orders
              </Link>
              <Link
                className="flex items-center hover:text-yellow-500 font-semibold"
                to="/admin/past-orders"
              >
                Past Orders
              </Link>
            </>
          )}
          {user && role === "delivery" && (
            <Link to="/delivery/orders">My Deliveries</Link>
          )}
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/Screenshot_2.png"
            alt="Restaurant Logo"
            className="h-12 w-auto sm:h-16 md:h-20 lg:h-24 xl:h-28"
          />
        </Link>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-6">
          <Link to="/" className="hover:text-yellow-500 font-semibold">
            Home
          </Link>
          <Link to="/menu" className="hover:text-yellow-500 font-semibold">
            Menu
          </Link>
          <CartLink cartCount={cartCount} />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <DesktopNavigation
          user={user}
          cartCount={cartCount}
          location={location}
          navigate={navigate}
          logout={logoutFunc}
        />

        {/* Mobile Menu */}
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          user={user}
          navigate={navigate}
          location={location}
        />
      </div>
    </header>
  );
};

export default Header;
