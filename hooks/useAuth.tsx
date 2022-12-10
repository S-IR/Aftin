import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import axios from "axios";


import { Router, useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth, createUserDoc, db } from '../firebase'



const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        createUserDoc(userCredential.user.uid, email, username, 'Not Specified', 'Free')
        const token = await userCredential.user.getIdToken()
        await fetch('/api/login', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json', token
          })
        })
      }).then(() => router.push('/'))
      .catch((err) => alert(err.message)).finally(() => setLoading(false))
  }
  const signIn = async (email: string, password: string) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken()

        await fetch('/api/login', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json', token
          })
        })
      }).then(() => router.push('/'))
      .catch((err) => alert(err.message)).finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)
    signOut(auth).then(async () => {
      await fetch('/api/logout', {
        method: 'POST'
      })
    }).then(() => router.push('/login'))
      .catch((err) => alert(err.message)).finally(() => setLoading(false))
  }

  return { signUp, signIn, logout, loading }
}
export default useAuth
