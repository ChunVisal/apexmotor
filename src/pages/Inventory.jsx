// src/pages/Inventory.jsx
import { useFilters } from "../context/FilterContext";
import { useLocation } from "react-router-dom";
import Category from "../pages/Home/Category";
import CarList from "../pages/Home/CarList";
import Breadcrumb from "../components/layout/Breadcrumb";
import { useEffect, useState, useRef } from "react";
// import SmartScroll from '../utils/SmartScroll';

import { Helmet } from "react-helmet-async";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Inventory() {
  const { filters, setFilters, sortOption, setSortOption } = useFilters();
  const location = useLocation();
  const queryParam = useQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const [ setIsReady] = useState(false);
  const scrollContainerRef = useRef();

  // Update searchQuery only when page loads or URL changes
   useEffect(() => {
    setSearchQuery(queryParam.get("search") || "");
  }, [location.search]);


  const params = new URLSearchParams(location.search);
  const brandFromQuery = params.get("brand");

  const appliedFilters = {
    ...filters,
    brand: brandFromQuery || filters.brand,
    search: searchQuery, // now search only updates on submit
  };

  return (
    <><Helmet>
      <title>All Cars for Sale | ApexMotor Inventory</title>

      <meta
        name="description"
        content="Browse all cars available on ApexMotor. Filter by brand, type, price, year, and condition to find the perfect ride." />

      <meta
        name="keywords"
        content="cars inventory, cambodia cars, car marketplace, apexmotor cars, buy cars online" />

      <meta property="og:title" content="ApexMotor Inventory" />
      <meta property="og:description" content="Explore all cars for sale in Cambodia. Accurate listings with images, price & details." />
      <meta property="og:image" content="https://apexmotor.shop/logo.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://apexmotor.shop/cars" />

      <link rel="canonical" href="https://apexmotor.shop/cars" />
    </Helmet>
    
    <div className="mt-10" ref={scrollContainerRef}>
        <div className="mx-7 sm:mx-12">
          <Breadcrumb />
        </div>
        <Category
          showTypes={false}
          filters={appliedFilters}
          setFilters={setFilters}
          sortOption={sortOption}
          setSortOption={setSortOption} />
        <CarList filters={appliedFilters} onDataLoaded={() => setIsReady(true)} sortOption={sortOption} isHomePage={false} />
      </div></>
  );
}