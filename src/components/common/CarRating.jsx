import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function CarRating({ userId, carOwnerId, carId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!rating) return alert("Please rate the car");

    const ratingRef = doc(
      db,
      "carsUser",
      carOwnerId,
      "cars",
      carId,
      "ratings",
      userId
    );

    await setDoc(ratingRef, {
      rating,
      comment,
      createdAt: serverTimestamp(),
    });

    alert("Thanks for your review 🔥");
    setComment("");
  };

  return (
    <div className="text-gray-800">
      <div className="flex justify-between gap-4">
          <div className="flex-1">
            {/* Stars */}
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            {/* Comment */}
            <textarea
              className="w-full border rounded text-sm"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-2 px-1 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
      </div>
    </div>
  );
}
