'use client';

import NavbarItem from './NavbarItem';
import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import LoginIcon from '@mui/icons-material/Login';
import { logout } from '../components/Auth';
import { NavbarLinks } from './NavbarLinks';
import { UserMenu } from './NavbarUser';
import Spinner from './Spinner';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = currentUser ? (currentUser.displayName ? currentUser.displayName.split(' ')[0] : currentUser.email) : '';

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className={styles.navbar}>
      <NavbarLinks />

      {isLoading ? (
        <Spinner className={styles.spinner} />
      ) : currentUser ? (
        <UserMenu user={user} logout={logout} />
      ) : (
        <NavbarItem
          title="Sign in"
          param="/sign-in"
          className={styles.sign_in}
          icon={<LoginIcon fontSize="inherit" />}
        />
      )}
    </nav>
  );
}
