// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6AnULA8sH1jNSmJwtqJrb_8LjlDSq7wE",
  authDomain: "vite-contact-f1d96.firebaseapp.com",
  projectId: "vite-contact-f1d96",
  storageBucket: "vite-contact-f1d96.appspot.com",
  messagingSenderId: "438211791121",
  appId: "1:438211791121:web:a107d2ece2af3cb0c824b0",
  measurementId: "G-CF68VTKX8H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
