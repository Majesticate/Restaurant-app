// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import Firebase Storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAxA3TFcAmhmavKZBDXDbp_Nd74exmgjc",
  authDomain: "restaurant-43f5e.firebaseapp.com",
  projectId: "restaurant-43f5e",
  storageBucket: "restaurant-43f5e.firebasestorage.app",
  messagingSenderId: "590173957362",
  appId: "1:590173957362:web:6e3c3f2facc155d91f346b",
  measurementId: "G-X5E3FJMTGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Export storage

export {createUserWithEmailAndPassword, signInWithEmailAndPassword };