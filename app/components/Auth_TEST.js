'use client';

import { auth, googleProvider } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState(''); // Nowy stan dla e-maila do resetowania hasła
  const router = useRouter();

  // Funkcja do rejestracji (tworzenie nowego konta)
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  // Funkcja do logowania (istniejące konto)
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  // Funkcja do resetowania hasła
  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Password reset email sent!');
    } catch (err) {
      console.error('Error sending password reset email:', err);
    }
  };

  return (
    <div>
      <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Log in</button> {/* Przycisk do logowania */}
      <button onClick={register}>Create Account</button> {/* Przycisk do rejestracji */}
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={logout}>Logout</button>
      {/* Sekcja resetowania hasła */}
      <div>
        <h3>Reset your password</h3>
        <input placeholder="Enter your email to reset password..." onChange={(e) => setResetEmail(e.target.value)} />
        <button onClick={resetPassword}>Reset Password</button> {/* Przycisk do resetowania hasła */}
      </div>
    </div>
  );
}
