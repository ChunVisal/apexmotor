// src/pages/Home/hero.jsx
import Button from "../../components/common/Button";
import image from "../../assets/images/image.png";
import { faSearch, faCogs, faCar } from "@fortawesome/free-solid-svg-icons";
import CarFeaturesShowcase from "../../components/common/CarFeaturesShowcase";
import CarSearchFilter from "../../components/common/CarSearchFilter";
import { db } from "../../firebase/firebase";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Hero() {
  const [TotalCars, setTotalCars] = useState(0);

  useEffect(() => {
    const q = collectionGroup(db, "cars");

    const unsub = onSnapshot(q, (snapshot) => {
      setTotalCars(snapshot.size);
    });

    return () => unsub();
  }, []);

  return (
    <section
      className="flex flex-col items-center text-center p-4 md:pr-10 md:pt-6 md:pb-8 md:pl-8 md:text-left md:items-start md:flex-row md:justify-between"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "70% 60%",
      }}
      loading="lazy"
    >
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <span
          icon={faCar}
          className="text-xs bg-green-600 rounded-sm transition-all duration-150 ease-in-out mb-3 px-[8px] md:px-2 py-0.5"
        >
          {TotalCars}+ New Arrivals
        </span>

        <h1 className=" tracking-wider text-xl sm:text-1xl md:text-2xl font-extrabold text-white leading-tight">
          Drive Your{" "}
          <span className="text-green-500 font-bold space-x-0">Dream</span>{" "}
          without The Dealership Hassle
        </h1>

        <p className="text-xs md:text-sm text-gray-300 mb-2 md:mb-3 max-w-md">
          Buy cars online with upfront pricing, virtual tours, and home test
          drives. No pressure, no hidden fees.
        </p>

        <div className="flex flex-row sm:flex-col lg:flex-col gap-5 sm:gap-0.5 lg:gap-0.5 w-full items-center justify-center sm:items-center md:items-start lg:items-start">
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center lg:items-start">
            <Button
              to="/cars"
              icon={faSearch}
              iconClassName="fa-xs"
              className="btn-Bg hover:bg-blue-400 text-white shadow-sm hover:shadow-md 
                        px-2 py-1 text-[11px] rounded-full w-35 text-center whitespace-nowrap"
            >
              Browse Inventory
            </Button>

            <Button
              to="/how-it-works"
              icon={faCogs}
              className="border border-white text-white bg-white/10 backdrop-blur-md 
                        hover:bg-white/20 shadow-sm hover:shadow-md 
                        px-2 py-1 text-[11px] rounded-full w-35 text-center"
            >
              How It Works
            </Button>
          </div>
          <div className="w-40 sm:w-fit md:w-auto">
            <CarSearchFilter />
          </div>
        </div>

        <CarFeaturesShowcase className="mt-4 md:mt-6" />
      </div>

      <div className="hidden md:block md:w-1/2" />
    </section>
  );
}
