// src/utils/getOrders.js
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getOrders(userId) {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error("Failed to get orders:", error);
    return [];
  }
}
