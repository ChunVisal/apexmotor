// src/component/cars/CarBrand.jsx
import { useRef } from "react";
import brand from "../../data/brand";
import { Link } from "react-router-dom";

export default function CarBrand() {
  const scrollRef = useRef(null);

  return (
    <div className="relative mt-3 border-t-2 border-gray-200">
      <div
        ref={scrollRef}
        className="
         flex gap-6 md:gap-8 lg:gap-8
         overflow-x-auto hide-scrollbar pt-4 scroll-smooth"
      >
        {brand.map((brand, index) => {
          // If brand is "Other - More" → go to /cars only
          const toLink =
            brand.name === "Other - More"
              ? "/cars"
              : `/cars?brand=${brand.name}`;

          return (
            <Link
              to={toLink}
              key={index}
              className="flex flex-col items-center w-20 hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 bg-white dark:bg-gray-200 rounded-full shadow border border-gray-200 dark:border-gray-300 flex items-center justify-center p-1 mb-2">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-xs text-gray-700">{brand.name}</span>
                )}
              </div>
              <p className="text-xs whitespace-nowrap font-medium text-gray-700 text-center">
                {brand.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
