import { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";

const CartPage = ({
  cart,
  setCart,
}: {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const deliveryFee = 5;
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [formData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const deliveryFormRef = useRef<HTMLDivElement>(null);

  const increaseQuantity = (id: number) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Ensure every item in the cart has a quantity (defaults to 1 if missing)
  useEffect(() => {
    setCart((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1, // Ensure quantity starts from 1
      }))
    );
  }, []);

  // Fix: Subtotal correctly calculates prices based on quantity
  const subtotal = cart.reduce((total, item) => {
    const price = item.discountPrice ?? item.price;
    const quantity = item.quantity || 1; // Default to 1 if undefined
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
              onClick={() => setShowDeliveryForm(true)}
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
