import axios from "axios";
import {
  FacebookAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { authResponseType } from "../constants/login/types";
import { auth, createUserDoc } from "../firebase";
import { verifyEmail } from "../model/server-side/sendEmail";

export default function useAuthThirdParty() {
  const authWithGoogle = async (): Promise<authResponseType> => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("result.operationType", result.operationType);
      if (result.code) return { status: "error", error: result.code };
      const isNewUser = getAdditionalUserInfo(result)?.isNewUser || false;
      //IF THE USER LOGS IN THE CODE WILL STILL WORK, IT WILL JUST RETURN EARLIER
      if (!isNewUser) {
        window.gtag(`event`, `login`, {
          method: "Google",
        });
        return { status: "success", user: result.user, isNewUser: false };
      }
      const emailRes = await verifyEmail(result.user.email as string);
      if (emailRes.status === 500) {
        return {
          status: "error",
          error: "Verification email server is not responding",
        };
      }
      const uid = result.user.uid;
      const username = result.user.displayName as string;
      const email = result.user.email as string;
      //creating the user document
      createUserDoc(uid, email, username, "bronze");
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
      return { status: "success", user: result.user, isNewUser: true };
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
      return { status: "success", user: user.user };
    } catch (error) {
      return { status: "error", error };
    }
  };

  const authWithPinterest = async (): Promise<authResponseType> => {
    //TODO
    const auth = getAuth();
    let user: User;
    return { status: "success", user };
  };
  return [authWithGoogle, authWithFacebook, authWithPinterest];
}
