import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const PastOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const fetchAllOrders = async () => {
    const db = getFirestore();
    const ordersCollection = collection(db, "orders");

    // Fetch orders and order them by the 'date' field (newest first)
    const q = query(ordersCollection, orderBy("date", "desc"));

    try {
      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleViewOrderDetails = (orderId: string) => {
    const order = orders.find((order) => order.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setShowOrderDetails(true);
    }
  };

  const handleCloseModal = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  return (
    <div className="py-16 px-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Past Orders</h2>

        {orders.length === 0 ? (
          <p className="text-center text-lg">No past orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg text-white"
              >
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-bold">Order #{order.id}</h3>
                  <p className="text-sm">Status: {order.currentStatus}</p>
                  <p className="text-sm">Total: ${order.totalPrice}</p>
                </div>
                <button
                  onClick={() => handleViewOrderDetails(order.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEye size={20} />
                  View Order Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Order Details */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-4">
              Order #{selectedOrder.id} Details
            </h3>
            <p>
              <strong>Status:</strong> {selectedOrder.currentStatus}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.totalPrice}
            </p>
            <p>
              <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
            </p>
            <p>
              <strong>Delivery Address:</strong> {selectedOrder.address}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.email}
            </p>

            <h4 className="font-semibold mt-4">Items:</h4>
            <ul className="space-y-2">
              {selectedOrder.items.map((item: any) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mt-4">Order Status:</h4>
            <ul className="space-y-2">
              {Object.entries(selectedOrder.status).map(
                ([status, timestamp]: any) => (
                  <li key={status}>
                    <p>
                      <strong>
                        {status.replace(/([A-Z])/g, " $1").toUpperCase()}:
                      </strong>
                      {new Date(timestamp.seconds * 1000).toLocaleString()}
                    </p>
                  </li>
                )
              )}
            </ul>

            <button
              onClick={handleCloseModal}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastOrdersPage;
