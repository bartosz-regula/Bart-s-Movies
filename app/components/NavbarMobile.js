'use client';

import { useState, useEffect, useCallback } from 'react';

import Link from 'next/link';
import styles from './NavbarMobile.module.css';
import Image from 'next/image';
import NavbarItem from './NavbarItem';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import HamburgerMenu from './HamburgerMenu';
import { auth } from '../config/firebase';

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <Link className={styles.img_container} href="/">
        <Image src="/barts-movies-high-resolution-logo-transparent (6) copy.png" width={110} height={35} alt="Logo" />
      </Link>

      <div className={styles.links_container}>
        <NavbarItem icon={<SearchIcon sx={{ fontSize: 30 }} />} param="/search" />

        <NavbarItem icon={<MenuIcon sx={{ fontSize: 30 }} />} param="#" onClick={toggleMenu} />
      </div>
      <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
}
