import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { doc, getDoc } from "firebase/firestore"; 

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth, createUserDoc, db } from '../firebase'

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
        setUser(userCredential.user)

        localStorage.setItem('user_id', userCredential.user.uid)
        localStorage.setItem('login_mode', email)
        localStorage.setItem('username', username)

        router.push('/')
      }).catch((error)=> console.log(error))
  }

  const signIn = async (email: string, password: string, ) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setUser(userCredential.user)
        const docSnap  = await getDoc(doc(db, 'users', userCredential.user.uid));
        const userData = docSnap.data()
        const username = userData?.username
        const email = userData?.email
        
        localStorage.setItem('user_id', userCredential.user.uid)
        localStorage.setItem('login_mode', email)
        localStorage.setItem('username', username)

        router.push('/')
        setLoading(false)
      }).catch((err) => alert(err.message)).finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)

    signOut(auth).then(() => {
      setUser(null)
        router.push('/')

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