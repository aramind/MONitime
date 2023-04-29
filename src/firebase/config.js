// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrS6PUYfp3Vv1JabqkNIhQjWeLa9YzEn0",
  authDomain: "monitime-e8ee0.firebaseapp.com",
  projectId: "monitime-e8ee0",
  storageBucket: "monitime-e8ee0.appspot.com",
  messagingSenderId: "73425076701",
  appId: "1:73425076701:web:09c54ffbf60754955df634",
  measurementId: "G-10XLNY92CS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
