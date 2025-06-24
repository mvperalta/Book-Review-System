// frontend/src/firebase.js
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBAKU4ryJXnyskMObtoH1FwqBqvcjk_uX8",
  authDomain: "book-review-820a3.firebaseapp.com",
  projectId: "book-review-820a3",
  storageBucket: "book-review-820a3.firebasestorage.app",
  messagingSenderId: "631395289130",
  appId: "1:631395289130:web:199e6e0bed5b7bab0a1b53"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider, signInWithPopup, signOut }
