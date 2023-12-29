//creating firebase config here and exporting.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBs9rbt3bHVZHVQ4xBp5KBXwe79GiqS868",
  authDomain: "busy-buy-app-8b870.firebaseapp.com",
  projectId: "busy-buy-app-8b870",
  storageBucket: "busy-buy-app-8b870.appspot.com",
  messagingSenderId: "147508862667",
  appId: "1:147508862667:web:d37536d82cd30259f0854e",
  measurementId: "G-0BZXQM5EBC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
