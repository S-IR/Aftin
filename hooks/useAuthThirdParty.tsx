import axios from "axios";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { authResponseType } from "../constants/login/types";
import { auth, createUserDoc } from "../firebase";

export default function useAuthThirdParty() {
  const router = useRouter();

  const signUpWithGoogle = async (): Promise<authResponseType> => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    try {
      const user = await signInWithPopup(auth, googleProvider);
      if (user.code) return { status: "error", error: user.code };
      const uid = user.user.uid;
      const username = user.user.displayName as string;
      const email = user.user.email as string;
      //creating the user document
      createUserDoc(uid, email, username, "Not Specified", "Bronze");
      //sending the request to set cookie
      const token = await user.user.getIdToken();
      await fetch("/api/login", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          token,
        }),
      });
      window.gtag(`event`, `sign_up`, {
        method: "Google",
      });
      return { status: "success", user };
    } catch (error) {
      return { status: "error", error };
    }
  };

  const signUpWithFacebook = async (): Promise<authResponseType> => {
    //TODO
    const auth = getAuth();
    const facebookProvider = new FacebookAuthProvider();
    try {
      //TODO
      const user = await signInWithPopup(auth, facebookProvider);
      if (user.code) return { status: "error", error: user.code };
      window.gtag(`event`, `sign_up`, {
        method: "Facebook",
      });
      return { status: "success", user };
    } catch (error) {
      return { status: "error", error };
    }
  };

  const signInWithGoogle = async (): Promise<authResponseType> => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const user = await signInWithPopup(auth, googleProvider);
      if (user.code) return { status: "error", error: user.code };
      window.gtag(`event`, `login`, {
        method: "Google",
      });
      return { status: "success", user };
    } catch (error) {
      return { status: "error", error };
    }
  };

  const signInWithFacebook = async (): Promise<authResponseType> => {
    alert("WORK IN PROGRESS");
    window.gtag(`event`, `login`, {
      method: "Facebook",
    });
  };

  return {
    signUpWithGoogle,
    signUpWithFacebook,
    signInWithGoogle,
    signInWithFacebook,
  };
}
