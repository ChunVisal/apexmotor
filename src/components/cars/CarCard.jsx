// src/components/cars/CarCard.jsx
import { FaHeart, FaImage } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import CardMenu from "../common/CardMenu";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Helmet } from "react-helmet-async";


const formatTimeAgo = (date) => {
  if (!date) return "N/A";
  const d = date instanceof Date ? date : new Date(date.seconds ? date.seconds * 1000 : date);
  return formatDistanceToNow(d, { addSuffix: true });
};

export function getOptimizedImage(url, width = 600, height = 400) {
  if (!url?.includes("cloudinary.com")) return url || "/placeholder.png";
  // Append Cloudinary automatic optimization
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},h_${height},c_fill/`);
}


export default function CarCard({ car }) {
  const { user } = useAuth();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const [timeAgo, setTimeAgo] = useState(formatTimeAgo(car.createdAt));

  const isInWishlist = wishlistItems.some(
    (item) => item.id === car.id && item.userId === car.userId
  );  

  const handleToggleWishlist = () => {
    if (!user) {
      alert("❌ You must be logged in to save this car.");
      return;
    }
    toggleWishlist(car);
    alert(isInWishlist ? "❌ Removed from wishlist." : "✅ Added to wishlist.");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeAgo(formatTimeAgo(car.createdAt));
    }, 60000);
    return () => clearInterval(timer);
  }, [car.createdAt]);

  const imageCount = car.images?.length || 0;

 const saveNow = () => {
    const scroller = document.getElementById("app-scroll");
    if (scroller) {
      sessionStorage.setItem("carlist-scroll", scroller.scrollTop.toString());
    } else {
      // fallback to pageYOffset
      sessionStorage.setItem("carlist-scroll", window.pageYOffset.toString());
    }
  };


  return (
    <>
     <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${car.name} ${car.model}`,
            image: car.images,
            description: car.features?.join(", ") || "High quality car for sale",
            brand: { "@type": "Brand", name: car.name },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: car.price || 0,
              availability: "https://schema.org/InStock",
              url: `https://apexmotor.shop/cars/${car.userId}/${car.id}`,
            },
          })}
        </script>
      </Helmet>
    <div className="h-full bg-white rounded-none rounded-t-[3px] border border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative flex-shrink-0">
        <Link to={`/cars/${car.userId}/${car.id}`} onClick={saveNow}>
          <div className="w-full sm:h-48 h-40 overflow-hidden bg-gray-100">
            <img
              width={600} 
              height={400} 
              loading="lazy"
              src={getOptimizedImage(car.images?.[0], 600, 400)}
              alt={`${car.name || "Car"} ${car.model || ""} - ${car.features?.slice(0,3).join(", ") || "Car for sale"}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Link>

      {car.delivery && (
          <div className="whitespace-nowrap absolute top-2 left-2 bg-black/70 text-white text-base text-[9px] sm:text-[10px] px-1.5 py-[2px] sm:px-2 sm:py-[3px] rounded-md">
            <span>Free Delivery</span>
          </div>
        )}

        <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
          <button
            onClick={() => handleToggleWishlist(car.id, car.userId)}
            className="cursor-pointer bg-white p-2 sm:p-[8px] rounded-full shadow hover:bg-gray-100"
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FaHeart
              className={`text-[10px] sm:text-xs transition-colors duration-200 ${isInWishlist ? "text-red-500" : "text-gray-600"}`}
            />
          </button>
          <CardMenu car={car} />
        </div>

        <div className="absolute flex items-center gap-[2px] sm:gap-1 bottom-2 right-2 bg-black/60 text-white text-[9px] sm:text-[10px] px-1.5 py-[2px] sm:px-2 sm:py-[3px] rounded-md">
          <FaImage className="text-[10px] sm:text-[12px]" />
          <span>
            {imageCount} {imageCount === 1 ? "image" : "images"}
          </span>
        </div>
      </div>

      {/* Content area should grow to fill remaining vertical space */}
      <div className="p-3 pt-3 flex flex-col flex-grow min-h-0">
        <div className="flex-grow flex flex-col min-h-0">
          <h2 className="text-sm text-gray-900 ">
            {car.name || "Unnamed"} {car.model || ""}
          </h2>

          <p className="text-xs text-red-600 truncate">
            {car.price ? `$${car.price.toLocaleString()}` : "Price not listed"}
          </p>

          <div className="flex flex-wrap gap-2 font-semibold text-[11px] text-gray-900 my-2 mb-1 items-center whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="bg-gray-200 px-2 py-[1px] rounded-md">{car.year}</span>
            <span className="bg-gray-200 px-2 py-[1px] rounded-md">{car.plate ? "With Plate" : "No Plate"}</span>
            <span className="bg-gray-200 px-2 py-[1px] rounded-md">{car.condition}</span>
            <span className="bg-gray-200 px-2 py-[1px] rounded-md text-wrap">
              {car.locationName ? car.locationName.split(", ").slice(0, 2).join(", ") : "No Location"}
            </span>
          </div>

          <span className="text-xs text-green-600">{timeAgo}</span>

          <p className="mt-1 text-[13px] text-gray-900">Key Features:</p>
          <ul className="text-sm text-gray-700 overflow-hidden">
            {car.features?.length ? (
              car.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <BsCheckCircleFill className="w-[9px] h-auto text-blue-600 flex-shrink-0" />
                  <span className="whitespace-nowrap text-xs overflow-hidden text-ellipsis">{f}</span>
                </li>
              ))
            ) : (
              <li className="text-xs">No features listed</li>
            )}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
