import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { ShoppingCart, Calendar, DollarSign } from "lucide-react";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.log("No authenticated user found.");
        return;
      }

      console.log("Authenticated User ID:", user.uid); // ✅ Check this
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No orders found for this user.");
        }

        const fetchedOrders = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date:
              data.date instanceof Timestamp ? data.date.toDate() : data.date,
          };
        });

        console.log("Fetched Orders:", fetchedOrders); // ✅ See what’s fetched
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-white text-xl text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[url('/images/2.png')] bg-cover bg-center flex flex-col items-center p-6">
      <h2 className="text-white text-3xl font-bold mb-6 text-center">
        Your Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-white text-lg text-center">No orders found.</p>
      ) : (
        <div className="w-full max-w-4xl bg-black/50 p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-md">
          {orders.map((order) => (
            <div
              key={order.id}
              className="mb-6 p-4 md:p-6 bg-white bg-opacity-90 rounded-xl shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 space-y-2 md:space-y-0">
                <p className="text-lg font-bold text-black flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-yellow-500" />
                  Order ID: {order.id}
                </p>
                <p className="text-sm text-gray-600 flex items-center md:text-right">
                  <Calendar className="w-4 h-4 mr-1" />
                  {order.date
                    ? new Date(order.date).toLocaleString()
                    : "Unknown"}
                </p>
              </div>
              <p className="text-lg text-black font-semibold flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                Total Price: ${order.totalPrice.toFixed(2)}
              </p>
              <ul className="text-black mt-4 space-y-2">
                {order.items.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="text-sm flex items-center space-x-2"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <span>
                      {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
