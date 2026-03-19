import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const SoldContext = createContext();

export const useSold = () => useContext(SoldContext);

export const SoldProvider = ({ children }) => {
  const [soldCars, setSoldCars] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ your AuthContext provides `user`, not `currentUser`
  const { user } = useAuth();

const refreshSoldCars = async () => {
    if (!user) {
      setSoldCars([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const carsRef = collection(db, "carsUser", user.uid, "cars");
      const q = query(carsRef, where("status", "==", "sold"));
      const snap = await getDocs(q);

      const cars = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      
      setSoldCars(cars);
    } catch (err) {
      console.error("❌ Error fetching sold cars:", err);
      setError("Failed to load sold cars.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    refreshSoldCars();
  }, [user]); // run again when user changes

  return (
    <SoldContext.Provider value={{ soldCars, error, loading, refreshSoldCars }}>
      {children}
    </SoldContext.Provider>
  );
};
