// src/components/layout/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";

import SearchBar from "../common/SearchBar";
import ProfileDropdown from "../common/ProfileDropdown";
import DropdownMenu from "../common/DropdownMenu";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Home, ShoppingCart, Settings, User, LogOut, LogIn, Bookmark, Bell} from "lucide-react";

import logo from "../../logo.png";

// Custom Message Box component for logout confirmation
function MessageBox({ message, onConfirm, onCancel }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm text-center animate-fadeIn">
        <p className="text-lg font-semibold text-gray-800 mb-4">{message}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white font-semibold text-sm py-2 px-4 rounded-sm hover:bg-red-700 transition"
          >
            Yes, Logout
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-sm hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}


// Logo component
const Logo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <img
      src={logo}
      className="w-10 cursor-pointer"
      onClick={handleLogoClick}
      alt="logoion"
    />
  );
};

// Main Navbar component
export default function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch();
  const { user, logout, loading } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleMobileSearch = () => {
    setShowMobileSearch(prev => !prev);
    if (showMobileSearch) setSearchQuery("");
  };

  const handleLogout = () => setConfirmLogout(true);
  const handleConfirm = () => {
    logout();
    setConfirmLogout(false);
    navigate("/");
  };
  const handleCancel = () => setConfirmLogout(false);

  function handleProtectRoute(_path) {
    if (!user) {
      alert("🛑 Please login to access this page!");
    }
  }

  const renderUserSection = () => {
    if (loading) {
      return (
        <div className="w-11 h-11 border-2 border-gray-300 rounded-full bg-gray-200 flex items-center justify-center text-white">
          ?
        </div>
      );
    }

    if (user) return <ProfileDropdown user={user} logout={handleLogout} />;

    return (
      <Link
        to="/login"
        className="bg-red-600 text-white px-4 text-sm py-1.5 rounded-md hover:bg-red-700"
      >
        Login
      </Link>
    );
  };

  return (
    <><nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md text-gray-900 bg-opacity-10 shadow-lg border-b border-white/20 px-4 py-1.5" style={{ fontFamily: "'Arimo', sans-serif" }}>

      {/* Mobile Search */}
      {showMobileSearch && (
        <div className="md:hidden mb-2 animate-slideDown">
          <SearchBar query={searchQuery} setQuery={setSearchQuery} toggleMobileSearch={toggleMobileSearch} />
        </div>
      )}

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-5">
          <Link to="/cars" className="text-base font-medium text-gray-800 hover:text-gray-900">
            Inventory
          </Link>
          <Link to={"/notification"} onClick={() => handleProtectRoute("/notification")} className="">
            <Bell />
          </Link>
          <Link to={"/Sellcar"}
            onClick={() => handleProtectRoute("/Sellcar")}
            className="sm:w-35 gap-2 sm:h-8 flex justify-center items-center rounded-md overflow-hidden btn-Bg hover:ring-2 ring-gray-500 transition"
          >
            <FontAwesomeIcon size="lg" color="white" icon={faCamera} />
            <h3 className="text-0xl font-semibold text-gray-100 whitespace-nowrap">Sell</h3>
          </Link>

          <SearchBar query={searchQuery} setQuery={setSearchQuery} />

          {renderUserSection()}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between w-full">
        <Logo />
        <div className="flex items-center gap-3">
          <button onClick={toggleMobileSearch} className="hover:text-red-600" aria-label="Search">
            <FontAwesomeIcon icon={showMobileSearch ? faTimes : faSearch} className="h-5 w-5 text-lg" />
          </button>

          {renderUserSection()}

          <Link
            to={"/Sellcar"}
            onClick={() => handleProtectRoute("/Sellcar")}
            className="h-8 w-17 flex justify-center gap-1 items-center rounded-md overflow-hidden btn-Bg hover:ring-2 ring-gray-500 transition"
          >
            <FontAwesomeIcon size="md" color="white" icon={faCamera} />

            <h3 className="text-0xl font-medium text-gray-100 whitespace-nowrap">Sell</h3>
          </Link>

          <Link to={"/notification"} onClick={() => handleProtectRoute("/notification")} className="">
            <Bell />
          </Link>
          <button onClick={toggleMenu} aria-label="Toggle menu" className="text-2xl p-1">&#9776;</button>
        </div>

        {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-[1500] bg-transparent" />}

        <DropdownMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <div className="flex flex-col p-2 border-0">
            {[
              { to: "/", icon: <Home className="w-4 h-4 m-1" />, label: "Home" },
              { to: "/cart", icon: <Bookmark className="w-4 h-4 m-1" />, label: "Save Order" },
              { to: "/cars", icon: <ShoppingCart className="w-4 h-4 m-1" />, label: "Invetory" },
              { to: "/settings", icon: <Settings className="w-4 h-4 m-1" />, label: "Settings" },
            ].map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center py-1.5 px-2 border-gray-200 text-gray-900 hover:text-red-600 hover:bg-white/10 transition-colors gap-2"
              >
                {icon}
                {label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to="/Profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center py-1.5 px-2 border-gray-200 text-gray-900 hover:text-red-600 hover:bg-white/10 transition-colors gap-2"
                >
                  <User className="w-4 h-4 m-1" />
                  Profile
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); } }
                  className="flex items-center justify-center py-1 px-2 border-t border-gray-200 text-red-600 hover:text-red-800 hover:bg-white/10 transition-colors gap-1 rounded-sm text-sm mx-auto"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>

              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors gap-2"
              >
                <LogIn className="w-4 h-4 m-1" />
                Login
              </Link>
            )}
          </div>
        </DropdownMenu>
      </div>

    </nav><MessageBox
        message={confirmLogout ? "Are you sure you want to log out?" : null}
        onConfirm={handleConfirm}
        onCancel={handleCancel} /></>
  );
}
