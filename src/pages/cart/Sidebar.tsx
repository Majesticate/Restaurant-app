import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface SidebarProps {
  formData: {
    name: string;
    email: string;
    address: string;
  };
  showDeliveryForm: boolean;
  setShowDeliveryForm: (value: boolean) => void;
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  showDeliveryForm,
  setShowDeliveryForm,
  cart,
  setCart,
}) => {
  const [localFormData, setLocalFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowDeliveryForm(false);
      }
    };

    if (showDeliveryForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeliveryForm]);

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showCardDetails, setShowCardDetails] = useState(false);

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedMethod = e.target.value;
    setPaymentMethod(selectedMethod);
    setShowCardDetails(selectedMethod === "card");
  };

  const handleOrderClick = async () => {
    if (localFormData.name && localFormData.address && cart.length > 0) {
      try {
        const user = auth.currentUser;

        // If user is logged in, save the order with userId and email
        const orderData: any = {
          name: localFormData.name,
          email: user ? user.email : localFormData.email, // Use logged-in user's email or the form email
          address: localFormData.address,
          items: cart,
          totalPrice: cart.reduce(
            (acc, item) =>
              acc + (item.discountPrice || item.price) * item.quantity,
            0
          ),
          date: serverTimestamp(),
          paymentMethod,
        };

        // If the user is logged in, include userId in the order
        if (user) {
          orderData.userId = user.uid;
        }

        // Log the order data for debugging
        console.log("Submitting Order:", orderData);

        // Save the order to the Firestore collection
        await addDoc(collection(db, "orders"), orderData);

        alert(
          `Thank you for your order, ${localFormData.name}! Your order has been placed successfully.`
        );

        // Clear the cart and navigate to the home page after the order is placed
        setCart([]);
        navigate("/");
      } catch (error) {
        console.error("Error placing order: ", error);
        alert("Failed to place order. Please try again.");
      }
    } else {
      alert(
        "Please fill out all required fields and ensure your cart is not empty."
      );
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 w-full sm:w-1/4 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
        showDeliveryForm ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6">
        <h2 className="text-xl text-black font-bold mb-4">
          Delivery Information
        </h2>
        <form>
          <div className="mb-3">
            <label className="block text-sm text-black font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg text-black"
              value={localFormData.name}
              onChange={(e) =>
                setLocalFormData({ ...localFormData, name: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-black font-medium">
              Email
            </label>

            {auth.currentUser ? (
              // If logged in, display email in a <p> tag
              <p className="text-black text-lg">{auth.currentUser?.email}</p>
            ) : (
              // If not logged in, show an input field with placeholder
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={localFormData.email}
                onChange={(e) =>
                  setLocalFormData({
                    ...localFormData,
                    email: e.target.value,
                  })
                }
                className="text-black w-full p-3 rounded-md border border-black bg-transparent focus:outline-none focus:ring-2 focus:ring-black"
              />
            )}
          </div>

          <div className="mb-3">
            <label className="block text-sm text-black font-medium">
              Address
            </label>
            <textarea
              placeholder="Your Shipping Address"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg text-black"
              rows={3}
              value={localFormData.address}
              onChange={(e) =>
                setLocalFormData({ ...localFormData, address: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-black font-medium">
              Mobile Phone
            </label>
            <input
              type="tel"
              placeholder="Your Phone Number"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg text-black"
              value={localFormData.phone}
              onChange={(e) =>
                setLocalFormData({ ...localFormData, phone: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-black font-medium">
              Payment Method
            </label>
            <select
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg text-black"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="cash">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
            </select>
          </div>

          {showCardDetails && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-black font-medium">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9101 1121"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg text-black"
                  value={localFormData.cardNumber}
                  onChange={(e) =>
                    setLocalFormData({
                      ...localFormData,
                      cardNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <label className="block text-sm text-black font-medium">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg text-black"
                    value={localFormData.expiry}
                    onChange={(e) =>
                      setLocalFormData({
                        ...localFormData,
                        expiry: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm text-black font-medium">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg text-black"
                    value={localFormData.cvv}
                    onChange={(e) =>
                      setLocalFormData({
                        ...localFormData,
                        cvv: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            className="w-full py-2 mt-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition"
            onClick={handleOrderClick}
          >
            Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
