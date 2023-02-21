// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0nq95S2D0p52n1lb8F4eUiYW62JuP8rU",
  authDomain: "aftin-3516f.firebaseapp.com",
  databaseURL: "https://aftin-3516f-default-rtdb.firebaseio.com",
  projectId: "aftin-3516f",
  storageBucket: "aftin-3516f.appspot.com",
  messagingSenderId: "553217579691",
  appId: "1:553217579691:web:6e1f95c70d1c1f6c5875ee",
  measurementId: "G-BTF883FE0C",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export default app;

const createUserDoc = (
  uid: string,
  email: string,
  username: string,
  occupation: string,
  subscriptionLevel: string
) => {
  setDoc(doc(db, "users", uid), {
    email: email,
    occupation: "Not Specified",
    tier: "bronze",
    username: username,
  });
};

// const createImageDoc = (name:string, alt_text:string , checkbox:boolean, collection_name: string, description: string, url: string) =>{
//   addDoc(collection(db, collection_name ), {
//     name: name,
//     alt_text: alt_text,
//     paid : checkbox,
//     description: description,
//     url: url,
//     views: 0
//   })

auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});
export { auth, db, createUserDoc, storage };
