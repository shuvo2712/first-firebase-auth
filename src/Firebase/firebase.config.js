// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGmtF-WJ64u8Y0hw2vQdqLzYv7fFWSbdo",
  authDomain: "first-firebase-auth-77a10.firebaseapp.com",
  projectId: "first-firebase-auth-77a10",
  storageBucket: "first-firebase-auth-77a10.firebasestorage.app",
  messagingSenderId: "796077428183",
  appId: "1:796077428183:web:1a2d2497981b7abd908f92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);