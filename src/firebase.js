// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMK8wwHPzjanrdAcsUwbNctYqoVmgh3ZE",
  authDomain: "messagingapp-7ac9a.firebaseapp.com",
  projectId: "messagingapp-7ac9a",
  storageBucket: "messagingapp-7ac9a.appspot.com",
  messagingSenderId: "309900569543",
  appId: "1:309900569543:web:b335210057b63e0fd287e2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()