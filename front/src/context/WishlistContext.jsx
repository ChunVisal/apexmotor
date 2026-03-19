// src/context/WishlistContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import {
  doc,
  setDoc,
  onSnapshot,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [rawIds, setRawIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Create notification
  const createNotification = async (carOwnerId, carId, message) => {
    if (!user || user.uid === carOwnerId) return;

    try {
      // Fetch current user Firestore data for profile image
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};

      await addDoc(collection(db, "notifications", carOwnerId, "list"), {
        senderId: user.uid,
        senderName: userData.username || user.email || "User",
        senderEmail: user.email || "N/A",
        senderPhotoURL:
  userData.profileImage ||
  userData.photoURL ||
  userData.avatar ||
  userData.image ||
  userData.imageURL ||
  "" // Fallback to empty string if no image
  ,
        carId,
        userId: carOwnerId,
        message,
        read: false,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error creating notification:", err);
    }
  };

  // ✅ Wishlist listener
  useEffect(() => {
    setLoading(true);
    const stopAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setWishlistItems([]);
        setRawIds([]);
        setLoading(false);
        return;
      }

      const listRef = doc(db, "wishlist", currentUser.uid);

      const stopWishlist = onSnapshot(
        listRef,
        async (snap) => {
          const items = snap.exists() ? snap.data().items || [] : [];
          const unique = [];
          const seen = new Set();

          for (const it of items) {
            const carId = it.carId || it.id;
            const ownerId = it.ownerId || it.userId;
            if (!carId || !ownerId) continue;
            const key = `${ownerId}:${carId}`;
            if (!seen.has(key)) {
              seen.add(key);
              unique.push({ carId, ownerId });
            }
          }

          setRawIds(unique);

          // Fetch car data
          const cars = await Promise.all(
            unique.map(async ({ carId, ownerId }) => {
              try {
                const carSnap = await getDoc(doc(db, "carsUser", ownerId, "cars", carId));
                if (!carSnap.exists()) return null;
                const data = carSnap.data();
                return { id: carSnap.id, ...data, userId: data.userId || ownerId };
              } catch {
                return null;
              }
            })
          );

          setWishlistItems(cars.filter(Boolean));
          setLoading(false);
        },
        (err) => {
          console.error("Wishlist listener error:", err);
          setWishlistItems([]);
          setRawIds([]);
          setLoading(false);
        }
      );

      return () => stopWishlist();
    });

    return () => stopAuth();
  }, []);

  // ✅ Toggle wishlist + notification
  const toggleWishlist = async (car) => {
    if (!user) return;

    const exists = rawIds.some((it) => it.carId === car.id && it.ownerId === car.userId);
    const nextIds = exists
      ? rawIds.filter((it) => !(it.carId === car.id && it.ownerId === car.userId))
      : [...rawIds, { carId: car.id, ownerId: car.userId }];

    setRawIds(nextIds);

    const nextItems = exists
      ? wishlistItems.filter((c) => !(c.id === car.id && c.userId === car.userId))
      : [...wishlistItems, car];

    setWishlistItems(nextItems);

    try {
      await setDoc(doc(db, "wishlist", user.uid), { items: nextIds }, { merge: true });

      // Only notify if just added
      if (!exists) {
        await createNotification(car.userId, car.id, "Your car was added to a wishlist!");
      }
    } catch (err) {
      console.error("Failed to update wishlist:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        rawIds,
        loading,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
