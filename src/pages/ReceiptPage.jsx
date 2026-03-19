import { useEffect, useState } from "react";

export default function ReceiptPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/orders.json");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("❌ Failed to load receipt:", err);
      }
    };
    fetchOrders();
  }, []);

  const latestOrder = orders.length ? orders[orders.length - 1] : null;

  if (!latestOrder) return <p className="p-6">Loading receipt...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">🎉 Payment Successful!</h2>
      <h3 className="text-xl font-semibold mb-2">🧾 Receipt</h3>

      <p><strong>Name:</strong> {latestOrder.name}</p>
      <p><strong>Email:</strong> {latestOrder.email}</p>
      <p><strong>Date:</strong> {new Date(latestOrder.createdAt).toLocaleString()}</p>

      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">🚗 Cars Purchased:</h4>
        {latestOrder.items.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right text-green-600 font-bold text-xl">
        Total: ${latestOrder.items.reduce((sum, i) => sum + Number(i.price), 0)}
      </div>
    </div>
  );
}
