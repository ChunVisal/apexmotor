import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SimpleDropdown from "./SimpleDropdown";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { carBrands, carModels } from "../../data/carData";

const CarSearchFilter = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    price: "",
  });

  const handleChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Get models for selected brand
  const modelOptions = ["Any model", ...(filters.brand ? carModels[filters.brand] || [] : [])];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.brand && filters.brand !== "Any make") params.set("brand", filters.brand);
    if (filters.model && filters.model !== "Any model") params.set("model", filters.model);
    if (filters.price && filters.price !== "No max") params.set("price", filters.price);

    navigate(`/cars?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 mt-3 md:mt-4 p-2 sm:p-2 sm:pr-1 rounded-md sm:rounded-full 
         backdrop-blur-md bg-white/10 shadow-lg border border-white/20 sm:w-full w-35 max-w-110 sm:h-[2.2rem] h-auto md:h-[2.2rem]" >
      
     <SimpleDropdown
        placeholder="Any make"
        options={[{ name: "Any make" }, ...carBrands]} 
        value={filters.brand ? { name: filters.brand } : null} 
        onChange={opt => handleChange("brand", opt.name || opt)}
      />

      <SimpleDropdown
        placeholder="Any model"
        options={modelOptions}
        value={filters.model}
        onChange={value => handleChange("model", value)}
      />

      <SimpleDropdown
        placeholder="No max"
        options={["No max", "$10,000", "$20,000", "$50,000", "$100,000"]}
        value={filters.price}
        onChange={value => handleChange("price", value)}
      />

      <Button
        icon={faSearch}
        noBasePadding
        className="btn-Bg text-white font-normal px-2 rounded-md sm:rounded-full sm:px-3 sm:py-1 hover:bg-blue-400 text-xs lg:h-7 h-6"
        onClick={handleSearch}
      >
        Browse
      </Button>
    </div>
  );
};

export default CarSearchFilter;
