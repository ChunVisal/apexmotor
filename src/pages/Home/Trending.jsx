// src/pages/Home/Trending.jsx
import { useState, useEffect } from "react";
import TrendingCarCard from "../../components/cars/CarCardTrend";
import SlideCars from "../../components/cars/SlideCars";
import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Trending() {
  const [filter, setFilter] = useState("trending");
  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const snap = await getDocs(collectionGroup(db, "cars"));
        const carsData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllCars(carsData.filter(Boolean));
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };
    fetchCars();
  }, []);

  // Filter logic
  let filteredCars = allCars.filter(car => {
    if (!car) return false;
    if (filter === "featured") return (car.features?.length || 0) + (car.options?.length || 0) > 0;
    if (filter === "discounts") return Number(car.originalPrice) > Number(car.price);
    if (filter === "specials") return car.type?.toLowerCase() === "sport" && Number(car.horsepower) > 500;
    return true; // trending shows all
  });

  if (filter === "trending") {
    filteredCars = filteredCars
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
      .slice(0, 20);
  }

  return (
    <section className="sm:p-6 sm:px-8 rounded-lg p-2">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <div className="text-left flex flex-col gap-1">
          <h2 className="text-xl sm:text-1xl font-bold text-gray-950">
            Curated Selection of <br className="hidden sm:block" />
            <span className="text-blue-600 dark:text-blue-400" style={{ fontFamily: 'Space Grotesk' }}>
              Quality Vehicles
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md">
            A list of cars that are catching attention
          </p>
        </div>
        <SlideCars filter={filter} setFilter={setFilter} allCars={allCars} />
      </div>

      <div className="flex gap-3 overflow-x-auto custom-scrollbar p-2">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => <TrendingCarCard key={car.id || Math.random()} car={car} />)
        ) : (
          <div className="py-8 text-center text-gray-500 text-sm">
            No cars found in "{filter}"
          </div>
        )}
      </div>
    </section>
  );
}
