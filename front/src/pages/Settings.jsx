// src/pages/Settings.jsx
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/layout/Breadcrumb";
import { useAuth } from "../context/AuthContext";
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

// provider icons (use same paths as your Profile.jsx)
import Smart from "../assets/moblieProvider/smart.png";
import Cellcard from "../assets/moblieProvider/cellcard.png";
import Metfone from "../assets/moblieProvider/metfone.png";

export default function Settings() {
  const { user, profile, loading } = useAuth();
  const [appSettings, setAppSettings] = useState({
    darkMode: false,
    notifications: true,
    languages: false,
  });

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <div className="p-6">Please log in to access settings.</div>;

  // Just grab the first contact
  const firstContact = profile?.contactNumbers?.[0] || null;

  const providerIcon = (provider) => {
    switch (provider?.toLowerCase()) {
      case "smart": return Smart;
      case "cellcard": return Cellcard;
      case "metfone": return Metfone;
      default: return null;
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const firstConfirm = window.confirm("⚠️ Are you sure you want to delete your account?");
    if (!firstConfirm) return;

    const secondConfirm = prompt('Type "DELETE" to confirm permanent account deletion.');
    if (secondConfirm !== "DELETE") {
      alert("Deletion cancelled.");
      return;
    }

    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(auth.currentUser);
      alert("✅ Account deleted successfully.");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("⚠️ Failed to delete. Please log in again and try.");
    }
  };

  return (
    <div className="p-4 text-gray-800 mx-20 my-6" style={{ marginInline: "15px" }}>
      <Breadcrumbs />

      {/* Profile card */}
      <Link to={`/profile`} className="flex items-center bg-gray-200 rounded-xs gap-4 p-2 mb-4">
        <img
          src={profile?.profileImage || "https://i.pravatar.cc/150?img=12"}
          alt={profile?.name || user.displayName || "User"}
          className="w-14 h-14 rounded-full object-cover border border-gray-600"
        />
        <div className="flex-1">
          <h2 className="text-sm font-semibold">
            {profile?.name || profile?.username || user.displayName || "Unknown"}
          </h2>
          <p className="text-xs text-gray-700">{profile?.email || user.email}</p>
        </div>
        <FaChevronRight size={20} className="text-gray-700" />
      </Link>

      {/* Account Settings */}
      <h3 className="text-sm font-semibold mb-1 pb-1 ml-2">Account Settings</h3>
      <div className="bg-gray-200 rounded-xs px-2 mb-4">
        {/* Name */}
        <Link to={"/profile/edit"} className="flex justify-between items-center py-2 border-b border-gray-300">
          <p className="text-xs">Name</p>
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium">{profile?.name || profile?.username || user.displayName || "-"}</p>
            <FaChevronRight size={15} className="text-gray-500" />
          </div>
        </Link>

        {/* Phone */}
        <Link to={"/profile/edit"} className="flex justify-between items-center py-2 border-b border-gray-300">
          <p className="text-xs">Phone</p>
          <div className="flex items-center gap-2">
            {firstContact ? (
              <>
                {providerIcon(firstContact.provider) && (
                  <img src={providerIcon(firstContact.provider)} alt={firstContact.provider} className="h-4" />
                )}
                <p className="text-xs font-medium">{firstContact.number}</p>
              </>
            ) : (
              <p className="text-xs font-medium">Not specified</p>
            )}
            <FaChevronRight size={15} className="text-gray-500" />
          </div>
        </Link>

        {/* Delete account */}
        <div className="flex justify-between items-center">
          <button onClick={handleDeleteAccount} className="flex justify-between items-center py-2">
          <p className="text-xs text-red-500 font-medium">Delete Account</p>
        </button>
        
          <FaChevronRight size={15} className="text-gray-500" />
        </div>
      </div>

      {/* App Settings */}
      <h3 className="text-sm font-semibold mb-1 pb-1 ml-2">App Settings</h3>
      <div className="bg-gray-200 rounded-xs px-2 mb-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-300">
          <p className="text-xs">Dark Mode</p>
          <input
            type="checkbox"
            checked={appSettings.darkMode}
            onChange={() => setAppSettings((s) => ({ ...s, darkMode: !s.darkMode }))}
          />
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-300">
          <p className="text-xs">Notifications</p>
          <input
            type="checkbox"
            checked={appSettings.notifications}
            onChange={() => setAppSettings((s) => ({ ...s, notifications: !s.notifications }))}
          />
        </div>
        <div className="flex justify-between items-center py-2">
          <p className="text-xs">Language</p>
          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-900">{profile?.language || "Khmer"}</p>
            <input
              type="checkbox"
              checked={appSettings.languages}
              onChange={() => setAppSettings((s) => ({ ...s, languages: !s.languages }))}
            />
          </div>
        </div>
      </div>

      {/* Support */}
      <h3 className="text-sm font-semibold mb-1 pb-1 ml-2">Support</h3>
      <div className="bg-gray-200 rounded-xs px-2 mb-4">
        <Link to={"/feedback"} className="flex justify-between items-center py-2 border-b border-gray-300">
          <p className="text-xs">Feedback</p>
          <FaChevronRight size={15} className="text-gray-500" />
        </Link>
        <Link to={"/safety-tips"} className="flex justify-between items-center py-2 border-b border-gray-300">
          <p className="text-xs">Safety Tips</p>
          <FaChevronRight size={15} className="text-gray-500" />
        </Link>
        <Link to={"/contact-us"} className="flex justify-between items-center py-2">
          <p className="text-xs">Contact Us</p>
          <FaChevronRight size={15} className="text-gray-500" />
        </Link>
      </div>
    </div>
  );
}
