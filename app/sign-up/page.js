'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import AccountActionParagraph from '../components/AccountActionParagraph';
import AccountBox from '../components/AccountBox';
import AccountButton from '../components/AccountButton';
import AccountContainer from '../components/AccountContainer';
import EmailInput from '../components/EmailInput';
import OrSeparator from '../components/OrSeparator';
import PasswordInput from '../components/PasswordInput';
import { FcGoogle } from 'react-icons/fc';
import { signUpWithEmailAndPassword, signInWithGoogle } from '../components/Auth';
import { useAccountValidation } from '../hooks/useAccountValidation';
import AccountHeader from '../components/AccountHeader';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordTimeout, setPasswordTimeout] = useState(null);

  const router = useRouter();
  const { validateEmail, validateSignUpPassword } = useAccountValidation();

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
    setPasswordError('');

    if (passwordTimeout) clearTimeout(passwordTimeout);

    const newTimeout = setTimeout(() => {
      const passwordValidationError = validateSignUpPassword(inputPassword);
      setPasswordError(passwordValidationError);
    }, 800);

    setPasswordTimeout(newTimeout);
  };

  const handleSignUp = async () => {
    setConfirmPasswordError('');
    setEmailError('');
    setPasswordError('');
    setIsSubmitted(true);

    const emailErrorMessage = validateEmail(email);
    if (emailErrorMessage) {
      setEmailError(emailErrorMessage);
      return;
    }

    const passwordValidationError = validateSignUpPassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await signUpWithEmailAndPassword(email, password);
      if (userCredential) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error during sign up:', error);

      if (error.code === 'auth/email-already-in-use') {
        setEmailError('This email is already registered. Please use a different email or sign in.');
      } else {
        setEmailError('Error creating account. Please check your details.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    router.push('/');
  };

  return (
    <AccountContainer>
      <AccountBox>
        <AccountHeader className={styles.header}>Create an Account</AccountHeader>
        <EmailInput value={email} onChange={handleEmailChange} error={emailError} placeholder="Email" />
        <PasswordInput
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          placeholder="Password"
          validationMessage="Password must be at least 8 characters long."
        />
        <PasswordInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          placeholder="Confirm Password"
        />
        <AccountButton className={styles.btn_signUp} onClick={handleSignUp}>
          Sign Up
        </AccountButton>
        <OrSeparator />
        <AccountButton className={styles.btn_google} onClick={handleGoogleSignIn}>
          <FcGoogle className={styles.btn_google_icon} />
          Sign Up with Google
        </AccountButton>
        <AccountActionParagraph link={'/sign-in'} actionText="SignIn">
          Already have an account?
        </AccountActionParagraph>
      </AccountBox>
    </AccountContainer>
  );
}
