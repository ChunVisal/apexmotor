// context/FilterContext.jsx
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
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
  });

  const [sortOption, setSortOption] = useState(null);

  return (
    <FilterContext.Provider value={{ filters, setFilters, sortOption, setSortOption }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
