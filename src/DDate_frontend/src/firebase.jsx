import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA6qwchjPtfW4AsKliW8LK6oxnc9IzIYpM",
  authDomain: "ddate-bce0d.firebaseapp.com",
  databaseURL: "https://ddate-bce0d-default-rtdb.firebaseio.com",
  projectId: "ddate-bce0d",
  storageBucket: "ddate-bce0d.appspot.com",
  messagingSenderId: "555411977802",
  appId: "1:555411977802:web:37aa3a014d3c64ec4158b3",
  measurementId: "G-M36EZYJ7LS"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()