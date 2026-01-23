// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClk5sey1D1Qa1HTyE1PNygr_JDfL4ZToo",
  authDomain: "apexmotor-8a781.firebaseapp.com",
  projectId: "apexmotor-8a781",
  storageBucket: "apexmotor-8a781.appspot.com",
  messagingSenderId: "895453827384",
  appId: "1:895453827384:web:01004a5ca2cf1d6a97b1cd",
  measurementId: "G-JN76D1YXY4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

function loginWithGoogle() {
  if (isSafari) {
    return signInWithRedirect(auth, provider);
  }
  return signInWithPopup(auth, provider);
}

export { app, db, auth, googleProvider, signInWithPopup, loginWithGoogle };
  