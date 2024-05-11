// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-e5c5e.firebaseapp.com",
  projectId: "mern-auth-e5c5e",
  storageBucket: "mern-auth-e5c5e.appspot.com",
  messagingSenderId: "15944009263",
  appId: "1:15944009263:web:7298e0e57e9a719d6968da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);