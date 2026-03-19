import CarFilter from "../../components/cars/CarFilter";
import CarBrand from "../../components/cars/CarBrand";
import TypesCar from "../../components/cars/CarCardType";

export default function Category({ filters, setFilters, sortOption, setSortOption, showTypes = true }) {
  return (
    <>
      <section className="bg-gray-100 text-black py-6 mx-4 px-3 sm:px-6 md:px-8">
        <div>
          <CarFilter 
            filters={filters}
            setFilters={setFilters}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>
        <div>
          <CarBrand />
        </div>
      </section>
      <div>
        {showTypes && <TypesCar />}
      </div>
    </>
  );
}
