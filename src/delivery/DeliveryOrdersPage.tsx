import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const DeliveryOrders = () => {
  const [user, setUser] = useState<any>(null);
  const [myDeliveries, setMyDeliveries] = useState<any[]>([]);
  const [availableOrders, setAvailableOrders] = useState<any[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const allOrders: any[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const available = allOrders
        .filter(
          (order) =>
            order.currentStatus === "Order Accepted" && !order.deliveryPersonId
        )
        .sort((a, b) => b.date?.seconds - a.date?.seconds);

      const mine = allOrders
        .filter((order) => order.deliveryPersonId === user?.uid)
        .sort((a, b) => b.date?.seconds - a.date?.seconds);

      setAvailableOrders(available);
      setMyDeliveries(mine);
    });

    return () => unsubscribe();
  }, [user]);

  const acceptOrder = async (orderId: string) => {
    if (!user) return;
    const orderRef = doc(db, "orders", orderId);
    const orderDoc = await getDoc(orderRef); // Use getDoc instead of get()

    const currentStatus = orderDoc.exists()
      ? orderDoc.data()?.status || {}
      : {}; // Get the existing status (if any)

    // Update the order with the new "Order Accepted" status
    await updateDoc(orderRef, {
      deliveryPersonId: user.uid,
      deliveryPersonEmail: user.email || "",
      currentStatus: "Order Accepted",
      status: {
        ...currentStatus, // Keep the previous statuses
        "Order Accepted": new Date(), // Add the timestamp for the "Order Accepted" status
      },
    });
  };

  const markAsDelivered = async (orderId: string) => {
    if (!user) return;
    const orderRef = doc(db, "orders", orderId);
    const orderDoc = await getDoc(orderRef); // Use getDoc instead of get()

    const currentStatus = orderDoc.exists()
      ? orderDoc.data()?.status || {}
      : {}; // Get the existing status (if any)

    // Update the order with the new "Delivered" status
    await updateDoc(orderRef, {
      currentStatus: "Delivered",
      status: {
        ...currentStatus, // Keep the previous statuses
        Delivered: new Date(), // Add the timestamp for the "Delivered" status
      },
    });
  };

  const undoOrderAcceptance = async (orderId: string) => {
    if (!user) return;
    const orderRef = doc(db, "orders", orderId);
    const orderDoc = await getDoc(orderRef); // Use getDoc instead of get()

    const currentStatus = orderDoc.exists()
      ? orderDoc.data()?.status || {}
      : {}; // Get the existing status (if any)

    // Remove the "Order Accepted" status and set the status back to available or unassigned
    await updateDoc(orderRef, {
      deliveryPersonId: null,
      deliveryPersonEmail: "",
      currentStatus: "Order Accepted", // Or you can set it to "Available" based on your app's logic
      status: {
        ...currentStatus, // Keep the previous statuses
        "Order Accepted": null, // Remove the "Order Accepted" status
      },
    });
  };

  return (
    <div className="p-6 space-y-10 text-white bg-gradient-to-br from-[#1a2a3a] to-[#0f1f2f] min-h-screen">
      <h1 className="text-3xl font-bold">Delivery Dashboard</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Available Deliveries</h2>
        <div className="space-y-4">
          {availableOrders.length === 0 ? (
            <p className="text-gray-400">No available deliveries.</p>
          ) : (
            availableOrders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p>Status: {order.currentStatus}</p>
                  <p>Total: ${order.totalPrice.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => acceptOrder(order.id)}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-black font-semibold"
                >
                  Accept
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">My Deliveries</h2>
        <div className="space-y-4">
          {myDeliveries.length === 0 ? (
            <p className="text-gray-400">You have no deliveries.</p>
          ) : (
            myDeliveries.map((order) => (
              <div
                key={order.id}
                className="bg-gray-700 p-4 rounded-lg flex flex-col"
              >
                <p className="font-semibold">Order #{order.id}</p>
                <p>Status: {order.currentStatus}</p>
                <p>Total: ${order.totalPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-400">
                  Ordered:{" "}
                  {new Date(order.date?.seconds * 1000).toLocaleString()}
                </p>

                {order.currentStatus === "Order Accepted" && (
                  <>
                    <button
                      onClick={() => markAsDelivered(order.id)}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-black font-semibold mt-4"
                    >
                      Mark as Delivered
                    </button>
                    <button
                      onClick={() => undoOrderAcceptance(order.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-black font-semibold mt-4"
                    >
                      Undo Acceptance
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default DeliveryOrders;
