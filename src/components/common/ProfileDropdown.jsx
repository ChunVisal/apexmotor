import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Heart,
  Bookmark,
  Settings,
  LogOut,
  ShoppingCart,
} from "lucide-react";

const ProfileAvatar = () => {
  const { user, profile } = useAuth();

  const displayName =
    profile?.username ||
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Guest";

  const initials = displayName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="w-11 h-11 flex items-center justify-center rounded-full overflow-hidden bg-yellow-500">
      {profile?.profileImage ? (
        <img
          src={profile.profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-bold w-11 h-11 text-white text-lg">{initials}</span>
      )}
    </div>
  );
};


// Array of menu items
const menuItems = [
  { icon: <Heart className="w-4 h-4" />, text: "Wishlist", path: "/wishlist" },
  { icon: <Car className="w-4 h-4" />, text: "Cars Sold", path: "/sold" },
  { icon: <Bookmark className="w-4 h-4" />, text: "Saved Orders", path: "/cart" },
  { icon: <ShoppingCart className="w-4 h-4" />, text: "Inventory", path: "/cars" },
  { icon: <Settings className="w-4 h-4" />, text: "Settings", path: "/settings" },
];

export default function ProfileDropdown({ logout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = profile?.username || user?.displayName || user?.email?.split("@")[0] || "Guest";
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 flex flex-shrink-0 items-center justify-center rounded-full border-2 text-gray-900 border-gray-300 overflow-hidden hover:ring-2 ring-gray-500 transition"
      >
        <ProfileAvatar />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 min-w-[200px] max-w-xs bg-white rounded shadow-lg z-50">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 border-b border-gray-200"
          >
            <div className="w-10 h-10 flex items-center justify-center text-white flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-200">
              <ProfileAvatar />
            </div>
            <div className="flex flex-col items-start flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 break-words">{displayName}</p>
              <span className="text-xs text-gray-600 break-words">{user?.email}</span>
            </div>
          </Link>
          
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
            >
              {item.icon} {item.text}
            </Link>
          ))}

          <button
            onClick={() => logout && logout()}
            className="flex items-center border-t border-gray-200 gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}