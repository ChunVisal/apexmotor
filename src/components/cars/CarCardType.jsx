// src/components/cars/CarCardType.jsx
import ImageCars from "../../data/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { db } from "../../firebase/firebase";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function CarCardType() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const q = collectionGroup(db, "cars");
    const unsub = onSnapshot(q, (snapshot) => {
      const tempStats = {};

      snapshot.forEach((doc) => {
        const car = doc.data();
        if (!car.type) return;

        // Normalize type (case-insensitive)
        let normalizedType = car.type.trim().toLowerCase();

        // Fix typo: SVU → SUV
        if (normalizedType === "svu") normalizedType = "suv";

        if (!tempStats[normalizedType]) {
          tempStats[normalizedType] = { count: 0, minPrice: Infinity };
        }

        tempStats[normalizedType].count += 1;

        const price = Number(car.price);
        if (!isNaN(price) && price < tempStats[normalizedType].minPrice) {
          tempStats[normalizedType].minPrice = price;
        }
      });

      setStats(tempStats);
    });

    return () => unsub();
  }, []);

  const formatPrice = (price) => {
    if (!price || price === Infinity) return "N/A";
    if (price >= 1000) return `$${(price / 1000).toFixed(1)}K`;
    return `$${price}`;
  };

  return (
    <><script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Vehicle Categories",
        "itemListElement": ImageCars.map((type, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": type.name,
          "url": `https://apexmotor.shop/cars?type=${type.name}`
        }))
      })}
    </script>
    <div className="flex overflow-x-auto hide-scrollbar gap-1 py-4 px-2 sm:gap-2 sm:px-4">
        {ImageCars.map((type, index) => type.name === "Other" ? (
          <div
            key={index}
            className="flex-shrink-0 w-[180px] h-[320px] sm:w-[220px] md:w-[240px] bg-[#2384C1] text-gray-200 p-4 sm:p-5 flex flex-col items-center justify-between"
          >
            <div>
              <h3 className="mb-4 text-sm text-center font-semibold uppercase tracking-wide text-gray-200">
                Explore All Vehicle Categories Cars
              </h3>
              <p className="text-xs text-[12.5px] text-center leading-snug text-gray-200/90">
                Discover a wide range of cars from every category – all in one
                place. Scroll, explore, and find your perfect ride.
              </p>
            </div>
            <Button
              to="/cars"
              className="mt-2 sm:mt-4 w-fit px-2 py-1 sm:px-3 bg-white text-[#2384C1] rounded-sm text-[12.5px] hover:bg-gray-100"
            >
              View More
            </Button>
          </div>
        ) : (
          <Link
            to={`/cars?type=${type.name}`}
            key={index}
            className="flex-shrink-0 relative w-[180px] h-[320px] sm:w-[220px] md:w-[250px] shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <img
              src={type.image}
              alt={type.name}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="lazy" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-200 capitalize mb-2 sm:mb-3 md:mb-4">
                {type.tittle.toLowerCase()}
              </h3>

              <div className="flex justify-between gap-4 sm:gap-6 text-gray-200 text-xs mt-1 sm:mt-2">
                {/* Available count */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-gray-200 w-4 h-4 sm:w-5 sm:h-5" />
                  <div className="flex flex-col leading-tight">
                    <p className="font-semibold">
                      {stats[type.name.toLowerCase()]?.count || 0}
                    </p>
                    <span className="text-gray-200/80">Available</span>
                  </div>
                </div>

                {/* Lowest price */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faTag}
                      className="text-gray-200/80 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="absolute inset-0 flex items-center justify-center text-[7px] sm:text-[9px] text-gray-200 font-bold">
                      $
                    </span>
                  </div>
                  <div className="flex flex-col leading-tight">
                    <p className="font-semibold">From</p>
                    <span className="text-gray-200/80">
                      {formatPrice(
                        stats[type.name.toLowerCase()]?.minPrice || null
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
        )}
      </div></>
  );
}
