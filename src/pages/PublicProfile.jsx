// src/pages/PublicProfile.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import Breadcrumb from "../components/layout/Breadcrumb";
import { format } from "date-fns";
// Corrected import paths for the mobile provider logos
import Smart from "../assets/moblieProvider/smart.png";
import Cellcard from "../assets/moblieProvider/cellcard.png";
import Metfone from "../assets/moblieProvider/metfone.png";
import CarCard from "../components/cars/CarCard";
import { Flag, UserX, MessageCircle } from "lucide-react";
import {
  ShareProfileButton,
  ShareProfileLink,
} from "../components/common/ShareProfile";

export default function PublicProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [soldCars, setSoldCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false); // New state for dropdown
  const dropdownRef = useRef(null); // Ref for handling clicks outside
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState(null);

  const joinedDate = profile?.createdAt?.toDate
    ? format(profile.createdAt.toDate(), "MMMM dd, yyyy")
    : "Unknown Date";

  // Use a ref and useEffect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const fetchProfileAndCars = async () => {
      setLoading(true);
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setProfile(userSnap.data());
        } else {
          setProfile(null);
        }

        const carsRef = collection(db, "carsUser", userId, "cars");
        const q = query(carsRef, where("status", "==", "sold"));
        const querySnapshot = await getDocs(q);
        const fetchedCars = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setSoldCars(fetchedCars);
      } catch (err) {
        console.error("Error fetching public profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfileAndCars();
    }
  }, [userId]);

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

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleReportUser = () => {
    setShowDropdown(false);
  };

  const handleBlockUser = () => {
    setShowDropdown(false);
  };

  const handleMessageUser = () => {
    setShowDropdown(false);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading public profile...</div>;
  }

  if (!profile) {
    return <div className="p-6 text-center text-red-500">User not found.</div>;
  }

  return (
    // Adjusted container margin for better mobile spacing
    <div className="mx-2 sm:mx-10 min-h-screen text-gray-800 bg-gray-50 font-sans">
      <Breadcrumb />
      <div
        className="relative h-48 sm:h-75 bg-gray-200"
        onClick={() => {
          setPreviewType("bg");
          setPreviewOpen(true);
        }}
      >
        <img
          src={
            profile.backgroundImage ||
            "https://via.placeholder.com/1200x400?text=User+Profile"
          }
          alt="Profile Background"
          className="absolute brightness-65 inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-4 sm:p-6 flex items-end gap-4">
          {/* Adjusted profile image size */}
          <div
            onClick={() => {
              setPreviewType("profile");
              setPreviewOpen(true);
            }}
            className="cursor-pointer w-20 h-20 sm:w-25 sm:h-25"
          >
            <img
              src={
                profile.profileImage ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${
                  (profile.username || profile.email)?.charAt(0) || "U"
                }`
              }
              alt="Profile"
              className="w-full h-full border-2 border-gray-200 rounded-full object-cover"
            />
          </div>
          <div className="text-white mb-3">
            {/* Adjusted heading font size for mobile */}
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              {profile.username || "Unknown User"}
            </h1>
            <p className="flex items-center gap-2 text-sm">
              <FaBriefcase /> {profile.job || "Not specified"}
            </p>
            <p>Joined on {joinedDate}</p>
          </div>
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
                previewType === "bg"
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

      {/* Adjusted padding and layout for mobile */}
      <div className="p-4 sm:p-6 md:flex lg:flex justify-between items-start lg:gap-6">
        {/* Left Side: Contact Info - Removed py-1 for better spacing */}
        <div className="bg-white p-6 md:flex-shrink-0 md:w-85">
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <FaEnvelope /> {profile.email || "No email"}
            </li>
            {profile.contactNumbers?.length > 0 ? (
              profile.contactNumbers.map((contact, index) => (
                <li key={index} className="flex items-center gap-2">
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
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> {profile.address || "Not specified"}
            </li>
          </ul>
          <p className="text-xs mt-2 text-gray-500">
            {profile.description || "No description yet"}
          </p>
          <div className="flex items-center gap-2 text-white font-normal">
            {profile?.message ? (
              <a
                href={profile.message}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2384C1] justify-center font-medium flex items-center gap-2 text-[12.5px] py-1 px-4.5 rounded-sm text-white my-3"
              >
                <MessageCircle size={14} /> Message
              </a>
            ) : (
              <button
                disabled
                className="bg-gray-400 justify-center font-medium flex items-center gap-2 text-[12.5px] py-1 px-4.5 rounded-sm text-white my-3 cursor-not-allowed"
              >
                <MessageCircle size={14} /> No Message Link
              </button>
            )}
            <ShareProfileButton userId={userId} />
          </div>
        </div>

        {/* Right Side: Action Icons - Now on a separate line on mobile, moved to the right on desktop */}
        <div className="flex-1 mt-4 md:mt-0 flex justify-end">
          <div className="flex space-x-4 text-gray-600">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-100 transition-colors"
            >
              <MdOutlineMailOutline size={20} />
            </a>
            {profile.contactNumbers?.length > 0 && (
              <a
                href={`tel:${profile.contactNumbers[0].number}`}
                className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-100 transition-colors"
              >
                <FiPhoneCall size={20} />
              </a>
            )}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleToggleDropdown}
                className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-100 transition-colors"
              >
                <BsThreeDotsVertical size={20} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={handleReportUser}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    Report User
                  </button>
                  <button
                    onClick={handleBlockUser}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                  >
                    <UserX className="mr-2 h-4 w-4" />
                    Block User
                  </button>
                  <button
                    onClick={handleMessageUser}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message User
                  </button>
                  <ShareProfileLink userId={userId} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width section below for sold cars */}
      <div className="p-4 sm:p-6">
        {/* Adjusted heading font size */}
        <h1 className="text-2xl tracking-wide font-bold mb-4">
          Sold Cars by {profile.username}
        </h1>
        {soldCars.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {soldCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 p-10">
            <p>This user has not sold any cars yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
