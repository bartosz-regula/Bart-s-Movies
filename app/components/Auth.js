'use client';

import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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

  return (
    <div>
      <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)}></input>
      <input placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)}></input>
      <button onClick={signIn}>Sign in</button>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
