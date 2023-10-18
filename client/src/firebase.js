// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwIB1NpQ8gbxVMnx9Tv4VGoxAiqVv5zUs",
  projectId: "mern-estate-bcf73",
  storageBucket: "mern-estate-bcf73.appspot.com",
  messagingSenderId: "50592398231",
  appId: "1:50592398231:web:8743b7bd85c4e11f68a2d2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);