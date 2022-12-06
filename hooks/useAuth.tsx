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
import { Cookies } from 'next/dist/server/web/spec-extension/cookies';

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => { },
  signIn: async () => { },
  logout: async () => { },
  error: null,
  loading: false
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        createUserDoc(userCredential.user.uid, email, username, 'Not Specified', 'Free')
        const uid = userCredential.user.uid
        axios.post('/api/login', { 'uid': uid })
        router.push('/')
      })
      .catch((error) => console.log(error))
  }

  const signIn = async (email: string, password: string,) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid
        axios.post('/api/login', { 'uid': uid })

      }).then(()=>router.push('/'))
      .catch((err) => alert(err.message)).finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)

    signOut(auth).then(() => {
      axios.post("/api/logout", {})

      router.push('/login')

    })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(() => ({
    user, signUp, signIn, loading, logout, error
  }), [user, loading])

  return (
    <AuthContext.Provider value={memoedValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}