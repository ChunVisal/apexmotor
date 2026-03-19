import { FaShareAlt } from "react-icons/fa";
import { Share2 } from "lucide-react";
import Button from "../common/Button";

/* =====================
   SHARE HELPERS
===================== */

// share profile
const shareProfile = async (userId) => {

  const url = `${window.location.origin}/public-profile/${userId}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Check out this profile",
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Profile link copied");
    }
  } catch (err) {
    console.error(err);
  }
};

// share car
const shareCar = async (userId, carId) => {

  const url = `${window.location.origin}/cars/${userId}/${carId}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Check out this car",
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Car link copied");
    }
  } catch (err) {
    console.error(err);
  }
};

/* =====================
   COMPONENTS
===================== */

// Share my profile (button)
export function ShareProfileButton({ userId }) {
  return (
    <Button
      onClick={() => shareProfile(userId)}
      className="btn-Bg flex items-center gap-2 text-xs py-1.5 px-3 rounded-sm"
    >
      <FaShareAlt /> Share Profile
    </Button>
  );
}

// Share public profile (menu / link)
export function ShareProfileLink({ userId }) {
  return (
    <button
      onClick={() => shareProfile(userId)}
      className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
    >
      <Share2 className="mr-2 h-4 w-4" /> Share Profile
    </button>
  );
}

// Share car card
export function ShareCarButton({ userId, carId }) {
  return (
    <button
      onClick={() => shareCar(userId, carId)}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-gray-800 transition-colors duration-150 hover:bg-gray-50"
    >
      <span className="text-gray-600">
        <Share2 size={20} />
      </span>
      <span>Share</span>
    </button>
  );
}

// Share car detail
export function ShareCarDetailButton({ userId, carId }) {
  return (
    <button onClick={() => shareCar(userId, carId)}>
      <span className="text-gray-600">
        <Share2 size={20} />
      </span>
    </button>
  );
}
