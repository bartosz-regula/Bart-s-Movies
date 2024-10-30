import { auth, googleProvider } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

export const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {}
};

export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (resetEmail) => {
  try {
    await sendPasswordResetEmail(auth, resetEmail);
  } catch (err) {
    console.error('Error sending password reset email:', err);
  }
};
