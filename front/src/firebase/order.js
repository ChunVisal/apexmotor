// src/firebase/order.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function saveOrder(orderData, user) {
  if (!user) {
    console.error("No user found. Can't save order.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      userId: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
    });
    console.log("Order saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving order:", error);
  }
}
