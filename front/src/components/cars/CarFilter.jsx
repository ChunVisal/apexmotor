// src/components/cars/CarFilter.jsx
import { useFilters } from "../../context/FilterContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/common/Button";
// ✅ FIX: Imported new icons
import DeliveryBlue from "../../assets/icon/DeliveryBlue.png";
import DeliveryBlack from "../../assets/icon/DeliveryBlack.png";
import FilterDropdown from "../../components/common/FilterDropdown";
import SortFeature from '../../components/common/SortFeature';
import { carBrands, carModels, carBodyTypes, carConditions } from "../../data/carData";

export default function CarFilter(cars) {
  const { filters, setFilters, setSortOption } = useFilters();
  const [, setShowDeliveryOnly] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // New function to update URL with all current filters
  const updateUrlWithFilters = (newFilters) => {
    const params = new URLSearchParams();

    // Add new filter params
    for (const key in newFilters) {
      if (
        newFilters[key] &&
        newFilters[key] !== "All" &&
        !newFilters[key].includes("All") &&
        newFilters[key] !== "No max"
      ) {
        // ✅ FIX: The delivery filter is now a string "true" or null
        params.set(key, newFilters[key]);
      }
    }

    // Preserve search query if it exists
    const searchQuery = new URLSearchParams(location.search).get("search");
    if (searchQuery) {
      params.set("search", searchQuery);
    }

    // 🚀 Always redirect to /cars with filters applied
    navigate(`/cars?${params.toString()}`);
  };

  const handleDropdownChange = (name, value) => {
    // 1. Update the local state
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    
    // 2. Update the URL
    updateUrlWithFilters(updatedFilters);
  };

  const toggleDeliveryFilter = () => {
    // ✅ FIX: Check if the current filter is "true" and toggle to "true" or null
    const isCurrentlyFiltered = filters.delivery === "true";
    const updatedFilters = {
      ...filters,
      delivery: isCurrentlyFiltered ? null : "true",
    };
    setFilters(updatedFilters);
    updateUrlWithFilters(updatedFilters);
  };
  
  const resetAllFilters = () => {
    const newFilters = {
      location: "All locations",
      brand: "All brands",
      model: "All Models",
      type: "All types",
      price: "No max",
      year: "All years",
      condition: "All conditions",
      delivery: null,
      color: "All colors",
      fuel: "All fuel",
      transmission: "All transmissions",
    };
    setFilters(newFilters);
    setShowDeliveryOnly(false);
    
    // Navigate to the current path, but clear all search parameters
    navigate(location.pathname);
  };

  // Keep the rest of your component as is
  const locations = ["All locations", "Phnom Penh", "Siem Reap", "Sihanoukville"];
  const models = filters.brand && carModels[filters.brand] ? ["All Models", ...carModels[filters.brand]] : ["All Models"];
  const types = ["All Types", ...carBodyTypes]; 
  const prices = ["No max", "$10,000", "$20,000", "$50,000", "$100,000", "$200,000"];
  const years = ["All years", "2025", "2024", "2023", "2022"];
  const conditions = ["All Conditions", ...carConditions];
  const colors = ["All colors", "Red", "Black", "White", "Blue", "Silver"];
  const fuels = ["All fuel", "Gasoline", "Diesel", "Electric", "Hybrid"];
  const transmissions = ["All transmissions", "Automatic", "Manual"];

  return (
    <>
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
           <SortFeature
              cars={cars} // ✅ make sure you pass the cars list
              onSortChange={({ key, order }) => {
                // This directly sets sortOption
                setSortOption(`${key}-${order}`);
              }}
              resetSort={() => setSortOption(null)}
            />
          {/* Your FilterDropdown components */}
          <FilterDropdown
            placeholder="Location"
            options={locations}
            value={filters.location}
            onChange={value => handleDropdownChange("location", value)}
          />
          <FilterDropdown
              placeholder="All Brand"
              options={[{ name: "All Brand", logo: null }, ...carBrands]} 
              value={carBrands.find(b => b.name === filters.brand)}
              onChange={option => handleDropdownChange("brand", option.name)}
            />
          <FilterDropdown
            placeholder="All Model"
            options={models}
            value={filters.model}
            onChange={value => handleDropdownChange("model", value)}
          />
          <FilterDropdown
            placeholder="All Types"
            options={types}
            value={filters.type}
            onChange={value => handleDropdownChange("type", value)}
          />
          <FilterDropdown
            placeholder="No Max"
            options={prices}
            value={filters.price}
            onChange={value => handleDropdownChange("price", value)}
          />
          <FilterDropdown
            placeholder="All Years"
            options={years}
            value={filters.year}
            onChange={value => handleDropdownChange("year", value)}
          />
          <FilterDropdown
            placeholder="Condition"
            options={conditions}
            value={filters.condition}
            onChange={value => handleDropdownChange("condition", value)}
          />
        </div>
        <button
          onClick={toggleDeliveryFilter}
          className={`cursor-pointer p-1 rounded transition-colors ${
            // ✅ FIX: Check if the filter is the string "true"
            filters.delivery === "true"
          }`}
          aria-label="Delivery filter"
          title="Show only cars with delivery option"
        >
          {/* ✅ FIX: Use a ternary operator to switch between icons */}
          <img 
            src={filters.delivery === "true" ? DeliveryBlue : DeliveryBlack} 
            alt="Delivery" 
            className="sm:w-7 w-8 h-5" 
            width={600} 
            height={400} 
            loading="lazy"
          />
        </button>
      </section>
      <aside className="flex flex-row sm:flex-row items-center justify-between gap-2">
        <button
          onClick={resetAllFilters}
          className="text-blue-600 hover:underline text-[12.5px]"
        >
          Reset Filter
        </button>
        <Button
          className="btn-Bg text-gray-100 px-2 py-0.5 font-normal text-[12.5px] rounded-xs"
          onClick={() => setShowMoreFilters(prev => !prev)}
        >
          {showMoreFilters ? "Hide Filters" : "More Filter"}
        </Button>
      </aside>
      {showMoreFilters && (
        <div className="flex gap-2">
          <FilterDropdown
            placeholder="Color"
            options={colors}
            value={filters.color}
            onChange={v => handleDropdownChange("color", v)}
          />
          <FilterDropdown
            placeholder="Fuel"
            options={fuels}
            value={filters.fuel}
            onChange={v => handleDropdownChange("fuel", v)}
          />
          <FilterDropdown
            placeholder="Transmission"
            options={transmissions}
            value={filters.transmission}
            onChange={v => handleDropdownChange("transmission", v)}
          />
        </div>
      )}
    </>
  );
}