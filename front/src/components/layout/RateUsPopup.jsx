import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { saveRating } from "../../utils/saveRating"; 
import { useAuth } from "../../context/AuthContext"; 

export default function RateUsPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    // Check localStorage if user already rated or skipped
    const rated = localStorage.getItem("rated");
    if (rated) return; // don't show again

    // Show popup after 15s if not rated before
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    if (rating > 0) {
      saveRating(rating, user); // save to backend
      localStorage.setItem("rated", "true"); // prevent popup again
      setShowPopup(false);
    }
  };

  const handleNeverAsk = () => {
    localStorage.setItem("rated", "true"); // block forever
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white p-4 rounded-xs shadow-xl w-72 animate-slideUp">
        <h2 className="sm:text-base text-sm flex items-center gap-2 text-gray-600 font-bold mb-1">
          <StarIcon className="text-green-500" /> Rate Us
        </h2>
        <p className="text-gray-600 sm:text-sm text-xs mb-3">
          Do you like our website? Give us a quick rating!
        </p>

        {/* Stars */}
        <div className="flex text-base justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl transition ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-2">
          <button
            onClick={handleNeverAsk}
            className="text-blue-500 underline text-[12.5px] "
          >
            Never Ask Again
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`px-3 py-1 rounded-lg text-sm text-white transition ${
              rating > 0
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
