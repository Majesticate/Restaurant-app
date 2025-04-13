import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Import Firestore

interface MenuItem {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  discountPrice?: number;
  quantity: number;
}

interface MenuItemsProps {
  items: MenuItem[];
  addToCart: (item: MenuItem) => void;
  cart: MenuItem[];
}

const MenuItems: React.FC<MenuItemsProps> = ({ items, addToCart, cart }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(items); // Manage state for items
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [user, setUser] = useState<any>(auth.currentUser);
  const [role, setRole] = useState<string>(""); // State for role
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null); // State for selected item
  const [editItem, setEditItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      if (user) {
        // If the user is logged in, fetch their role from Firestore
        const userRef = doc(db, "users", user.uid); // Reference to the Firestore document
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setRole(userData.role); // Store the user role in the state
          } else {
            console.log("No such document!");
          }
          setLoading(false); // Stop loading after fetching user data
        });
      } else {
        setLoading(false); // Stop loading if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup function to remove the listener when the component unmounts
  }, []);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  const handleButtonClick = (item: MenuItem) => {
    if (!cart.some((cartItem) => cartItem.id === item.id)) {
      addToCart({ ...item, quantity: 1 }); // Ensure quantity starts from 1
      setPopupMessage(`${item.name} added to the cart!`);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1000);
    } else {
      setPopupMessage(`${item.name} is already in the cart.`);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1000);
    }
  };

  const handleViewProduct = (item: MenuItem) => {
    setSelectedItem(item); // Set the selected item for the popup
  };

  const closeProductPopup = () => {
    setSelectedItem(null); // Close the popup by clearing the selected item
  };

  const handleDelete = async (itemId: number) => {
    try {
      await deleteDoc(doc(db, "menuItems", itemId.toString())); // Remove from Firestore
      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      ); // Remove from UI
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditItem(item);
  };

  const handleEditSubmit = async () => {
    if (editItem) {
      try {
        const itemRef = doc(db, "menuItems", editItem.id.toString());
        await updateDoc(itemRef, {
          name: editItem.name,
          description: editItem.description,
          price: editItem.price,
          image: editItem.image,
        });
        setMenuItems((prevItems) =>
          prevItems.map((item) => (item.id === editItem.id ? editItem : item))
        );
        setEditItem(null);
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };

  return (
    <div className="relative">
      {/* Small Popup Message */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-yellow-400 text-black rounded-lg shadow-lg p-6 text-2xl font-semibold transform -translate-y-32">
            {popupMessage}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-black/40 p-6 rounded-lg shadow-lg relative items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-72 h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-300 text-sm text-center">
              {item.description}
            </p>
            <p className="text-lg text-yellow-400 font-bold mt-2">
              ${item.price}
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleViewProduct(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                View Product
              </button>

              <button
                onClick={() => handleButtonClick(item)}
                className={`px-4 py-2 rounded-lg transition ${
                  cart.some((cartItem) => cartItem.id === item.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                disabled={cart.some((cartItem) => cartItem.id === item.id)}
              >
                Add to Cart
              </button>
              {user && role === "admin" && (
                <>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
            {editItem && (
              <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-50">
                <div className="bg-white bg-white/20 p-8 rounded-2xl shadow-2xl w-[600px]">
                  <h2 className="text-2xl font-bold">Edit Product</h2>
                  <input
                    type="text"
                    value={editItem.name}
                    onChange={(e) =>
                      setEditItem({ ...editItem, name: e.target.value })
                    }
                    className="block w-full p-2 border rounded mt-2"
                  />
                  <textarea
                    value={editItem.description}
                    onChange={(e) =>
                      setEditItem({ ...editItem, description: e.target.value })
                    }
                    className="block w-full p-2 border rounded mt-2"
                  />
                  <input
                    type="text"
                    value={editItem.image}
                    onChange={(e) =>
                      setEditItem({ ...editItem, image: e.target.value })
                    }
                    className="block w-full p-2 border rounded mt-2"
                  />
                  <input
                    type="number"
                    value={editItem.price}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        price: parseFloat(e.target.value),
                      })
                    }
                    className="block w-full p-2 border rounded mt-2"
                  />
                  <button
                    onClick={handleEditSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditItem(null)}
                    className="text-red-500 ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Large Product Popup */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] sm:w-[750px] h-[450px] relative flex overflow-hidden">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-2xl text-gray-700 hover:text-gray-900"
              onClick={closeProductPopup}
            >
              ✖
            </button>

            {/* Left Side - Product Image */}
            <div className="w-1/2 flex items-center justify-center bg-gray-100 p-4 rounded-l-2xl">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-90 h-90 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Right Side - Product Info */}
            <div className="w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedItem.name}
                </h2>
                <p className="text-gray-600 text-md my-3">
                  {selectedItem.description}
                </p>
                <p className="text-xl text-yellow-600 font-semibold">
                  ${selectedItem.price}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleButtonClick(selectedItem)}
                className={`w-full py-3 text-lg font-semibold rounded-lg transition ${
                  cart.some((cartItem) => cartItem.id === selectedItem.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                disabled={cart.some(
                  (cartItem) => cartItem.id === selectedItem.id
                )}
              >
                Add to Cart
              </button>
              <div>
                {user && role === "admin" && (
                  <button
                    onClick={() => handleDelete(selectedItem.id)}
                    className="text-red-500 hover:text-red-700 font-semibold "
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItems;
