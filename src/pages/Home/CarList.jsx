// src/pages/Home/CarList.jsx
import { useEffect, useMemo, useState, useRef } from "react";
import { collectionGroup, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import CarCard from "../../components/cars/CarCard.jsx";
import Cambodia from "../../assets/logo/Cambodia.png";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Simple deterministic shuffle function
const seededShuffle = (array, seed) => {
  const newArray = [...array];
  let randomSeed = seed;
  
  for (let i = newArray.length - 1; i > 0; i--) {
    // Simple deterministic random based on seed
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    const randomValue = randomSeed / 233280;
    const j = Math.floor(randomValue * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Keys
const CARS_CACHE_KEY = "cars-data-cache";
const DISPLAY_CACHE_KEY = "cars-display-cache";

export default function CarList({ sortOption, isHomePage = false }) {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(35); // Initial number of cars to show for inventory page
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const listRef = useRef(null);

  const location = useLocation();

  // --- Data fetching + caching + shuffle ---
  useEffect(() => {
    let cancelled = false;

    async function fetchCars() {
      setLoading(true);
      try {
        const navigationState = sessionStorage.getItem('navigation-state');
        const isRefresh = navigationState === 'refresh';

        const cachedDisplay = sessionStorage.getItem(DISPLAY_CACHE_KEY);
        const cachedRawData = sessionStorage.getItem(CARS_CACHE_KEY);

        if (cachedDisplay && cachedRawData && !isRefresh) {
          setCars(JSON.parse(cachedRawData)); // Use raw data here
          setLoading(false);
          return;
        }

        const carsCollection = collectionGroup(db, "cars");
        const snapshot = await getDocs(query(carsCollection));

        if (cancelled) return;

        const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

        const shuffledCars = seededShuffle(fetched, Date.now());

        setCars(shuffledCars);

        sessionStorage.setItem(CARS_CACHE_KEY, JSON.stringify(fetched));
        sessionStorage.setItem(DISPLAY_CACHE_KEY, JSON.stringify(shuffledCars));
        sessionStorage.setItem('navigation-state', 'normal');

      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('navigation-state', 'refresh');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // --- Infinite Scroll Logic for Inventory page ---
  useEffect(() => {
    if (isHomePage || loading) return; // Only run on inventory page and after initial load

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      // You can also use listRef.current for more precise container-based scrolling
      if (scrollTop + clientHeight >= scrollHeight - 300 && !isLoadingMore) {
        setIsLoadingMore(true);
        // Simulate a small delay before adding more items
        setTimeout(() => {
          setLimit(prevLimit => prevLimit + 32);
          setIsLoadingMore(false);
        }, 1500); // 1.5 second delay
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, isLoadingMore, loading]);

  // --- Filtering + sorting ---
  const filteredAndSortedCars = useMemo(() => {
    let result = [...cars];
    const params = new URLSearchParams(location.search);
    const brandFilter = params.get("brand");
    const typeFilter = params.get("type");
    const locationFilter = params.get("location");
    const priceFilter = params.get("price");
    const yearFilter = params.get("year");
    const conditionFilter = params.get("condition");
    const deliveryFilter = params.get("delivery");
    const colorFilter = params.get("color");
    const fuelFilter = params.get("fuel");
    const transmissionFilter = params.get("transmission");
    const searchQuery = params.get("search");
    const modelFilter = params.get("model");

    if (modelFilter && modelFilter !== "Any model") {
      result = result.filter(car =>
        car.model?.toLowerCase().includes(modelFilter.toLowerCase())
      );
    }
    
    if (brandFilter && brandFilter !== "All brands") {
      result = result.filter(car => car.name?.toLowerCase().includes(brandFilter.toLowerCase()));
    }
    if (typeFilter) {
      result = result.filter(car => car.type?.toLowerCase() === typeFilter.toLowerCase());
    }
    if (locationFilter && locationFilter !== "All locations") {
      result = result.filter(car => car.locationName?.toLowerCase().includes(locationFilter.toLowerCase()));
    }
    if (priceFilter && priceFilter !== "No max") {
      const maxPrice = parseInt(priceFilter.replace(/[$,]/g, ""), 10);
      result = result.filter(car => car.price <= maxPrice);
    }
    if (yearFilter && yearFilter !== "All years") {
      result = result.filter(car => car.year === parseInt(yearFilter, 10));
    }
    if (conditionFilter && conditionFilter !== "All conditions") {
      result = result.filter(car => car.condition?.toLowerCase() === conditionFilter.toLowerCase());
    }
    if (deliveryFilter === "true") {
      result = result.filter(car => car.delivery === true);
    }
    if (colorFilter && colorFilter !== "All colors") {
      result = result.filter(car => car.color?.toLowerCase() === colorFilter.toLowerCase());
    }
    if (fuelFilter && fuelFilter !== "All fuel") {
      result = result.filter(car => car.fuelType?.toLowerCase() === fuelFilter.toLowerCase());
    }
    if (transmissionFilter && transmissionFilter !== "All transmissions") {
      result = result.filter(car => car.transmission?.toLowerCase() === transmissionFilter.toLowerCase());
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        car => car.name?.toLowerCase().includes(q) ||
               car.model?.toLowerCase().includes(q) ||
               car.condition?.toLowerCase().includes(q) ||
               car.locationName?.toLowerCase().includes(q)
      );
    }

    switch (sortOption) {
      case "price-asc": return result.sort((a, b) => a.price - b.price);
      case "price-desc": return result.sort((a, b) => b.price - a.price);
      case "year-desc": return result.sort((a, b) => b.year - a.year);
      case "year-asc": return result.sort((a, b) => a.year - b.year);
      default: return result;
    }
  }, [cars, sortOption, location.search]);

  // Slice the array based on the current limit
  const carsToDisplay = useMemo(() => {
    return isHomePage ? filteredAndSortedCars.slice(0, 32) : filteredAndSortedCars.slice(0, limit);
  }, [filteredAndSortedCars, isHomePage, limit]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Check if there are more cars to load
  const hasMore = carsToDisplay.length < filteredAndSortedCars.length;

  
  const jsonLdCars = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": carsToDisplay.map((car, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://yourwebsite.com/cars/${car.userId}/${car.id}`,
      name: `${car.name} ${car.model}`,
      image: car.images || ["/placeholder.png"],
      description: car.features?.slice(0,3).join(", ") || "High quality car for sale",
      brand: { "@type": "Brand", name: car.name },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: car.price || 0,
        availability: "https://schema.org/InStock"
      }
    }))
  };

  return (
    <><Helmet>
      <title>Cars for Sale in Cambodia | ApexMotor</title>
      <meta name="description" content="Browse hundreds of cars for sale in Cambodia. Find your perfect car with details, price, and features." />
      <script type="application/ld+json">
        {JSON.stringify(jsonLdCars)}
      </script>
    </Helmet>

    <section className="m-1 mx-2 rounded-[2px] bg-card p-3 px-2 md:m-4 md:p-3 sm:px-10">
        <div className="mx-auto max-w-1xl">
          <div className="mb-5 flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-800">Cars for Sale</h2>
            <img src={Cambodia} alt="Cambodia Flag" className="w-10" />
          </div>
          <div ref={listRef} className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
            {carsToDisplay.length > 0 ? (
              carsToDisplay.map(car => (
                <div key={car.id} className="h-full min-h-0">
                  <CarCard car={car} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-gray-500">
                <p className="text-lg">No cars found matching your criteria.</p>
                <p className="mt-2 text-sm">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>

          {/* --- View More button for Home page --- */}
          {isHomePage && hasMore && (
            <div className="flex justify-center mt-4">
              <Link to="/cars" className="px-5 py-1 text-sm underline font-medium text-[#2384C1] hover:text-blue-500 transition-colors duration-200">
                View More
              </Link>
            </div>
          )}

          {/* --- Loading indicator for infinite scroll --- */}
          {!isHomePage && isLoadingMore && hasMore && (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}

        </div>
      </section></>
  );
}
