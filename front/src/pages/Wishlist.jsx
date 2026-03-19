// src/pages/Wishlist.jsx
import { useState, useMemo } from "react";
import { useWishlist } from "../context/WishlistContext";
import { FiHeart, FiFilter, FiChevronDown } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Grid } from "lucide-react";
import Breadcrumb from "../components/layout/Breadcrumb";
import { formatDistanceToNow } from "date-fns";

// Skeleton Loader component for the loading state
function SkeletonLoader() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white w-full rounded-sm shadow-sm p-3 py-2 animate-pulse"
        >
          <div className="relative">
            <div className="w-full h-32 bg-gray-200 rounded-md"></div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, loading } = useWishlist();
  const [sortOption, setSortOption] = useState("Recently Added");

  // Function to format the time ago for each car
  const formatTimeAgo = (date) => {
    if (!date) return "N/A";
    const d = date instanceof Date ? date : new Date(date.seconds ? date.seconds * 1000 : date);
    return formatDistanceToNow(d, { addSuffix: true });
  };
  

  // 🧠 Apply sorting logic using useMemo for performance
  const sortedCars = useMemo(() => {
    let cars = [...wishlistItems];

    switch (sortOption) {
      case "Price: Low to High":
        return cars.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return cars.sort((a, b) => b.price - a.price);
      case "Sort: A-Z":
        return cars.sort((a, b) =>
          `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)
        );
      case "Recently Added":
      default:
        // Assumes `createdAt` exists in car doc
        return cars.sort(
          (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        );
    }
  }, [wishlistItems, sortOption]);

  return (
    <div className="bg-gray-50 min-h-screen py-6 mb-5 sm:px-20 px-3">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <Breadcrumb />
      </div>
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center">
              <FiHeart className="text-red-500 mr-2" />
              Saved Vehicles
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="flex gap-2 mt-3 md:mt-0">
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none text-gray-800 bg-white border border-gray-300 rounded pl-2 pr-6 py-1.5 text-xs focus:outline-none"
              >
                <option>Recently Added</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Sort: A-Z</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 text-xs" />
            </div>
            <button className="flex items-center gap-1 text-gray-800 bg-white border border-gray-300 rounded px-2 py-1.5 text-xs hover:bg-gray-50">
              <FiFilter className="text-gray-800 text-xs" />
              Filters
          </button>
            <button className="flex items-center gap-1 text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 text-xs hover:bg-gray-50">
              <Grid size={16} className="text-gray-800" />
            </button>
          </div>
        </div>

        {loading ? (
          <SkeletonLoader />
        ) : wishlistItems.length === 0 ? (
          <div className="bg-white rounded shadow p-8 text-center">
            <FiHeart className="mx-auto text-3xl text-gray-300 mb-3" />
            <h3 className="text-base font-medium text-gray-900 mb-1">
              No saved vehicles
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Save vehicles by clicking the heart icon
            </p>
            <Link
              to="/cars"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
            >
              Browse Vehicles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {sortedCars.map((car) => (
              <div
                key={car.id}
                className="bg-white w-full rounded-sm shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <Link to={`/cars/${car.userId}/${car.id}`}>
                    <img
                      src={car.images && car.images[0]}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-32 object-cover"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(car.id)}
                    className="absolute top-2 right-2 p-1.5 opacity-90 bg-white/90 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <AiFillHeart className="text-red-500 text-sm hover:text-red-600" />
                  </button>
                </div>
                <div className="p-3 py-2 text-gray-800">
                  <div className="flex gap-2 items-center mt-1">
                    <h3 className="text-sm font-semibold truncate">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-sm text-gray-500">{car.year}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-red-600">
                      $ {car.price}
                    </span>
                    <span className="text-[11px] text-green-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {formatTimeAgo(car.createdAt)}
                    </span>
                  </div>
                </div>
              </div>  
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
