// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSKhMSZHWoqwn5OUYuJ3zguIHoy9AroOY",
  authDomain: "carefinder-4f5a9.firebaseapp.com",
  projectId: "carefinder-4f5a9",
  storageBucket: "carefinder-4f5a9.appspot.com",
  messagingSenderId: "137694478372",
  appId: "1:137694478372:web:b6f1185dda414e54e3d8b1"
};
// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get the Firebase authentication instance
const auth = getAuth(firebaseApp);

export default auth;