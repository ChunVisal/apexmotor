import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase"; // adjust path to your firebase config

// replace this with your new Firebase Auth UID
const newUID = "ROQ6oiqDvnYf99NZeQ4yMqDfGQh2"; 

const profileData = {
  address: "Phnom Bakheng, Siem Reap, Cambodia",
  backgroundImage: "https://res.cloudinary.com/dwwsvsah5/image/upload/v1757418884/iergaiwuobnrxcogjhwh.png",
  contactNumbers: [
    { number: "asfdsaf", provider: "other" },
    { number: "1221", provider: "other" },
    { number: "232", provider: "smart" }
  ],
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  description: "I am a software developer and persistence with coding and working, I play game",
  email: "vsal0882@gmail.com",
  job: "Software developer",
  profileImage: "https://res.cloudinary.com/dwwsvsah5/image/upload/v1757418818/dcmpy5adhp6nswnz26tf.jpg",
  username: "ChunVisal"
};

async function restoreProfile() {
  try {
    await setDoc(doc(db, "users", newUID), profileData);
    console.log("✅ Profile restored successfully!");
  } catch (err) {
    console.error("❌ Error restoring profile:", err);
  }
}

// Run the function
restoreProfile();
