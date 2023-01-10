import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import axios from "axios";


import { Router, useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth, createUserDoc, db } from '../firebase'
import { verifyEmail } from '../model/server-side/sendEmail';



const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const resBody = await verifyEmail(userCredential.user.email as string)
      createUserDoc(userCredential.user.uid, email, username, 'Not Specified', 'Free')
      return resBody
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false)
    }
  }
  const signIn = async (email: string, password: string) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password).then(() => router.push('/'))
      .catch((err) => alert(err.message)).finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)
    signOut(auth).then(() => router.push('/login')).catch((err) => console.log(err)).finally(() => setLoading(false))

  }
  return { signUp, signIn, logout, loading }
}
export default useAuth
