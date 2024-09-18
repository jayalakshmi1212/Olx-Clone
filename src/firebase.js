import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOVYemeNih3L9OQsYhTzQAP1Dt5dOjlk4",
  authDomain: "olxclone-8aafb.firebaseapp.com",
  projectId: "olxclone-8aafb",
  storageBucket: "olxclone-8aafb.appspot.com",
  messagingSenderId: "951499305159",
  appId: "1:951499305159:web:4ec287437a9e89807b4ee2",
  measurementId: "G-RCV8FFCSVJ"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);   
export const firestore = getFirestore(Firebase);