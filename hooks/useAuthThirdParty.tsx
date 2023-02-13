import axios from "axios";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { auth, createUserDoc } from "../firebase";

export default function useAuthThirdParty() {
  const router = useRouter();

  const signUpWithGoogle = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider).then(async (userCredential) => {
      const uid = userCredential.user.uid;
      const username = userCredential.user.displayName as string;
      const email = userCredential.user.email as string;
      //creating the user document
      createUserDoc(uid, email, username, "Not Specified", "Bronze");
      //sending the request to set cookie
      const token = await userCredential.user.getIdToken();
      //sending the request to set cookie
      await fetch("/api/login", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          token,
        }),
      });
      router.push("/");
    });
  };

  const signUpWithFacebook = () => {
    //TODO
    const auth = getAuth();
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
      .then((response) => {
        console.log(response); // WORK IN PROGRESS
      })
      .then(() => router.push("/"));
  };
  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(() => router.push("/"))
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithFacebook = () => {
    alert("WORK IN PROGRESS");
  };

  return {
    signUpWithGoogle,
    signUpWithFacebook,
    signInWithGoogle,
    signInWithFacebook,
  };
}
