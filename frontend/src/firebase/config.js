import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDHY44XBQcbBh57Nq7srLWt-C6XnQyWylc",
  authDomain: "medicare-ai-58a47.firebaseapp.com",
  projectId: "medicare-ai-58a47",
  storageBucket: "medicare-ai-58a47.firebasestorage.app",
  messagingSenderId: "466319747774",
  appId: "1:466319747774:web:359563687985adb7054cef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);