import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYJwykCgVRhDvMpZYbWwXTrQricv7cnGI",
  authDomain: "next-todo-6ab47.firebaseapp.com",
  projectId: "next-todo-6ab47",
  storageBucket: "next-todo-6ab47.appspot.com",
  messagingSenderId: "361565345488",
  appId: "1:361565345488:web:10b85b72bfe80f04d130d5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

