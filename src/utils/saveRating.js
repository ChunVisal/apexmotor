// src/utils/saveRating.js
import { db } from "../firebase/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

export async function saveRating(rating, user) {
  try {
    if (user) {
      // Authenticated user → save into their profile
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { rating }, { merge: true });
    } else {
      // Anonymous user → store separately in "ratings" collection
      await addDoc(collection(db, "ratings"), {
        stars: rating,
        createdAt: new Date(),
      });
    }
    console.log("Rating saved ✅");
  } catch (err) {
    console.error("Error saving rating:", err);
  }
}
