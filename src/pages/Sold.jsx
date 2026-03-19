// src/pages/Sold.jsx
import { useState, useEffect, useMemo } from "react"; // 1. ADDED useMemo here
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useSold } from "../context/SoldContext";
import { FiTrash2, FiChevronDown, FiFilter } from "react-icons/fi";
import { Grid } from 'lucide-react';
import { FaCarSide, FaEdit } from "react-icons/fa";
import Breadcrumb from "../components/layout/Breadcrumb";
import { formatDistanceToNow } from "date-fns";

export default function Sold() {
  const { user } = useAuth();
  const { soldCars, loading, error } = useSold();

  // Function to format the time ago for each car
  const formatTimeAgo = (date) => {
    if (!date) return "N/A";
    const d = date instanceof Date ? date : new Date(date.seconds ? date.seconds * 1000 : date);
    return formatDistanceToNow(d, { addSuffix: true });
  };
  
  // State for the confirmation modal and message box
  const [confirmingId, setConfirmingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [sortOption, setSortOption] = useState("Recently Added");

  // Function to handle showing the delete confirmation modal
  const handleShowDeleteConfirm = (carId) => {
    setConfirmingId(carId);
  };

  // Function to handle the actual delete operation
  const handleDelete = async () => {
    if (!user || !confirmingId) return;

    try {
      await deleteDoc(doc(db, "carsUser", user.uid, "cars", confirmingId));
      setConfirmingId(null);
      setMessage({ text: "Car deleted successfully.", type: "success" });
    } catch (e) {
      console.error("❌ Delete failed:", e);
      setConfirmingId(null);
      setMessage({ text: "Failed to delete car. Please try again.", type: "error" });
    }
  };

  // 2. The sorting logic is now correctly cached with useMemo
  const sortedCars = useMemo(() => {
    let cars = [...soldCars];
  
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
  }, [soldCars, sortOption]);

  if (loading) {
    return (
      <div className="p-6 mb-5 sm:px-20 px-3 min-h-screen">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="animate-pulse">
              <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-24 bg-gray-200 rounded-md mt-2"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white w-full rounded-sm shadow-sm p-3 py-2 animate-pulse">
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
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mb-5 sm:px-20 px-3 min-h-screen text-red-500">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 mb-5 sm:px-20 px-3">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <Breadcrumb />
      </div>
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center">
              <FaCarSide className="text-blue-500 mr-2" />
              Sold Vehicles
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {soldCars.length} {soldCars.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="flex gap-2 mt-3 md:mt-0">
            {/* 3. ADDED value and onChange handler to link dropdown to state */}
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
              <Grid size={16} className="text-gray-800"/>
            </button>
          </div>
        </div>

        {soldCars.length === 0 ? (
          <div className="bg-white rounded shadow p-8 text-center">
            <FaCarSide className="mx-auto text-3xl text-gray-300 mb-3" />
            <h3 className="text-base font-medium text-gray-900 mb-1">No cars sold yet.</h3>
            <p className="text-gray-500 text-sm mb-4">When you sell a car, it will appear here.</p>
            <Link
              to="/Sellcar"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
            >
              Sell a Car
            </Link>
          </div>
        ) : (
          // 4. CHANGED soldCars.map to sortedCars.map to render the sorted list
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {sortedCars.map((car) => (
              <div
                key={car.id}
                className="bg-white w-full rounded-sm shadow-sm hover:shadow-md transition-shadow relative"
              >
                <Link to={`/cars/${car.userId}/${car.id}`}>
                  <div className="relative">
                    <img
                      src={car.images?.[0] || "https://via.placeholder.com/150"}
                      alt={`${car.name} ${car.model}`}
                      className="w-full h-35 object-cover"
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      SOLD
                    </div>
                  </div>
                </Link>
                <div className="p-3 py-2 text-gray-800">
                  <div className="flex gap-2 items-center mt-1">
                    <h3 className="text-sm font-semibold truncate">
                      {car.name} {car.model}
                    </h3>
                    <p className="text-sm text-gray-500">{car.year}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-red-600">$ {car.price}</span>
                  </div>
                  {/* The fix is here: calculate time per item */}
                  <span className="text-xs font-semibold text-gray-600 mt-1">{formatTimeAgo(car.createdAt)}</span>
                </div>
                <div className="">
                  <Link 
                    to={`/edit-car/${car.userId}/${car.id}`}
                    className="absolute top-2 right-10 bg-yellow-500 hover:bg-yellow-500 text-white p-1.5 rounded">
                    <FaEdit size={14} /> 
                  </Link>
                  <button
                    onClick={() => handleShowDeleteConfirm(car.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {confirmingId && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
              <h3 className="text-lg font-bold mb-2">Delete Car?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete this car? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setConfirmingId(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}
        
        {message && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center ${
                message.type === "success" ? "border-t-4 border-green-500" : "border-t-4 border-red-500"
              }`}
            >
              <p className="text-sm text-gray-600 mb-4">{message.text}</p>
              <button
                onClick={() => setMessage(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}