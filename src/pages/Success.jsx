import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { saveOrder } from "../firebase/order";

export default function Success() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const [, setPurchasedItems] = useState([]);
  const [hasSaved, setHasSaved] = useState(false); // To avoid double save

  useEffect(() => {
    if (user && cartItems.length > 0 && !hasSaved) {
      cartItems.forEach((car) => {
        saveOrder(car, user);
      });
      setPurchasedItems(cartItems);
      clearCart();
      setHasSaved(true);
    }
  }, [user, cartItems, hasSaved, clearCart]);
2
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Success</h2>
      <p>Thank you for your purchase, {user?.email}!</p>
      <p className="mt-4">You have successfully purchased the following items:</p>
    </div>
  );
}
