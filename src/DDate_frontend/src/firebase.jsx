// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyA6qwchjPtfW4AsKliW8LK6oxnc9IzIYpM",
//   authDomain: "ddate-bce0d.firebaseapp.com",
//   databaseURL: "https://ddate-bce0d-default-rtdb.firebaseio.com",
//   projectId: "ddate-bce0d",
//   storageBucket: "ddate-bce0d.appspot.com",
//   messagingSenderId: "555411977802",
//   appId: "1:555411977802:web:37aa3a014d3c64ec4158b3",
//   measurementId: "G-M36EZYJ7LS"
// };


// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const storage = getStorage();
// export const db = getFirestore()

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnZLo8ZfLdH1RlvkewlNHj-5UxgP9IAS8",
  authDomain: "conversation-9b8e9.firebaseapp.com",
  projectId: "conversation-9b8e9",
  storageBucket: "conversation-9b8e9.appspot.com",
  messagingSenderId: "1021696961095",
  appId: "1:1021696961095:web:05a992aa5693a136dcdf62",
  measurementId: "G-H94K77QCHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { storage };
