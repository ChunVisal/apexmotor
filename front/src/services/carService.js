import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getCars = async () => {
  const querySnapshot = await getDocs(collection(db, "cars"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
