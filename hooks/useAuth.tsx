import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import axios from "axios";

import { Router, useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, createUserDoc, db } from "../firebase";
import { verifyEmail } from "../model/server-side/sendEmail";
import { FirebaseError } from "firebase-admin";
import { authResponseType } from "../constants/login/types";

const useAuth = (): [
  (
    email: string,
    password: string,
    username: string
  ) => Promise<authResponseType>,
  (email: string, password: string) => Promise<authResponseType>,
  () => Promise<void>,
  boolean
] => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signUp = async (
    email: string,
    password: string,
    username: string
  ): Promise<authResponseType> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const resBody = await verifyEmail(userCredential.user.email as string);
      createUserDoc(userCredential.user.uid, email, username, "Not Specified");
      if (resBody.status === 200) {
        window.gtag(`event`, `sign_up`, {
          method: "Aftin",
        });
        return { status: `success`, user: userCredential };
      } else {
        return { status: "error", error: resBody };
      }
    } catch (error) {
      return { status: `error`, error };
    } finally {
      setLoading(false);
    }
  };
  const signIn = async (
    email: string,
    password: string
  ): Promise<authResponseType> => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        setLoading(false);
        window.gtag(`event`, `login`, {
          method: "Aftin",
        });
        return { status: "success", user: userCredential };
      } else {
        return { status: "error", error: userCredential.code };
      }
    } catch (error) {
      setLoading(false);
      return { status: "error", error };
    }
  };

  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => router.push("/login"))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return [signUp, signIn, logout, loading];
};
export default useAuth;
