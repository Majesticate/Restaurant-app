import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { ShoppingCart, Calendar, DollarSign, CheckCircle } from "lucide-react";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date:
              data.date instanceof Timestamp ? data.date.toDate() : data.date,
          };
        });

        // Sort the orders by date (newest first)
        fetchedOrders.sort((a, b) => b.date.getTime() - a.date.getTime());

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle click outside modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedOrder(null); // ✅ Correct function call
      }
    };

    if (selectedOrder) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedOrder]);

  const getStatusSteps = (
    status: string | null | undefined,
    timestamps: any
  ) => {
    const steps = [
      { name: "Order Requested", key: "Order Requested" },
      { name: "Order Accepted", key: "Order Accepted" },
      { name: "Picked Up", key: "Picked Up" },
      { name: "Delivered", key: "Delivered" },
    ];

    const currentStatusIndex = steps.findIndex((step) =>
      (status?.toLowerCase() ?? "").includes(step.name.toLowerCase())
    );

    return steps.map((step, index) => ({
      name: step.name,
      completed: index <= currentStatusIndex,
      timestamp: timestamps?.[step.key]?.toDate?.() ?? null,
    }));
  };

  const extractCurrentStatus = (statusObj: any) => {
    const steps = [
      "Order Requested",
      "Order Accepted",
      "Picked Up",
      "Delivered",
    ];
    for (let i = steps.length - 1; i >= 0; i--) {
      if (statusObj?.[steps[i]]) {
        return steps[i];
      }
    }
    return "Order Requested"; // default fallback
  };

  return (
    <div className="min-h-screen bg-[url('/images/2.png')] bg-cover bg-center flex flex-col items-center p-6">
      <h2 className="text-white text-3xl font-bold mb-6 text-center">
        Your Orders
      </h2>

      {loading ? (
        <div className="text-white text-xl text-center">Loading...</div>
      ) : orders.length === 0 ? (
        <p className="text-white text-lg text-center">No orders found.</p>
      ) : (
        <div className="w-full max-w-4xl bg-black/50 p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-md">
          {orders.map((order) => (
            <div
              key={order.id}
              className="mb-6 p-4 md:p-6 bg-white bg-opacity-90 rounded-xl shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 space-y-2 md:space-y-0">
                <p
                  className="text-lg font-bold text-black flex items-center cursor-pointer hover:underline"
                  onClick={() => setSelectedOrder(order)}
                >
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

      {/* ✅ Modal with outside click to close */}
      {selectedOrder &&
        (console.log("Order Status:", selectedOrder.status),
        (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div
              ref={modalRef}
              className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full space-y-4 relative"
            >
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-2 right-4 text-black text-xl font-bold"
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4 text-center">
                Order Status: {selectedOrder.id}
              </h3>
              <ul className="space-y-3">
                {getStatusSteps(
                  extractCurrentStatus(selectedOrder.status),
                  selectedOrder.status
                ).map((step, index) => (
                  <li
                    key={index}
                    className={`flex justify-between items-center space-x-4 ${
                      step.completed ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full" />
                      )}
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                    {step.timestamp ? (
                      <span className="text-xs text-gray-600 min-w-[130px] text-right">
                        {step.timestamp.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-600 min-w-[130px] text-right">
                        -
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Orders;
