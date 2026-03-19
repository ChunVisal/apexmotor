// src/pages/Home.jsx
import { useState } from "react";
import Hero from "../../pages/Home/Hero";
import Trending from "../../pages/Home/Trending";
import Category from "../../pages/Home/Category";
import CarList from "../../pages/Home/CarList";
import BlogNews from "../../pages/Home/NewsBlogSection"

import { Helmet } from "react-helmet-async";

export default function Home() {
  
  const [filters, setFilters] = useState({
    location: "All locations",
    brand: "All brands",
    type: "All types",
    price: "No max",
    year: "All years",
    condition: "All conditions",
    delivery: "All"
  });
  
  const [sortOption, setSortOption] = useState("default");

  return (
    <>
    <Helmet>
      <title>Cars for Sale in Cambodia | ApexMotor</title>

      <meta
        name="description"
        content="Buy and sell cars easily in Cambodia. Browse hundreds of verified listings from trusted sellers with price, images, and detailed specs." />

      <meta
        name="keywords"
        content="cars, cambodia cars, car marketplace, buy cars online, used cars cambodia, apexmotor" />

      {/* Open Graph for social preview */}
      <meta property="og:title" content="ApexMotor - Cars for Sale in Cambodia" />
      <meta property="og:description" content="Browse hundreds of cars with images, price, and features. Fast, reliable, trusted marketplace." />
      <meta property="og:image" content="https://apexmotor.shop/logo.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://apexmotor.shop/" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="ApexMotor - Cars for Sale in Cambodia" />
      <meta name="twitter:description" content="Fast, modern car marketplace in Cambodia." />
      <meta name="twitter:image" content="https://apexmotor.shop/logo.png" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://apexmotor.shop/" />
    </Helmet>
    
    <main>
        <Hero />
        <Trending />
        <Category showTypes={true} filters={filters} setFilters={setFilters} sortOption={sortOption} setSortOption={setSortOption} />
        <CarList filters={filters} sortOption={sortOption} isHomePage={true} />
        <BlogNews />
      </main></>
  );
}