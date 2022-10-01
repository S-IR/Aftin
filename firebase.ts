// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0nq95S2D0p52n1lb8F4eUiYW62JuP8rU",
  authDomain: "aftin-3516f.firebaseapp.com",
  projectId: "aftin-3516f",
  storageBucket: "aftin-3516f.appspot.com",
  messagingSenderId: "553217579691",
  appId: "1:553217579691:web:6e1f95c70d1c1f6c5875ee",
  measurementId: "G-BTF883FE0C"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app



 const createUserDoc = (uid:string, email:string, username:string, occupation:string, subscriptionLevel:string) =>{
  setDoc(doc(db, 'users', uid), {
    email: email,
    occupation: 'Not Specified',
    subscriptionLevel : 'Free',
    username: username ,
  })
}

export { auth, db, createUserDoc }
