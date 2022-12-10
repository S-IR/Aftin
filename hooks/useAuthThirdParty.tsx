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
      .then(async(userCredential) => {
        const uid = userCredential.user.uid
        const username = userCredential.user.displayName as string
        const email = userCredential.user.email as string
        //creating the user document
        createUserDoc(userCredential.user.uid, email, username, 'Not Specified', 'Free')
        //sending the request to set cookie
        const token = await userCredential.user.getIdToken()
        //sending the request to set cookie
        await fetch('/api/login', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json', token
          })
        })
        router.push('/')
      })

  }

  const signUpWithFacebook = () => { //TODO
    const auth = getAuth()
    const facebookProvider = new FacebookAuthProvider()
    signInWithPopup(auth, facebookProvider)
      .then((response) => {
        console.log(response); // WORK IN PROGRESS
      }).then(() => router.push('/'))
  }
  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken()
        
        //sending the request to set cookie
        await fetch('/api/login', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json', token
          })
        })
      }).then(() => router.push('/'))
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error)
        
        // ...
      });
  }

  return { signUpWithGoogle, signUpWithFacebook, signInWithGoogle } 
}

