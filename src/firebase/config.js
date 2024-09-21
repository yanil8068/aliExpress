import { getAuth } from "firebase/auth"; // Import getAuth function to manage Firebase authentication
import { initializeApp } from "firebase/app"; // Import initializeApp to initialize Firebase app

// Firebase configuration object containing the necessary keys and identifiers
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the authentication object for use in other parts of the application
export const auth = getAuth(app);
