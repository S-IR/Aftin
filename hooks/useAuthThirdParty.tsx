import axios from 'axios'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'
import React from 'react'
import { auth, createUserDoc } from '../firebase'

export default function useAuthThirdParty() {

  const router = useRouter()

  const signUpWithGoogle = () => {

    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const uid = userCredential.user.uid
        const username = userCredential.user.displayName
        const email: string = userCredential.user.email
        //creating the user document
        createUserDoc(userCredential.user.uid, email, username, 'Not Specified', 'Free')
        //sending the request to set cookie
        axios.post('/api/login', { 'uid': uid })
        router.push('/')
      })

  }

  const signUpWithFacebook = () => { //TODO
    const auth = getAuth()
    const facebookProvider = new FacebookAuthProvider()
    signInWithPopup(auth, facebookProvider)
      .then((response) => {
        console.log(response); // WORK IN PROGRESS
      })
  }
  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        //sending the request to set cookie
        const uid = userCredential.user.uid
        axios.post('/api/login', { 'uid': uid })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return { signUpWithGoogle, signUpWithFacebook, signInWithGoogle } 
}

