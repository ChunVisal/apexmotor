// src/pages/Notifications.jsx
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa";

export default function Notifications() {
  const { user } = useAuth();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    let isMounted = true;

    const q = query(
      collection(db, "notifications", user.uid, "list"),
      orderBy("timestamp", "desc")
    );

    const unsub = onSnapshot(q, async (snap) => {
      try {
        // Map docs -> array of promises (we may fetch user doc for image)
        const notis = await Promise.all(
          snap.docs.map(async (docSnap) => {
            const data = docSnap.data();

            // 1) If the doc already contains a full URL, use it
            if (data.senderPhotoURL && typeof data.senderPhotoURL === "string" && data.senderPhotoURL.startsWith("http")) {
              return { id: docSnap.id, senderPhotoURL: data.senderPhotoURL, ...data };
            }

            // 2) Otherwise try to fetch the sender's user doc
            let photoFromUser = null;
            if (data.senderId) {
              try {
                const userDocRef = doc(db, "users", data.senderId);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                  const u = userDocSnap.data();
                  // try common fields
                  photoFromUser =
                    u.profileImage ||
                    u.photoURL ||
                    u.avatar ||
                    u.image ||
                    u.imageURL ||
                    null;
                }
              } catch (err) {
                console.error("Failed to fetch sender user doc:", err);
              }
            }

            // 3) final fallback
            const finalPhoto =
              photoFromUser && typeof photoFromUser === "string" && photoFromUser.startsWith("http")
                ? photoFromUser
                : "https://res.cloudinary.com/demo/image/upload/sample.jpg"; // <- change to your placeholder if you want

            return { id: docSnap.id, senderPhotoURL: finalPhoto, ...data };
          })
        );

        if (!isMounted) return;
        setNotifications(notis);
        setUnreadCount(notis.filter((n) => !n.read).length);
      } catch (err) {
        console.error("Error processing notifications snapshot:", err);
      }
    });

    return () => {
      isMounted = false;
      unsub();
    };
  }, [user]);

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, "notifications", user.uid, "list", id), { read: true });
    } catch (err) {
      console.error("Error marking notification read:", err);
    }
  };

  if (!user) return null;

  if (location.pathname !== "/notification") {
    return (
      <Link to="/notification" className="relative">
        <FaBell className="w-6 h-6 text-gray-800 hover:text-gray-900 transition" />
        {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-600 rounded-full w-3 h-3"></span>}
      </Link>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`flex items-start gap-3 p-4 rounded-lg border shadow-sm hover:shadow-md transition ${n.read ? "bg-gray-100" : "bg-white"}`}
              onClick={() => markAsRead(n.id)}
            >
              <Link to={`/public-profile/${n.senderId}`}>
                <img
                  src={n.senderPhotoURL}
                  alt={n.senderName || "User"}
                  className="w-10 h-10 rounded-full object-cover border"
                />
              </Link>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <Link to={`/public-profile/${n.senderId}`} className="font-semibold text-gray-800 hover:underline">
                    {n.senderName || "Unknown"}
                  </Link>
                  <span className="text-xs text-gray-400">
                    {n.timestamp?.seconds ? new Date(n.timestamp.seconds * 1000).toLocaleString() : ""}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{n.message}</p>
                {n.carId && (
                  <Link to={`/cars/${n.userId}/${n.carId}`} className="text-blue-500 underline text-sm mt-1 inline-block">
                    View Car
                  </Link>
                )}
                {n.senderEmail && <p className="text-xs text-gray-500 mt-1">{n.senderEmail}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
