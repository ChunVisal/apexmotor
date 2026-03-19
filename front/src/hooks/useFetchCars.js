import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function useFetchCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCars() {
      try {
        const carsRef = collection(db, "cars");
        const brandDocs = await getDocs(carsRef);

        let allCars = [];

        for (const brandDoc of brandDocs.docs) {
          const childrenRef = collection(db, "cars", brandDoc.id, "children");
          const childrenSnapshot = await getDocs(childrenRef);

          const brandCars = childrenSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          allCars = [...allCars, ...brandCars];
        }

        setCars(allCars);
      } catch (err) {
        console.error("🔥 Error fetching nested cars:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllCars();
  }, []);

  return { cars, loading };
}
