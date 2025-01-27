'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AccountActionParagraph from '../components/AccountActionParagraph';
import AccountBox from '../components/AccountBox';
import AccountButton from '../components/AccountButton';
import AccountContainer from '../components/AccountContainer';
import EmailInput from '../components/EmailInput';
import styles from './page.module.css';
import { resetPassword } from '../components/Auth';
import { useAccountValidation } from '../hooks/useAccountValidation';
import AccountHeader from '../components/AccountHeader';

export default function Page() {
  const [resetEmail, setResetEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();
  const { validateEmail } = useAccountValidation();

  const handleResetPassword = async () => {
    setIsSubmitted(true);

    const emailErrorMessage = validateEmail(resetEmail);
    setEmailError(emailErrorMessage);

    if (emailErrorMessage) {
      return;
    }

    await resetPassword(resetEmail);
    setIsEmailSent(true);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setResetEmail(newEmail);

    if (isSubmitted) {
      const emailErrorMessage = validateEmail(newEmail);
      setEmailError(emailErrorMessage);
    } else {
      setEmailError('');
    }
  };

  const handleGoSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <AccountContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleResetPassword();
        }}
      >
        <AccountBox>
          {!isEmailSent ? (
            <>
              <AccountHeader>Forgot password?</AccountHeader>
              <EmailInput value={resetEmail} onChange={handleEmailChange} error={emailError} />
              <AccountButton className={styles.btn_reset} onClick={handleResetPassword}>
                Reset Password
              </AccountButton>
              <AccountActionParagraph link={'/sign-in'} actionText={'Sign In'}>
                Remember your password?
              </AccountActionParagraph>
            </>
          ) : (
            <>
              <AccountHeader>We've sent a password reset link to your email.</AccountHeader>
              <AccountButton onClick={handleGoSignIn}>OK</AccountButton>
            </>
          )}
        </AccountBox>
      </form>
    </AccountContainer>
  );
}
