import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp, // Import the deleteDoc function
} from "firebase/firestore"; // Import Firestore functions
import { To } from "react-router-dom";

interface Order {
  id: string;
  currentStatus: string;
  status: {
    "Order Requested"?: Timestamp | null;
    "Order Accepted"?: Timestamp | null;
    "Picked Up"?: Timestamp | null;
    Delivered?: Timestamp | null;
  };
  date: Timestamp;
  totalPrice: number;
  items: Array<{
    id: string;
    name: string;
    description: string;
    category: string[];
    image: string;
    price: number;
    quantity: number;
  }>;
  name: string;
  paymentMethod: string;
  email: string;
  userId: string;
}

const AdminNewOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const firestore = getFirestore(); // Initialize Firestore

      // Query to get orders that are not 'Delivered' and in the desired statuses
      const q = query(
        collection(firestore, "orders"), // Using modular API
        where("currentStatus", "in", [
          "Order Requested",
          "Order Accepted",
          "Picked Up",
        ])
      );

      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    const firestore = getFirestore();
    const orderRef = doc(firestore, "orders", orderId); // Reference to the order document
    const timestamp = new Date(); // Get current timestamp

    // Prepare status update dynamically
    const statusField = `status.${status}` as keyof Order["status"]; // Ensure the status field is a valid key

    // Prepare the update object
    let updateData: { [key: string]: any } = {
      currentStatus: status, // Update the currentStatus field
    };

    // Add timestamp for the specific status (e.g., "status.Order Requested")
    updateData[statusField] = timestamp;

    try {
      // Update the document in Firestore
      await updateDoc(orderRef, updateData);
      console.log(`Order ${orderId} status updated to: ${status}`);

      // Update the local state for rendering
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, currentStatus: status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    const firestore = getFirestore(); // Initialize Firestore
    const orderRef = doc(firestore, "orders", orderId); // Reference to the order document

    // Delete the order from Firestore
    await deleteDoc(orderRef);

    // Remove the cancelled order from the state
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  // Helper function to determine the background color based on the current status
  const getStatusBackground = (status: string) => {
    switch (status) {
      case "Order Requested":
        return "bg-yellow-300"; // Yellow for "Order Requested"
      case "Order Accepted":
        return "bg-blue-300"; // Blue for "Order Accepted"
      case "Picked Up":
        return "bg-orange-300"; // Orange for "Picked Up"
      case "Delivered":
        return "bg-green-300"; // Green for "Delivered"
      default:
        return "bg-gray-300"; // Default background if status is unknown
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">New Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`p-4 border rounded-lg shadow-lg space-y-3 ${getStatusBackground(
              order.currentStatus
            )}`} // Add dynamic background
          >
            <h2 className="text-xl font-medium text-gray-800">
              Order #{order.id}
            </h2>
            <p className="text-gray-600">Customer: {order.name}</p>
            <p className="text-gray-600">Total: ${order.totalPrice}</p>
            <p
              className={`text-sm ${
                order.currentStatus === "Delivered"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              Status: {order.currentStatus}
            </p>
            <div className="space-x-2">
              {/* Don't show Accept Order button if status is "Delivered" */}
              {order.currentStatus !== "Delivered" &&
                order.currentStatus !== "Order Accepted" && (
                  <button
                    className="py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    onClick={() =>
                      handleUpdateStatus(order.id, "Order Accepted")
                    }
                  >
                    Accept Order
                  </button>
                )}
              {order.currentStatus !== "Picked Up" &&
                order.currentStatus === "Order Accepted" && (
                  <button
                    className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => handleUpdateStatus(order.id, "Picked Up")}
                  >
                    Mark as Picked Up
                  </button>
                )}
              {order.currentStatus !== "Delivered" &&
                order.currentStatus === "Picked Up" && (
                  <button
                    className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    onClick={() => handleUpdateStatus(order.id, "Delivered")}
                  >
                    Mark as Delivered
                  </button>
                )}

              {/* Always visible Cancel Order button */}
              <button
                className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => handleCancelOrder(order.id)}
              >
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNewOrders;
