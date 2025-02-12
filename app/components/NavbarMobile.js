'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

import Link from 'next/link';
import styles from './NavbarMobile.module.css';
import Image from 'next/image';
import NavbarItem from './NavbarItem';
import { logout } from '../components/Auth';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

import { auth } from '../config/firebase';

export default function NavbarMobile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      //   setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/sign-in';
  };

  return (
    <div className={styles.container}>
      <Link className={styles.img_container} href="/">
        <Image src="/barts-movies-high-resolution-logo-transparent (6) copy.png" width={90} height={30} alt="Logo" />
      </Link>

      <div className={styles.links_container}>
        <NavbarItem icon={<SearchIcon fontSize="inherit" />} param="/search" />

        {currentUser ? (
          <NavbarItem
            className={styles.user_icon}
            icon={<AccountCircleIcon fontSize="inherit" />}
            param=""
            onClick={toggleMenu}
            ref={menuRef}
          />
        ) : (
          <NavbarItem icon={<LoginIcon fontSize="inherit" />} param="sign-in" />
        )}
        <NavbarItem
          title="Sign out"
          param="/"
          icon={<LogoutIcon fontSize="inherit" />}
          onClick={handleLogout}
          className={`${styles.sign_out} ${isOpen ? styles.open : ''}`}
        />

        <NavbarItem icon={<MenuIcon fontSize="inherit" />} param="/search" />
      </div>
    </div>
  );
}
