import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from 'firebase/auth'

export function signUpWithGoogle (){
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider()
  signInWithPopup(auth, googleProvider)
  .then((response) =>{
    console.log(response);
  })
}
export function signUpWithFacebook (){
  const auth = getAuth()
  const facebookProvider = new FacebookAuthProvider()
  signInWithPopup(auth, facebookProvider)
  .then((response) =>{
    console.log(response);
  })

}
