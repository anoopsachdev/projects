// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnNA7H_imDARpqAWI_ryTMZ5vlPo9iwQM",
  authDomain: "tripmate-38527.firebaseapp.com",
  projectId: "tripmate-38527",
  storageBucket: "tripmate-38527.firebasestorage.app",
  messagingSenderId: "117557833422",
  appId: "1:117557833422:web:b2a8e7e09523b49e82aa9f",
  measurementId: "G-0M3TSVJL2C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);