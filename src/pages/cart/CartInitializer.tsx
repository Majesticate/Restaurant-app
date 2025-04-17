import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const CartInitializer = ({
  setCart,
}: {
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    const fetchCart = async () => {
      if (user) {
        // User is logged in, fetch cart from Firestore
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          const userCart = cartSnap.data().cart || [];
          setCart(userCart); // Update the cart with data from Firestore
          localStorage.setItem("cart", JSON.stringify(userCart)); // Store cart in localStorage
        } else {
          setCart([]); // If no cart is found in Firestore, initialize as empty
          localStorage.setItem("cart", JSON.stringify([])); // Initialize empty cart in localStorage
        }
      } else {
        // User is not logged in, load cart from localStorage
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          setCart(JSON.parse(localCart)); // Set cart from localStorage
        } else {
          setCart([]); // If no cart is found in localStorage, initialize as empty
        }
      }
    };

    fetchCart();
  }, [setCart]);

  return null; // This component doesn't render anything, it just initializes the cart
};

export default CartInitializer;
