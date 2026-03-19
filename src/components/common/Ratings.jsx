// src/components/common/Ratings.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { SiTrustpilot } from "react-icons/si";

// 🔹 Hook to reuse logic
function useRatings() {
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      let allRatings = [];

      // Get ratings from users collection
      const usersSnap = await getDocs(collection(db, "users"));
      usersSnap.forEach((doc) => {
        const data = doc.data();
        if (data.rating) allRatings.push(data.rating);
      });

      // Get ratings from anonymous collection
      const anonSnap = await getDocs(collection(db, "ratings"));
      anonSnap.forEach((doc) => {
        const data = doc.data();
        if (data.stars) allRatings.push(data.stars);
      });

      // Calculate avg + count
      if (allRatings.length > 0) {
        const total = allRatings.reduce((acc, val) => acc + val, 0);
        setAverage((total / allRatings.length).toFixed(1));
        setCount(allRatings.length);
      }
    };

    fetchRatings();
  }, []);

  return { average, count };
}

// 🔹 Component 1: Show average + count
export function RatingSummary() {
  const { average, count } = useRatings();

  return (
    <div className="flex items-center space-x-2">
      <SiTrustpilot className="text-green-400 text-2xl" />
      <p className="text-xs">
        Rated {average} <br /> by {count} users
      </p>
    </div>
  );
}

// 🔹 Component 2: Show only average
export function AverageRating() {
  const { average } = useRatings();

  return (
    <span className="flex items-center gap-1 text-xs font-medium">
       {average}/5 Rating 
    </span>
  );
}
