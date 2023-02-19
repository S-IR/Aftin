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
  const authWithGoogle = async (): Promise<authResponseType> => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.code) return { status: "error", error: result.code };
      //IF THE USER LOGS IN THE CODE WILL STILL WORK, IT WILL JUST RETURN EARLIER
      if (result.operationType === "signIn") {
        window.gtag(`event`, `login`, {
          method: "Google",
        });
        return { status: "success", user: result.user };
      }
      console.log(`result`, result);
      const uid = result.user.uid;
      const username = result.user.displayName as string;
      const email = result.user.email as string;
      //creating the user document
      createUserDoc(uid, email, username, "Not Specified", "Bronze");
      //sending the request to set cookie
      const token = await result.user.getIdToken();
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
      return { status: "success", user: result.user };
    } catch (error) {
      return { status: "error", error };
    }
  };

  const authWithFacebook = async (): Promise<authResponseType> => {
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

  return {
    authWithGoogle,
    authWithFacebook,
  };
}
