// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYJwykCgVRhDvMpZYbWwXTrQricv7cnGI",
  authDomain: "next-todo-6ab47.firebaseapp.com",
  projectId: "next-todo-6ab47",
  storageBucket: "next-todo-6ab47.appspot.com",
  messagingSenderId: "361565345488",
  appId: "1:361565345488:web:10b85b72bfe80f04d130d5",
  measurementId: "G-7XKN0P49Y9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
