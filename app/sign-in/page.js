'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { FcGoogle } from 'react-icons/fc';
import AccountContainer from '../components/AccountContainer';
import AccountBox from '../components/AccountBox';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import { signInWithEmail, signInWithGoogle } from '../components/Auth';
import { testAccountCredentials } from '../helpers/testAccountCredentials';
import { useAccountValidation } from '../hooks/useAccountValidation';
import AccountButton from '../components/AccountButton';
import OrSeparator from '../components/OrSeparator';
import AccountActionParagraph from '../components/AccountActionParagraph';
import Link from 'next/link';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signInError, setSignInError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { validateEmail, validateSignInPassword } = useAccountValidation();

  const router = useRouter();

  const handleEmailSignIn = async () => {
    setIsSubmitted(true);

    const emailErrorMessage = validateEmail(email);
    const passwordErrorMessage = validateSignInPassword(password);

    setEmailError(emailErrorMessage);
    setPasswordError(passwordErrorMessage);

    if (!emailErrorMessage && !passwordErrorMessage) {
      try {
        await signInWithEmail(email, password);
        router.push('/');
      } catch (error) {
        const errorMessage = 'Email or password is incorrect';
        setSignInError(errorMessage);
        setPasswordError(errorMessage);
      }
    } else {
      setSignInError('');
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    router.push('/');
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
      setPasswordError(inputPassword ? validateSignInPassword(inputPassword) : '');
    }

    if (!inputPassword) {
      setSignInError('');
    }
  };

  const handleTestAccountSignIn = () => {
    testAccountCredentials(setEmail, setPassword);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEmailSignIn();
    }
  };

  return (
    <AccountContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEmailSignIn();
        }}
      >
        <AccountBox>
          <>
            <EmailInput value={email} onChange={handleEmailChange} error={emailError} />
            <PasswordInput
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              placeholder="Password"
            />
          </>
          <Link href="/forgot-password" className={styles.forgot_password}>
            Forgot password?
          </Link>
          <AccountButton type="submit" className={styles.btn_signIn}>
            Sign In
          </AccountButton>
          <OrSeparator />
          <AccountButton className={styles.btn_google} onClick={handleGoogleSignIn}>
            <FcGoogle className={styles.btn_google_icon} /> Sign In with Google
          </AccountButton>

          <AccountActionParagraph link={'/sign-up'} actionText={'SignUp'}>
            Don't have an account?
          </AccountActionParagraph>
        </AccountBox>
      </form>
      <div>
        <AccountButton className={styles.btn_test_login} onClick={handleTestAccountSignIn}>
          FOR TEST LOGIN PLEASE CLICK HERE
        </AccountButton>
      </div>
    </AccountContainer>
  );
}
