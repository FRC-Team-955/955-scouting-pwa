// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD20JLcMS1b7wKofNyGr1KBKAj0g-Kp1is",
  authDomain: "scouting-8711d.firebaseapp.com",
  projectId: "scouting-8711d",
  storageBucket: "scouting-8711d.appspot.com",
  messagingSenderId: "442579843885",
  appId: "1:442579843885:web:568987b51d86a66fa6b1a4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export {firebaseApp, db}