// src/pages/EditProfile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "../components/layout/Breadcrumb";

import Smart from "../assets/moblieProvider/smart.png";
import Cellcard from "../assets/moblieProvider/cellcard.png";
import Metfone from "../assets/moblieProvider/metfone.png";

const EditProfile = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // Profile fields
  const [username, setUsername] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [newProvider, setNewProvider] = useState("other");
  const [contactNumbers, setContactNumbers] = useState(
    profile?.contactNumbers || []
  );
  const [address, setAddress] = useState(profile?.address || "");
  const [description, setDescription] = useState(profile?.description || "");
  const [profileImage, setProfileImage] = useState(profile?.profileImage || "");
  const [job, setJob] = useState(profile?.job || "");
  const [backgroundImage, setBackgroundImage] = useState(
    profile?.backgroundImage || ""
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Cloudinary config
  const cloudName = "dwwsvsah5";
  const uploadPreset = "apexmotor-upload";

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

  useEffect(() => {
    if (profile) {
      setContactNumbers(profile.contactNumbers || []);
      setAddress(profile.address || "");
      setDescription(profile.description || "");
      setJob(profile.job || "");
      setProfileImage(profile.profileImage || "");
      setBackgroundImage(profile.backgroundImage || "");
      setMessage(profile.message || "");
    }
  }, [profile]);

  const reauthenticate = async (password) => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
  };

  // Upload image to Cloudinary
  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      if (type === "profile") {
        setProfileImage(response.data.secure_url);
      } else if (type === "background") {
        setBackgroundImage(response.data.secure_url);
      }
    } catch (err) {
      console.error("❌ Image upload failed:", err);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // update display name
      await updateProfile(auth.currentUser, { displayName: username });

      // password update
      if (newPassword && newPassword === confirmPassword) {
        try {
          await reauthenticate(currentPassword);
          await updatePassword(auth.currentUser, newPassword);
        } catch (err) {
          alert("Failed to update password. Please log in again.");
        }
      }

      // save Firestore data (with background!)
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          username,
          contactNumbers,
          address,
          message,
          description,
          job,
          profileImage,
          backgroundImage,
        },
        { merge: true }
      );

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleAddContact = () => {
    if (newPhoneNumber.trim() !== "") {
      // Updated: push an object with number and provider
      setContactNumbers((prev) => [
        ...prev,
        { number: newPhoneNumber.trim(), provider: newProvider },
      ]);
      setNewPhoneNumber("");
      setNewProvider("other");
    }
  };

  const removeContact = (index) => {
    setContactNumbers((prev) => prev.filter((_, i) => i !== index));
  };

  if (!user) {
    return <div>Please log in to edit your profile.</div>;
  }

  return (
    <section className="text-gray-900 p-6 sm:p-10 font-sans min-h-screen">
      <Breadcrumb />
      <div className="max-w-xl mx-auto border rounded-md border-gray-200 bg-gray-100 p-5">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
          Edit Your Profile
        </h1>
        <p className="text-gray-500 mb-8">
          Update your personal information below.
        </p>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6">
            <img
              onClick={() => setPreviewOpen(true)}
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "profile")}
              className="mt-3 text-sm"
            />
          </div>

          {previewOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
              onClick={() => setPreviewOpen(false)}
            >
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <img
                  src={
                    profile?.profileImage || "https://via.placeholder.com/300"
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

          {/* Account Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  disabled
                  className="w-full bg-gray-200 border border-gray-300 rounded-lg py-1 px-3 text-sm cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed directly.
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="********"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm"
                />
              </div>

              {/* New Password */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="********"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">message URL</label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g.,  https://t.me/YourUsername"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Job</label>
                <input
                  type="text"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  placeholder="e.g., Software Engineer"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  placeholder="Tell us about yourself..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  rows="3"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1">
                  Background Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "background")}
                />
                {backgroundImage && (
                  <img
                    src={backgroundImage}
                    width={600}
                    height={400}
                    loading="lazy"
                    alt="Background"
                    className="mt-2 w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                  Phone Numbers
                </label>
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <select
                      value={newProvider}
                      onChange={(e) => setNewProvider(e.target.value)}
                      className="bg-gray-50 border border-gray-300 rounded-lg py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="other">Other</option>
                      <option value="smart">Smart</option>
                      <option value="cellcard">Cellcard</option>
                      <option value="metfone">Metfone</option>
                    </select>
                    <input
                      type="text"
                      value={newPhoneNumber}
                      onChange={(e) => setNewPhoneNumber(e.target.value)}
                      placeholder="e.g., +855 12 345 678"
                      className="flex-grow bg-gray-50 border border-gray-300 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddContact}
                    className="bg-[#2384C1] text-white px-4 py-1 rounded-lg text-sm disabled:bg-gray-400"
                  >
                    Add
                  </button>
                </div>
                <ul className="mt-2 text-sm text-gray-700 space-y-2">
                  {contactNumbers.map((phone, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between py-1 px-3 bg-gray-200 rounded-lg"
                    >
                      {/* New: Conditionally render logo or text */}
                      <div className="flex items-center gap-2">
                        {getProviderImage(phone.provider) ? (
                          <img
                            src={getProviderImage(phone.provider)}
                            alt={phone.provider}
                            className="h-4"
                          />
                        ) : (
                          <span className="text-xs text-gray-600 capitalize">
                            {phone.provider}
                          </span>
                        )}
                        <span>{phone.number}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeContact(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2384C1] text-white font-bold p-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
