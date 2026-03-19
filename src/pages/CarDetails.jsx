// src/components/pages/CarDetails.jsx
import { useParams, Link } from "react-router-dom";
import {
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Banknote,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  collectionGroup,
  getDocs,
  query,
} from "firebase/firestore";
import { useState, useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Breadcrumb from "../components/layout/Breadcrumb";
import { useAuth } from "../context/AuthContext";
import Smart from "../assets/moblieProvider/smart.png";
import Cellcard from "../assets/moblieProvider/cellcard.png";
import Metfone from "../assets/moblieProvider/metfone.png";
import { ShareCarDetailButton } from "../components/common/ShareProfile";
import CarCard from "../components/cars/CarCard";
import { useCart } from "../context/CartContext";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Helmet } from "react-helmet-async";
import CarRating from "../components/common/CarRating";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// --- Car List for Similar Cars (local to this file) ---
function SimilarCarsList({ currentCar }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);

  // Simple deterministic shuffle
  const simpleSeededShuffle = (array, seed) => {
    const newArray = [...array];
    let currentSeed = seed;

    for (let i = newArray.length - 1; i > 0; i--) {
      currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
      const j = Math.floor((currentSeed / 4294967296) * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Simple hash for seed
  const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  useEffect(() => {
    let isCancelled = false;
    const fetchSimilarCars = async () => {
      setLoading(true);
      try {
        const carsCollection = collectionGroup(db, "cars");
        const q = query(carsCollection);
        const snapshot = await getDocs(q);
        if (isCancelled) return;

        const fetched = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setCars(fetched);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSimilarCars();
    return () => {
      isCancelled = true;
    };
  }, []);

  const filteredAndSortedCars = useMemo(() => {
    if (!currentCar || !cars.length) return [];

    // Filter out the current car
    let result = cars.filter((car) => car.id !== currentCar.id);

    // Find cars with similar brand, model, or ~20% price range
    const similar = result.filter(
      (car) =>
        (currentCar.name &&
          car.name?.toLowerCase() === currentCar.name.toLowerCase()) ||
        (currentCar.model &&
          car.model?.toLowerCase() === currentCar.model.toLowerCase()) ||
        (currentCar.price &&
          car.price >= currentCar.price * 0.8 &&
          car.price <= currentCar.price * 1.2)
    );

    const seed = simpleHash(currentCar.id);
    const shuffledSimilar = simpleSeededShuffle(similar, seed);

    // If not enough similar cars, fill with others
    const limit = 8;
    if (shuffledSimilar.length < limit) {
      const otherCars = result.filter(
        (car) => !similar.some((s) => s.id === car.id)
      );
      const shuffledOthers = simpleSeededShuffle(otherCars, seed + 1);
      return [...shuffledSimilar, ...shuffledOthers].slice(0, limit);
    }

    return shuffledSimilar.slice(0, limit);
  }, [cars, currentCar]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (filteredAndSortedCars.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="text-1xl font-bold text-gray-800 mb-4">
        You Might Also Like
      </h2>
      <div
        ref={listRef}
        className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr"
      >
        {filteredAndSortedCars.map((car) => (
          <div key={car.id} className="h-full min-h-0">
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </section>
  );
}

function getOptimizedImage(url, width = 600, height = 400) {
  if (!url?.includes("cloudinary.com")) return url || "/placeholder.png";
  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width},h_${height},c_fill/`
  );
}

// --- Main CarDetails Component ---
export default function CarDetails() {
  const { userId, carId } = useParams();
  useAuth();
  const [car, setCar] = useState(null);
  const [uploader, setUploader] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const mainContainerRef = useRef(null);
  const { addToCart, removeFromCart, isInCart } = useCart();
  const saved = car ? isInCart(car.id) : false;
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const toggleSave = () => {
    if (!car?.id) return;
    if (saved) {
      removeFromCart(car.id);
    } else {
      addToCart(car);
    }
  };

  useEffect(() => {
    if (!userId || !carId) return;
    const fetchCarAndUploader = async () => {
      setLoading(true);
      try {
        const carRef = doc(db, "carsUser", userId, "cars", carId);
        const carSnap = await getDoc(carRef);
        if (!carSnap.exists()) {
          setCar(null);
          return;
        }
        const carData = { id: carSnap.id, ...carSnap.data() };
        setCar(carData);
        setActiveImage(carData.images?.[0] || null);
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUploader(userSnap.data());
        }
      } catch (err) {
        console.error("Error fetching car or uploader:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarAndUploader();
  }, [userId, carId]);

  // In CarDetails.jsx, replace the scroll restoration useEffect with:
  useEffect(() => {
    const mainContainer = mainContainerRef.current;
    if (!mainContainer) return;

    // Try BOTH storage keys - the unique one and the generic one
    const uniqueKey = `car-details-scroll-${userId}-${carId}`;
    const genericKey = "car-details-scroll";

    const savedScroll =
      sessionStorage.getItem(uniqueKey) || sessionStorage.getItem(genericKey);

    if (savedScroll) {
      const y = parseInt(savedScroll, 10);
      setTimeout(() => {
        mainContainer.scrollTo({ top: y, left: 0, behavior: "auto" });
        // Clean up BOTH keys
        sessionStorage.removeItem(uniqueKey);
        sessionStorage.removeItem(genericKey);
      }, 100);
    }
  }, [userId, carId]);

  // Save scroll position when leaving the page
  useEffect(() => {
    const mainContainer = mainContainerRef.current;
    if (!mainContainer) return;

    // In the scroll event listener, make sure it uses the unique key:
    const handleScroll = () => {
      sessionStorage.setItem(
        `car-details-scroll-${userId}-${carId}`,
        mainContainer.scrollTop.toString()
      );
    };
    mainContainer.addEventListener("scroll", handleScroll);

    return () => {
      mainContainer.removeEventListener("scroll", handleScroll);
    };
  }, [userId, carId]);

  // Restore scroll position when component mounts
  useEffect(() => {
    const mainContainer = mainContainerRef.current;
    if (!mainContainer) return;

    const savedScroll = sessionStorage.getItem(
      `car-details-scroll-${userId}-${carId}`
    );
    if (savedScroll) {
      const y = parseInt(savedScroll, 10);
      setTimeout(() => {
        mainContainer.scrollTo({ top: y, left: 0, behavior: "auto" });
        sessionStorage.removeItem(`car-details-scroll-${userId}-${carId}`);
      }, 100);
    }
  }, [userId, carId]);

  const getProviderImage = (provider) => {
    switch (provider) {
      case "smart":
        return Smart;
      case "cellcard":
        return Cellcard;
      case "metfone":
        return Metfone;
      default:
        return null;
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading car details...</p>;

  const {
    name,
    model,
    year,
    type,
    price,
    originalPrice,
    mileage,
    transmission,
    drivetrain,
    exteriorColor,
    interiorColor,
    vin,
    engine,
    horsepower,
    torque,
    plate,
    description,
    features,
    images,
    location,
    delivery,
  } = car;

  const technicalSpecs = {
    Mileage: mileage ? `${mileage} KM` : "No Specific",
    Transmission: transmission || "No Specific",
    Drivetrain: drivetrain || "No Specific",
    "Exterior Color": exteriorColor || "No Specific",
    "Interior Color": interiorColor || "No Specific",
    VIN: vin || "No Specific",
    Engine: engine || "No Specific",
    Horsepower: horsepower ? `${horsepower} HP` : "No Specific",
    Torque: torque ? `${torque} lb-ft` : "No Specific",
    Plate: plate ? "Yes" : "No",
  };

  const overview = {
    Mileage: mileage ? `${mileage} KM` : "No Specific",
    Transmission: transmission || "No Specific",
    Drivetrain: drivetrain || "No Specific",
    "Exterior Color": exteriorColor || "No Specific",
    Delivery: delivery === true ? "Free delivery" : "No delivery",
    Horsepower: horsepower ? `${horsepower} HP` : "No Specific",
    Torque: torque ? `${torque} lb-ft` : "No Specific",
  };

  if (!car) {
    return <NotFound message="❌ Car not found or invalid ID" />;
  }

  if (loading)
    return <p className="text-center mt-10">Loading car details...</p>;

  const absolute = (path) => {
    if (!path) return "";
    // If already absolute, return it
    if (path.startsWith("http")) return path;
    return `https://apexmotor.shop${path.startsWith("/") ? "" : "/"}${path}`;
  };

  return (
    <>
      <Helmet>
        <title>{`${name} ${model} - ApexMotor`}</title>
        <meta
          name="description"
          content={`Buy ${name} ${model} with ${features
            ?.slice(0, 5)
            .join(", ")}. Price: $${price?.toLocaleString()}.`}
        />
        <meta
          name="keywords"
          content={`car, ${name}, ${model}, buy car, sell car, ApexMotor`}
        />

        {/* Open Graph / Social */}
        <meta property="og:title" content={`${name} ${model} - ApexMotor`} />
        <meta
          property="og:description"
          content={`Buy ${name} ${model} with ${features
            ?.slice(0, 5)
            .join(", ")}. Price: $${price?.toLocaleString()}.`}
        />
        <meta
          property="og:image"
          content={absolute(images?.[0] || "/logo.png")}
        />
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={absolute(`/cars/${userId}/${carId}`)}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${name} ${model} - ApexMotor`} />
        <meta
          name="twitter:description"
          content={features?.slice(0, 5).join(", ")}
        />
        <meta
          name="twitter:image"
          content={absolute(images?.[0] || "/logo.png")}
        />

        {/* JSON-LD Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": absolute(`/cars/${userId}/${carId}#product`),
            name: `${name} ${model}`,
            sku: carId,
            mpn: `${userId}-${carId}`,
            image: (images || []).map((img) => absolute(img)),
            description:
              features?.join(", ") ||
              description ||
              `Used ${name} ${model} for sale`,
            brand: { "@type": "Brand", name: name },
            offers: {
              "@type": "Offer",
              url: absolute(`/cars/${userId}/${carId}`),
              priceCurrency: "USD",
              price: price || 0,
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/UsedCondition",
            },
            additionalProperty: [
              { name: "Year", value: car?.year || "" },
              { name: "Location", value: car?.locationName || "" },
              { name: "Condition", value: car?.condition || "" },
            ].filter((p) => p.value),
          })}
        </script>
      </Helmet>
      <div
        ref={mainContainerRef}
        data-car-details-container // ← ADD THIS
        className="min-h-screen bg-white font-sans p-4 md:p-5 md:px-17"
      >
        <Breadcrumb carName={`${car?.name || "Car"} ${car?.model || ""}`} />
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="relative mb-4 overflow-hidden rounded-sm aspect-w-16 aspect-h-9">
              <img
                src={getOptimizedImage(activeImage || images?.[0], 1200, 675)}
                width={1200}
                height={675}
                loading="lazy"
                alt={`${car.name || "Car"} ${car.model || ""} - ${
                  car.features?.slice(0, 3).join(", ") || "Car for sale"
                }`}
                className="object-cover w-full h-60"
                onClick={() => {
                  setIsOpen(true);
                  setPhotoIndex(images.indexOf(activeImage || images[0]));
                }}
              />
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {images?.map((image, index) => (
                <img
                  key={index}
                  width={600}
                  height={400}
                  loading="lazy"
                  src={getOptimizedImage(image, 600, 400)}
                  alt={`Thumbnail ${index + 1}`}
                  className={`object-cover rounded-sm cursor-pointer transition-transform duration-200 hover:scale-105 ${
                    activeImage === image ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setActiveImage(image)}
                />
              ))}
            </div>
            <Link
              to={`/public-profile/${userId}`}
              className="flex items-center bg-[#2384C1] p-3 text-gray-200 font-base gap-4 mb-4"
            >
              <div className="w-14 h-14 rounded-full flex-shrink-0">
                <img
                  src={
                    uploader?.profileImage &&
                    typeof uploader.profileImage === "string" &&
                    uploader.profileImage.length > 0
                      ? uploader.profileImage
                      : `https://api.dicebear.com/7.x/initials/svg?seed=${
                          (uploader?.username || uploader?.email)?.charAt(0) ||
                          "U"
                        }`
                  }
                  alt={`${uploader?.username || "Uploader"}'s profile`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h2 className="text-sm">
                  {uploader?.username || uploader?.displayName || "Unknown"}
                </h2>
                <p className="text-[12.5px] text-gray-300">
                  {uploader?.email || "Unknown"}
                </p>

                {uploader?.createdAt && (
                  <p className="text-[12.5px] text-gray-300">
                    Joined on{" "}
                    {typeof uploader.createdAt.toDate === "function"
                      ? uploader.createdAt.toDate().toLocaleDateString()
                      : new Date(uploader.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Link>
            <div className="flex text-gray-800 justify-between items-start">
              <div className="flex items-center space-x-2">
                <div className="flex items-baseline gap-2 mt-1">
                  <h1 className="text-xl text-gray-800 leading-none">
                    {year || "No Specific"}
                  </h1>
                  <h1 className="text-xl font-bold leading-none tracking-wide">
                    {name || "No Specific"}
                  </h1>
                  <p className="text-[12.5px] text-gray-500 leading-none">
                    {model || "No Specific"}
                  </p>
                  <p className="text-[12.5px] text-neutral-500 leading-none">
                    {type || "No Specific"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-neutral-500">
                <ShareCarDetailButton carId={carId} />
                <button
                  onClick={toggleSave}
                  className="cursor-pointer text-gray-600"
                >
                  {saved ? (
                    <BookmarkCheck size={22} className="text-blue-600" />
                  ) : (
                    <Bookmark size={22} className="hover:text-blue-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/5 space-y-4 md:sticky md:top-1 md:h-fit">
              <div className="hidden md:block">
                <div className="relative mb-4 overflow-hidden rounded-sm aspect-w-16 aspect-h-9">
                  <img
                    src={getOptimizedImage(
                      activeImage || images?.[0],
                      1200,
                      675
                    )}
                    alt={`${car.name || "Car"} ${car.model || ""} - ${
                      car.features?.slice(0, 3).join(", ") || "Car for sale"
                    }`}
                    width={1200}
                    height={675}
                    loading="lazy"
                    className="object-cover w-full h-60 "
                    onClick={() => {
                      setIsOpen(true);
                      setPhotoIndex(images.indexOf(activeImage || images[0]));
                    }}
                  />
                </div>
                {isOpen && (
                  <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    index={photoIndex}
                    slides={images.map((img) => ({ src: img }))}
                    on={{ view: ({ index }) => setPhotoIndex(index) }}
                  />
                )}
                <div className="grid grid-cols-4 gap-2 md:gap-2.5">
                  {images?.map((image, index) => (
                    <img
                      width={600}
                      height={400}
                      loading="lazy"
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`object-cover w-auto rounded-sm cursor-pointer transition-transform duration-200 hover:scale-105 ${
                        activeImage === image ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setActiveImage(image)}
                    />
                  ))}
                </div>
              </div>
              <hr className="bg-gray-200 h-[1px] my-2" />
              <div className="p-0 space-y-4">
                <div className="space-y-2">
                  <p className="text-[12.5px] font-medium text-gray-800">
                    Seller Details
                  </p>
                  <div className="flex flex-col">
                    {uploader?.contactNumbers?.length > 0 ? (
                      uploader.contactNumbers.map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-xs text-gray-800"
                        >
                          {getProviderImage(contact.provider) ? (
                            <img
                              src={getProviderImage(contact.provider)}
                              alt={contact.provider}
                              className="h-4"
                            />
                          ) : (
                            <p className="text-[12.5px] text-gray-600 capitalize">
                              {contact.provider}
                            </p>
                          )}
                          <span className="font-sans text-[12.5px]">
                            {contact.number}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[12.5px] text-neutral-600">
                        Phone: No Specific
                      </p>
                    )}
                  </div>
                </div>
                {uploader?.message ? (
                  <a
                    href={uploader.message}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer bg-[#2384C1] text-white font-medium flex items-center justify-center gap-1 py-1.5 px-3 rounded-sm shadow-xs hover:bg-blue-700 transition-colors text-xs"
                  >
                    <MessageCircle size={14} className="" />
                    Send Message
                  </a>
                ) : (
                  <button
                    className="cursor-pointer bg-gray-400 text-white font-medium flex items-center justify-center gap-1 py-1.5 px-3 rounded-sm shadow-xs text-xs"
                    disabled
                  >
                    <MessageCircle size={14} className="" />
                    No Message Link
                  </button>
                )}
              </div>
              <hr className="bg-gray-200 h-[1px] my-1" />
              <div className="p-0 space-y-4">
                <div className="bg-neutral-200 rounded-lg h-40 w-full overflow-hidden">
                  {location && (
                    <MapContainer
                      center={location}
                      zoom={13}
                      style={{ height: "100%", width: "100%" }}
                      attributionControl={false}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={location}></Marker>
                    </MapContainer>
                  )}
                  {!location && (
                    <div className="flex items-center justify-center h-full text-blue-600 font-medium text-xs">
                      Location not specified
                    </div>
                  )}
                </div>
                {car.locationName && (
                  <p className="text-[12.5px] text-gray-800 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {car.locationName}
                  </p>
                )}
              </div>

              {/* <CarRating /> */}
            </div>
            <div className="w-full md:w-3/5 space-y-4">
              <Link
                to={`/public-profile/${userId}`}
                className="hidden md:flex items-center bg-[#2384C1] p-3 text-gray-200 font-base gap-4"
              >
                <div className="w-14 h-14 rounded-full flex-shrink-0">
                  <img
                    src={
                      uploader?.profileImage &&
                      typeof uploader.profileImage === "string" &&
                      uploader.profileImage.length > 0
                        ? uploader.profileImage
                        : `https://api.dicebear.com/7.x/initials/svg?seed=${
                            (uploader?.username || uploader?.email)?.charAt(
                              0
                            ) || "U"
                          }`
                    }
                    alt={`${uploader?.username || "Uploader"}'s profile`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-0xl">
                    {uploader?.username ||
                      uploader?.email?.split("@")[0] ||
                      "Unknown"}
                  </h2>
                  <p className="text-[12.5px] text-gray-300">
                    {uploader?.email || "Unknown"}
                  </p>
                  {uploader?.createdAt && (
                    <p className="text-[12.5px] text-gray-300">
                      Joined on{" "}
                      {typeof uploader.createdAt.toDate === "function"
                        ? uploader.createdAt.toDate().toLocaleDateString()
                        : new Date(uploader.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>
              <div className="p-0 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="text-gray-800 flex items-center gap-2">
                    <h1 className="text-xl font-base">
                      {year || "No Specific"}
                    </h1>
                    <h1 className="text-xl flex gap-2 font-bold leading-none tracking-wide text-gray-800">
                      {name || "No Specific"}
                    </h1>
                    <div className="flex items-baseline gap-2 mt-1">
                      <p className="text-[12.5px] text-gray-500 leading-none">
                        {model || "No Specific"}
                      </p>
                      <p className="text-[12.5px] text-neutral-500 leading-none">
                        {type || "No Specific"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-neutral-500">
                    <ShareCarDetailButton userId={userId} carId={carId} />
                    <button
                      onClick={toggleSave}
                      className="cursor-pointer text-gray-600"
                    >
                      {saved ? (
                        <BookmarkCheck size={22} className="text-blue-600" />
                      ) : (
                        <Bookmark size={22} className="hover:text-blue-600" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-1xl text-red-600">
                    ${price || "No Specific"}
                  </h2>
                  <span className="text-xs bg-green-400 px-1 rounded-xs">
                    Available
                  </span>
                  <p className="text-[12.5px] text-gray-500">
                    Original Price: ${originalPrice}
                  </p>
                </div>
                <hr className="bg-gray-200 h-[1px] my-4" />
                <div className="grid grid-cols-3 items-center gap-5 text-neutral-600 text-xl">
                  {Object.entries(overview).map(([key, value], index) => (
                    <div key={index} className="col-span-1">
                      <p className="text-[12.5px] font-medium text-neutral-500">
                        {key}
                      </p>
                      <p className="text-[12.5px] text-gray-800 font-medium">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <hr className="bg-gray-200 h-[1px] my-4" />
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <button className="cursor-pointer bg-[#2384C1] text-white py-1.5 px-3 rounded-sm font-medium shadow-md flex items-center justify-center gap-2 text-xs">
                    <Banknote size={14} />
                    Apply Now
                  </button>
                  <button className="cursor-pointer bg-neutral-200 text-gray-800 py-1.5 px-3 rounded-sm font-medium shadow-sm hover:bg-neutral-300 transition-colors flex items-center justify-center gap-2 text-xs">
                    <ArrowRight size={14} />
                    Book Test Drive
                  </button>
                </div>
              </div>
              <div className="p-0 space-y-4">
                <h2 className="text-1xl font-semibold text-gray-800">
                  Vehicle Details
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(technicalSpecs).map(([label, value]) => (
                    <div key={label} className="col-span-1">
                      <p className="text-[12.5px] font-medium text-neutral-500">
                        {label}
                      </p>
                      <p className="text-[12.5px] text-gray-800 font-medium">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-0 space-y-4">
                <h2 className="text-1xl font-semibold text-gray-800">
                  Description
                </h2>
                <p className="text-neutral-600 leading-relaxed text-[12.5px]">
                  {description || "No description provided."}
                </p>
              </div>
              <div className="p-0 space-y-4">
                <h2 className="text-1xl font-semibold text-gray-800">
                  Features & Options
                </h2>
                <div className="grid grid-cols-2 gap-4 text-neutral-700 text-xl">
                  {(features || []).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-green-500 text-base">✓</span>
                      <span className="text-[12.5px]">{feature}</span>
                    </div>
                  ))}
                  {(car.options || []).map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-green-500 text-base">✓</span>
                      <span className="text-[12.5px]">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* New Similar Cars Section */}
          <SimilarCarsList currentCar={car} />
        </div>
      </div>
    </>
  );
}
