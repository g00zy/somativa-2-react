import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = 
{
  apiKey: "AIzaSyDkEBAeqzMA-vamEx_nA8V5G9ALclZGB-s",
  authDomain: "somativa-2-react.firebaseapp.com",
  projectId: "somativa-2-react",
  storageBucket: "somativa-2-react.firebasestorage.app",
  messagingSenderId: "433703669693",
  appId: "1:433703669693:web:3717e31503bbb890e98cd4"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };