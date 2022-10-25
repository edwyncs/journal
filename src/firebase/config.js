// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmB-UyKaU_oMr8gs25aRaju_UB3pHBWdc",
  authDomain: "react-curso-f0981.firebaseapp.com",
  projectId: "react-curso-f0981",
  storageBucket: "react-curso-f0981.appspot.com",
  messagingSenderId: "516809560916",
  appId: "1:516809560916:web:407ae94eff6abf89312ec1"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);