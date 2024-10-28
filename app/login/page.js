'use client';

import { auth, googleProvider } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const forbiddenCharactersPattern = /[^a-zA-Z0-9@._-]/;
    if (forbiddenCharactersPattern.test(email)) {
      return 'Email contains forbidden characters.';
    }
    if (!email.includes('@')) return 'Email must contain an "@" symbol.';
    const [localPart, domain] = email.split('@');
    if (!localPart) return 'Email must have a local part before the "@" symbol.';
    if (!domain) return 'Email is missing the domain part after the "@" symbol.';
    if (!domain.includes('.') || domain.endsWith('.') || domain.split('.').length < 2) {
      return 'Domain must include a valid TLD (e.g., .com, .net).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) ? '' : 'Email is not valid.';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password cannot be empty.';
    return '';
  };

  const login = async () => {
    setIsSubmitted(true);

    const emailErrorMessage = validateEmail(email);
    const passwordErrorMessage = validatePassword(password);

    setEmailError(emailErrorMessage);
    setPasswordError(passwordErrorMessage);

    if (!emailErrorMessage && !passwordErrorMessage) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/');
      } catch (err) {
        console.error('Login error:', err);
        if (password) {
          setLoginError('Login or password is incorrect.');
        } else {
          setLoginError('');
        }
      }
    } else {
      setLoginError('');
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (isSubmitted) {
      setEmailError(inputEmail ? validateEmail(inputEmail) : '');
    }
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (isSubmitted) {
      setPasswordError(inputPassword ? validatePassword(inputPassword) : '');
    }

    if (!inputPassword) {
      setLoginError('');
    }
  };

  const testAccountCredentials = () => {
    setEmail('test@barts-movies.com');
    setPassword('bartsmovies');
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <Image
          className={styles.logo}
          src="/barts-movies-high-resolution-logo-transparent (6) copy.png"
          width={150}
          height={50}
        />
        <>
          <input
            className={`${styles.input} ${isSubmitted && emailError ? styles.input_error : ''}`}
            placeholder="Email"
            onChange={handleEmailChange}
            value={email}
          />
          {isSubmitted && emailError && <p className={styles.error_message}>{emailError}</p>}

          <div className={`${styles.password_input_box} ${isSubmitted && passwordError ? styles.input_error : ''}`}>
            <input
              className={`${styles.input} ${styles.password_input}`}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={handlePasswordChange}
              value={password}
            />
            <button
              className={styles.btn_eye}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {isSubmitted && passwordError && <p className={styles.error_message}>{passwordError}</p>}

          {loginError && <p className={styles.error_message}>{loginError}</p>}
        </>

        <p className={styles.forgot_password}>Forgot password?</p>
        <button className={styles.btn} onClick={login}>
          Sign In
        </button>
        <div className={styles.or}>
          <span>OR</span>
        </div>
        <button
          className={`${styles.btn} ${styles.btn_google}`}
          onClick={() =>
            signInWithPopup(auth, googleProvider)
              .then(() => router.push('/'))
              .catch(console.error)
          }
        >
          <FcGoogle className={styles.btn_google_icon} />
          Sign in with Google
        </button>
        <div className={styles.sign_up_container}>
          <p>
            Don't have an account? <span className={styles.sign_up}>SignUp</span>
          </p>
        </div>
      </div>
      <div>
        <button className={`${styles.btn} ${styles.btn_test}`} onClick={testAccountCredentials}>
          FOR TEST LOGIN PLEASE CLICK HERE
        </button>
      </div>
    </div>
  );
}
