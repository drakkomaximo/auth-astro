// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA03bEBbjEo_YmWRowdvCipD920mL_tNrg",
  authDomain: "astro-authentication-e678d.firebaseapp.com",
  projectId: "astro-authentication-e678d",
  storageBucket: "astro-authentication-e678d.firebasestorage.app",
  messagingSenderId: "1015333669085",
  appId: "1:1015333669085:web:4fe3f87542da1b6b5d3334"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const firebase = {
  app,
  auth
}