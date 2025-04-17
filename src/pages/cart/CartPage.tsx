import { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const CartPage = ({
  cart,
  setCart,
}: {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const navigate = useNavigate();
  const deliveryFee = 5;
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [formData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const deliveryFormRef = useRef<HTMLDivElement>(null);
  const auth = getAuth();

  const checkUserLoggedIn = () => {
    const user = auth.currentUser;
    return user;
  };

  const increaseQuantity = (id: number) => {
    setCart((prevItems) => {
      const updated = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
      updateCartInFirestore(updated);
      return updated;
    });
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevItems) => {
      const updated = prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      updateCartInFirestore(updated);
      return updated;
    });
  };

  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    updateCartInFirestore(updated);
  };

  const updateCartInFirestore = async (updatedCart: any[]) => {
    const user = auth.currentUser;
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { cart: updatedCart }, { merge: true });
    }
  };

  useEffect(() => {
    setCart((prevCart) => {
      const initialized = prevCart.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1,
      }));
      updateCartInFirestore(initialized);
      return initialized;
    });
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const user = auth.currentUser;
      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          const userCart = cartSnap.data().cart || [];
          setCart(userCart);
        }
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const user = auth.currentUser;

      const localCartRaw = localStorage.getItem("cart");
      let localCart: any[] = [];

      try {
        if (localCartRaw) {
          localCart = JSON.parse(localCartRaw);
        }
      } catch (e) {
        console.error("Failed to parse local cart:", e);
      }

      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        const firebaseCart = cartSnap.exists()
          ? cartSnap.data().cart || []
          : [];

        // Merge logic
        const mergedMap = new Map();

        [...firebaseCart, ...localCart].forEach((item) => {
          const existing = mergedMap.get(item.id);
          if (existing) {
            mergedMap.set(item.id, {
              ...item,
              quantity: (existing.quantity || 1) + (item.quantity || 1),
            });
          } else {
            mergedMap.set(item.id, { ...item, quantity: item.quantity || 1 });
          }
        });

        const mergedCart = Array.from(mergedMap.values());

        // Save merged to Firebase & set state
        await setDoc(cartRef, { cart: mergedCart }, { merge: true });
        setCart(mergedCart);
        localStorage.removeItem("cart"); // optional: clear local cart after sync
      } else {
        // User not logged in → just load localCart
        setCart(localCart);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const subtotal = cart.reduce((total, item) => {
    const price = item.discountPrice ?? item.price;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);

  const originalTotal = cart.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  const discountAmount = originalTotal - subtotal;
  const discountPercentage =
    originalTotal > 0
      ? ((discountAmount / originalTotal) * 100).toFixed(2)
      : "0.00";
  const total = subtotal + deliveryFee;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        deliveryFormRef.current &&
        !deliveryFormRef.current.contains(event.target as Node)
      ) {
        setShowDeliveryForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNext = () => {
    const user = checkUserLoggedIn();
    if (!user) {
      navigate("/login");
    } else {
      setShowDeliveryForm(true);
    }
  };

  return (
    <div className="relative py-16 px-6 bg-[url('/images/2.png')] bg-cover bg-center min-h-screen flex flex-col items-center">
      <div className="absolute inset-0 bg-black opacity-0"></div>

      <div className="relative max-w-4xl w-full bg-black opacity-80 text-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <div className="flex items-center space-x-2">
                    {item.discountPrice ? (
                      <>
                        <span className="text-red-500 line-through">
                          ${item.price}
                        </span>
                        <span className="text-green-500 font-bold">
                          ${item.discountPrice}
                        </span>
                      </>
                    ) : (
                      <span className="text-yellow-400 font-bold">
                        ${item.price}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-yellow-500 text-sm px-2 py-1 rounded-lg"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-yellow-500 text-sm px-2 py-1 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-6 border-t border-gray-700 pt-4">
            <p className="text-lg">
              Subtotal:{" "}
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </p>
            <p className="text-lg">
              Delivery Fee:{" "}
              <span className="font-bold">${deliveryFee.toFixed(2)}</span>
            </p>
            {discountAmount > 0 && (
              <p className="text-lg text-green-500">
                You saved: ${discountAmount.toFixed(2)} ({discountPercentage}%)
              </p>
            )}
            <p className="text-xl font-bold mt-2">Total: ${total.toFixed(2)}</p>
            <button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition mt-4"
              onClick={handleNext}
            >
              Next
            </button>
            <Sidebar
              formData={formData}
              showDeliveryForm={showDeliveryForm}
              setShowDeliveryForm={setShowDeliveryForm}
              cart={cart}
              setCart={setCart}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

// export const acceptDelivery = async (orderId: string) => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (!user) {
//     alert("You must be logged in to accept a delivery.");
//     return;
//   }

//   try {
//     const orderRef = doc(db, "orders", orderId);
//     await updateDoc(orderRef, {
//       deliveryPersonId: user.uid,
//       deliveryPersonEmail: user.email,
//       "status.Order Accepted": {
//         timestamp: new Date().toISOString(),
//         status: "Order Accepted",
//       },
//     });
//     alert("You have successfully accepted the delivery.");
//   } catch (error) {
//     console.error("Error accepting delivery:", error);
//     alert("Failed to accept delivery. Please try again.");
//   }
// };
