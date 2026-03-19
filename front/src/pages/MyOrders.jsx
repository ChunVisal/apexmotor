import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (order) =>
            order.cartItems &&
            Array.isArray(order.cartItems) &&
            order.cartItems.length > 0
        );
      setOrders(data);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "orders", id));
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  if (!user) {
    return <p className="p-6">Please log in to see your orders.</p>;
  }

  const visibleOrders = showAll ? orders : orders.slice(0, 4);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">📦 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {visibleOrders.map((order) => (
            <div key={order.id} className="p-4 bg-gray-500 rounded shadow">
              <p className="font-semibold">Name: {order.fullName}</p>
              <p>Email: {order.userEmail}</p>
              <p>
                Ordered on:{" "}
                {order.createdAt?.seconds
                  ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                  : "N/A"}
              </p>
              <div className="mt-2">
                <h4 className="font-semibold mb-1">Items:</h4>
                {order.cartItems.map((car, index) => (
                  <p key={`${order.id}-car-${index}`}>
                    {car.name} - ${car.price}
                  </p>
                ))}
              </div>
              <p className="mt-2 font-bold">Total: ${order.total}</p>
              <button
                onClick={() => handleDelete(order.id)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                🗑️ Remove
              </button>
            </div>
          ))}
          {orders.length > 4 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {showAll ? "Hide History" : "View More History"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
