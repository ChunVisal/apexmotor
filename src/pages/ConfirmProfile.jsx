import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ConfirmProfile() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // 👇 Skip confirmation if user already clicked "Never ask again"
    if (localStorage.getItem("neverAskAgain") === "true") {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null; // wait until redirect happens

  const handleConfirm = () => {
    navigate("/"); // go home/dashboard
  };

  const handleNeverAskAgain = () => {
    localStorage.setItem("neverAskAgain", "true"); // ✅ save in localStorage
    navigate("/");
  };

  const handleNotMe = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Is this your account?</h2>

        <img
          src={
            profile?.profileImage ||
            user.photoURL ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile?.displayName || user.displayName || user.email.split("@")[0]
            )}&background=random`
          }
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />

        <p className="text-lg text-gray-600 font-semibold">
          {profile?.displayName || user.displayName || "No name set"}
        </p>
        <p className="text-gray-600 mb-6">{user.email}</p>

        <div className="flex flex-col gap-3 justify-center">
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Yes, Continue
          </button>
          <button
            onClick={handleNotMe}
            className="bg-gray-200 px-3 py-1 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Not Me
          </button>
        </div>
          <button
            onClick={handleNeverAskAgain}
            className="text-[#2384C1]"
          >
            Yes, Never Ask Again
          </button>

      </div>
    </div>
  );
}
