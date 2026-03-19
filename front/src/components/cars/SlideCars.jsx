// src/components/cars/SlideCars.jsx
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

export default function SlideCars({ filter, setFilter, allCars }) {
  const navigate = useNavigate();

  const counts = {
    trending: allCars.length,
    featured: allCars.filter(c => (c.features?.length || 0) + (c.options?.length || 0) > 0).length,
    discounts: allCars.filter(c => Number(c.originalPrice) > Number(c.price)).length,
    specials: allCars.filter(c => c.type?.toLowerCase() === "sport" && Number(c.horsepower) > 500).length,
  };

  const buttons = [
    { label: "Trending", value: "trending", count: counts.trending },
    { label: "Featured", value: "featured", count: counts.featured },
    { label: "Discounts", value: "discounts", count: counts.discounts },
    { label: "Specials", value: "specials", count: counts.specials },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 sm:gap-3 mb-3 sm:mb-12 justify-center sm:justify-end">
      {buttons.map(({ label, value, count }) => (
        <Button
          key={value}
          onClick={() => setFilter(value)}
          className={`min-w-[65px] text-xs px-2 py-[4px] sm:py-[5px] sm:w-24 rounded-md transition-all duration-200 ${
            filter === value
              ? "btn-Bg text-white shadow-md"
              : "bg-gray-300 text-gray-700 hover:bg-gray-300 hover:shadow-sm"
          }`}
        >
          <div className="flex items-center justify-center gap-1">
            {label}
            {count > 0 && (
              <span className="hidden sm:inline text-black text-[10px] bg-white/90 px-1 rounded-full">
                {count}
              </span>
            )}
          </div>
        </Button>
      ))}

      <Button
        onClick={() => navigate("/cars")}
        className="text-xs min-w-[65px] px-1 py-[4px] sm:py-[5px] sm:w-25 rounded-md bg-green-600 text-white hover:bg-green-700 hover:shadow-md transition-all duration-200"
      >
        Inventory
      </Button>
    </div>
  );
}
