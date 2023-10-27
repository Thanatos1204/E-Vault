import { getFirestore } from 'firebase/firestore'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdtIn6W20gvPCAG_IjhX45U6oQLi4cbmM",
  authDomain: "evault-ea972.firebaseapp.com",
  projectId: "evault-ea972",
  storageBucket: "evault-ea972.appspot.com",
  messagingSenderId: "137572100572",
  appId: "1:137572100572:web:5d86fe839ae6ca0d48c719",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);