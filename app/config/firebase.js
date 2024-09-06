import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBRayAOVrOBHd6yv7DmnhSo6P1tS9uBxC4',
  authDomain: 'barts-movies-4bff8.firebaseapp.com',
  projectId: 'barts-movies-4bff8',
  storageBucket: 'barts-movies-4bff8.appspot.com',
  messagingSenderId: '866082091426',
  appId: '1:866082091426:web:f467e8b1be336c55e682fb',
  measurementId: 'G-5GQRQXREQ3',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
