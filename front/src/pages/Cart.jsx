// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import Breadcrumb from "../components/layout/Breadcrumb";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();
  // New state to manage when the data has fully loaded
  const [hasLoaded, setHasLoaded] = useState(false);

  // Set hasLoaded to true once cartItems has been populated from the context
  useEffect(() => {
    // This check ensures we only set hasLoaded once the data is available.
    // In a real app with an async data fetch in the CartContext, this handles the loading state.
    if (cartItems.length > 0) {
      setHasLoaded(true);
    }
  }, [cartItems]);

  const total = cartItems.reduce((sum, car) => sum + Number(car.price), 0);
  const formattedTotal = new Intl.NumberFormat('en-US').format(total);

  // Show a loading skeleton while the data is being fetched for the first time
  // This will be displayed until the `hasLoaded` state is true
    if (!hasLoaded && cartItems.length === 0) {
    return (
      <div className="p-6 mb-5 sm:px-20 px-3 min-h-screen max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white w-full rounded-sm shadow-sm p-3 py-2 flex flex-col sm:flex-row gap-3 animate-pulse">
              {/* Image Placeholder */}
              <div className="w-full sm:w-28 h-20 sm:h-24 bg-gray-200 rounded-md"></div>
              
              {/* Content Placeholder */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>

              {/* Price & Remove Button Placeholder */}
              <div className="flex flex-row sm:flex-col justify-between xs:justify-end items-end gap-1.5">
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If the cart is confirmed as empty after loading, show this message
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
        
        <FiShoppingCart className="text-4xl text-gray-300 mb-4" />
        <h2 className="text-lg font-medium text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-xs mb-6">Barowse our selection and add vehicles to get started</p>
        <Link
          to="/"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium"
        >
          <FiArrowLeft className="text-sm" />
          Back to listings
        </Link>
      </div>
    );
  }

  // Otherwise, display the cart contents
  return (
    <div className="max-w-4xl mx-auto px-14 sm:px-5 py-4">
      <Breadcrumb />
      <div className="mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
          <FiShoppingCart className="text-gray-700 text-base sm:text-lg" />
          Shopping Cart ({cartItems.length})
        </h1>
        <Link
          to="/Inventory"
          className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <FiArrowLeft className="text-xs sm:text-sm" />
          Continue shopping
        </Link>
      </div>

      <div className="bg-white shadow-sm divide-y divide-gray-200">
        {cartItems.map((car) => (
          <div key={car.id} className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3">
            <div className="w-43 xs:w-24 sm:w-28 flex-shrink-0">
              <img
                src={car.images && car.images[0]}
                alt={car.name || "N/A"}
                className="w-full h-20 sm:h-24 object-cover rounded-md border border-gray-200"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base flex items-center gap-1.5 font-medium text-gray-900 truncate">
                {car.name || "N/A"}
                <span className="text-xs sm:text-sm text-gray-500 font-semibold">
                  {car.model || "N/A"}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{car.year || "N/A"}</p>

              <div className="mt-1.5 flex items-center gap-1 text-[10px] sm:text-xs text-green-600">
                <BsCheckCircleFill className="flex-shrink-0" />
                <span>Available now</span>
              </div>
            </div>

            <div className="flex flex-row sm:flex-col justify-between xs:justify-end items-end gap-1.5">
              <p className="text-sm sm:text-base font-semibold text-gray-900">${car.price || "0"}</p>
              <button
                onClick={() => removeFromCart(car)}
                className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1"
              >
                <FiTrash2 className="text-xs" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className=" bg-white border-t border-gray-200 shadow-sm p-4 mt-6 -mx-4 sm:mx-0">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2">Order Summary</h3>

          <div className="space-y-1.5 mb-2 max-h-[120px] overflow-y-auto pr-1">
            {cartItems.map((car) => (
              <div key={car.id} className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600 truncate max-w-[120px] sm:max-w-[180px]">
                  {car.name || "N/A"}
                </span>
                <span className="text-gray-900 font-medium">${car.price || "0"}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">
                {cartItems.length} {cartItems.length === 1 ? 'vehicle' : 'vehicles'}
              </p>
            </div>
            <p className="text-base sm:text-lg font-semibold text-green-600">${formattedTotal}</p>
          </div>

          <div className="mt-3">
            <Link
              to="/checkout"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md text-xs sm:text-sm font-medium transition"
            >
              Proceed to Checkout
            </Link>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-500 mt-1.5 text-center">
            All prices are final. Taxes calculated at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
