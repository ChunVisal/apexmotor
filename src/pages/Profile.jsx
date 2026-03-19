// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import {
  FaCamera,
  FaEnvelope,
  FaSave,
  FaMapMarkerAlt,
  FaPhone,
  FaEdit,
  FaCheckCircle,
  FaHeart,
  FaCarSide,
  FaChartLine,
  FaBriefcase,
} from "react-icons/fa";
import Button from "../components/common/Button";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/layout/Breadcrumb";
import { format } from "date-fns";
import { ShareProfileButton } from "../components/common/ShareProfile";
import { formatDistanceToNow } from "date-fns";

import Smart from "../assets/moblieProvider/smart.png";
import Cellcard from "../assets/moblieProvider/cellcard.png";
import Metfone from "../assets/moblieProvider/metfone.png";
// hellmet
import { Helmet } from "react-helmet-async";

export default function Profile(_car) {
  const { user, profile, loading } = useAuth();
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();
  const [activeTab, setActiveTab] = useState("overview");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTypes, setPreviewTypes] = useState(null);

  const [soldCars, setSoldCars] = useState([]);
  const [soldLoading, setSoldLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const formatTimeAgo = (date) => {
    if (!date) return "N/A";
    const d =
      date instanceof Date
        ? date
        : new Date(date.seconds ? date.seconds * 1000 : date);
    return formatDistanceToNow(d, { addSuffix: true });
  };

  const joinedDate = profile?.createdAt?.toDate
    ? format(profile.createdAt.toDate(), "MMMM dd, yyyy")
    : "Unknown Date";

  const isComplete =
    profile?.profileImage &&
    profile?.contactNumbers?.length > 0 &&
    profile?.address?.trim() !== "";

  // Use useEffect to fetch sold cars data from Firestore
  useEffect(() => {
    const fetchSoldCars = async () => {
      if (!user) {
        setSoldLoading(false);
        return;
      }

      try {
        setSoldLoading(true);
        const q = query(
          collection(db, "carsUser", user.uid, "cars"),
          where("status", "==", "sold")
        );
        const querySnapshot = await getDocs(q);
        const cars = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSoldCars(cars);
      } catch (err) {
        console.error("❌ Error fetching sold cars in Profile:", err);
      } finally {
        setSoldLoading(false);
      }
    };

    fetchSoldCars();
  }, [user]);

  // Combined loading check for both auth and data fetch
  if (loading || soldLoading) {
    return <div className="p-6">Loading…</div>;
  }

  const display =
    profile?.username ||
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : null) ||
    "Guest";

  // Helper function to get the correct provider image
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

  const profileName = user?.displayName || "User Profile";
  const profileImage = user?.photoURL || "https://apexmotor.shop/logo.png";
  const profileId = user?.uid;

  const renderCarGrid = (items, emptyMessage, _hasDate = false) => {
    if (items.length === 0)
      return <p className="text-gray-500">{emptyMessage}</p>;

    return (
      <>
        <Helmet>
          <title>{profileName} - Seller Profile | ApexMotor</title>

          <meta
            name="description"
            content={`View ${profileName}'s car listings, contact details, and profile information on ApexMotor.`}
          />

          <meta
            name="keywords"
            content={`${profileName}, car seller, apexmotor seller, profile, cambodia cars`}
          />

          <meta
            property="og:title"
            content={`${profileName} - ApexMotor Profile`}
          />
          <meta
            property="og:description"
            content={`Check out ${profileName}'s listings and contact info.`}
          />
          <meta property="og:image" content={profileImage} />
          <meta property="og:type" content="profile" />
          <meta
            property="og:url"
            content={`https://apexmotor.shop/profile/${profileId}`}
          />

          <link
            rel="canonical"
            href={`https://apexmotor.shop/profile/${profileId}`}
          />

          {/* JSON-LD Seller Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `https://apexmotor.shop/profile/${profileId}#person`,
              name: profileName,
              image: profileImage,
              url: `https://apexmotor.shop/profile/${profileId}`,
            })}
          </script>
        </Helmet>

        <div className="grid sm:grid-cols-1 gap-4 overflow-x-auto custom-scrollbar sm:max-h-[210px] max-h-[350px] pr-2">
          {items.map((car) => (
            <Link
              to={`/car/${car.userId}/${car.id}`}
              key={car.id}
              className="bg-gray-100 p-1.5 flex sm:min-h-[100px] min-h-[100px]"
            >
              <img
                src={
                  (car.images && car.images[0]) ||
                  "https://via.placeholder.com/150"
                }
                alt={car.name}
                className="sm:w-24 w-30 h-full object-cover rounded flex-shrink-0"
              />
              <div className="flex flex-col justify-between flex-1 ml-3 truncate relative">
                <div>
                  <div className="flex items-center text-center gap-1  mb-1 whitespace-nowrap truncate">
                    <h4 className="text-sm">{car.name}</h4>
                    <p className="text-xs text-gray-700 truncate">
                      {car.model}
                    </p>
                    <p className="text-xs text-gray-700 truncate">{car.type}</p>
                  </div>
                  <p className="text-[#2384C1] text-xs font-semibold">
                    $ {car.price}
                  </p>
                </div>
                <span className="text-xs text-green-500 absolute bottom-0 right-0">
                  <span className="text-xs text-green-600">
                    {formatTimeAgo(car.createdAt)}
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "wishlist":
        return renderCarGrid(wishlistItems, "No cars in wishlist.");
      case "listings":
        return renderCarGrid(cartItems, "No saved orders yet.");
      case "Sold Cars":
        return renderCarGrid(soldCars, "No cars have been sold yet.", true);
      default:
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">Account Overview</h3>
            <p className="text-sm text-gray-700">
              Quick summary of your activity.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div>
                <p className="text-2xl font-bold">{wishlistItems.length}</p>
                <Link
                  to={"/Wishlist"}
                  className="text-blue-500 text-sm underline"
                >
                  Wishlist
                </Link>
              </div>
              <div>
                <p className="text-2xl font-bold">{cartItems.length}</p>
                <Link to={"/cart"} className="text-blue-500 text-sm underline">
                  Listings
                </Link>
              </div>
              <div>
                <p className="text-2xl font-bold">{soldCars.length}</p>
                <Link to={"/sold"} className="text-blue-500 text-sm underline">
                  Sold
                </Link>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="text-gray-900 sm:mx-10 mx-5 ">
      <Breadcrumbs />
      <div className="relative h-48 sm:h-75 w-full bg-gray-200">
        <div
          className="relative h-48 sm:h-75 w-full bg-gray-200 overflow-hidden"
          onClick={() => {
            setPreviewTypes("bg");
            setPreviewOpen(true);
          }}
        >
          <img
            src={
              profile?.backgroundImage ||
              "https://via.placeholder.com/1200x400?text=No+Background"
            }
            alt="Profile Background"
            className="absolute brightness-70 inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 p-6 flex items-end gap-4">
          <div
            onClick={() => {
              setPreviewTypes("profile");
              setPreviewOpen(true);
            }}
            className="cursor-pointer relative sm:w-25 sm:h-25"
          >
            <img
              src={profile?.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="sm:w-25 sm:h-25 h-20 w-20 border-2 border-gray-200 rounded-full object-cover"
            />
            <Link
              to={"/profile/edit"}
              className="absolute z-10  bottom-0 right-0 bg-[#2384C1] hover:bg-blue-500 p-1.5 rounded-full border border-white shadow-md cursor-pointer"
            >
              <FaCamera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Link>
          </div>
          <div className="text-white mb-3">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {display}
              <FaCheckCircle size={19} className="text-green-400" />
            </h1>
            <p className="flex items-center gap-2 text-sm">
              <FaBriefcase /> {profile?.job || "Not specified"}
            </p>
            <p className="text-xs text-gray-200">Joined on {joinedDate}</p>
          </div>
        </div>
        {previewOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setPreviewOpen(false)}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={
                  previewTypes === "bg"
                    ? profile?.backgroundImage ||
                      "https://via.placeholder.com/1200x400"
                    : profile?.profileImage || "https://via.placeholder.com/300"
                }
                alt="Profile Preview"
                className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-lg"
              />

              <button
                onClick={() => setPreviewOpen(false)}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-3 py-1 text-sm hover:bg-black"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="sm:p-6 py-0 pt-4 md:flex lg:flex justify-center lg:gap-6 min-h-[200px]">
        <div className="bg-white p-6 px-4 md:flex-shrink-0 md:w-80 sm:border-none border-b-2 border-gray-400">
          {!isComplete && (
            <div className="my-2 bg-yellow-100 border-l-4 text-xs border-yellow-500 text-yellow-700 p-3 rounded-md flex items-center gap-2">
              <span>
                Your profile is incomplete. Please update your{" "}
                {!profile?.profileImage && "profile picture, "}
                {(!profile?.contactNumbers ||
                  profile?.contactNumbers.length === 0) &&
                  "phone number, "}
                {!profile?.address && "address"}.
              </span>
            </div>
          )}
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <FaEnvelope /> {user?.email || "Not specified"}
            </li>
            {profile?.contactNumbers?.length > 0 ? (
              profile.contactNumbers.map((contact, index) => (
                <li key={index} className="flex items-center gap-2">
                  {/* New: Conditionally render based on provider */}
                  {getProviderImage(contact.provider) ? (
                    <img
                      src={getProviderImage(contact.provider)}
                      alt={contact.provider}
                      className="h-4"
                    />
                  ) : (
                    <FaPhone />
                  )}
                  <span className="font-sans">{contact.number}</span>
                </li>
              ))
            ) : (
              <li className="flex items-center gap-2">
                <FaPhone />
                <span>Not specified</span>
              </li>
            )}
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt /> {profile?.address || "Not specified"}
            </div>
          </ul>
          <p className="text-xs mt-2 text-gray-500">
            {profile?.description || "No description yet"}
          </p>
          <div className="flex text-gray-100 gap-3 mt-4 flex-wrap">
            <Link
              to={"/profile/edit"}
              className="btn-Bg font-medium flex items-center gap-2 text-xs py-1.5 px-3 rounded-sm"
            >
              <FaEdit /> Edit Profile
            </Link>
            <ShareProfileButton userId={profileId} />
          </div>
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col">
          <div className="flex sm:grid sm:grid-cols-5 sm:justify-start justify-center gap-2 mb-4 whitespace-nowrap">
            {[
              { id: "overview", icon: FaChartLine, label: "Overview" },
              { id: "wishlist", icon: FaHeart, label: "Wishlist" },
              { id: "listings", icon: FaSave, label: "Listings" },
              { id: "Sold Cars", icon: FaCarSide, label: "Cars Sold" },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? "bg-[#2384C1] text-white"
                    : "bg-gray-200 text-gray-700"
                } px-2 py-1 rounded-md text-xs flex items-center gap-1 sm:gap-3`}
              >
                <tab.icon className="text-xs" /> {tab.label}
              </Button>
            ))}
          </div>
          <div className="flex-1">{renderTabContent()}</div>
        </div>
      </div>

      {/* New: Message Box to replace alerts */}
      {message && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center border-t-4 border-red-500">
            <p className="text-sm text-gray-700 mb-4">{message}</p>
            <button
              onClick={() => setMessage(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
