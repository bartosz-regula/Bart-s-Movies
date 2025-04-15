'use client';

import styles from './HamburgerMenu.module.css';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import NavbarItem from './NavbarItem';
import LoginIcon from '@mui/icons-material/Login';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { auth } from '../config/firebase';
import { logout } from '../components/Auth';
import Image from 'next/image';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

const navItems = [
  { title: 'Home', param: '/', icon: <HomeOutlinedIcon fontSize="inherit" /> },
  { title: 'Movies', param: '/movie', icon: <LocalMoviesIcon fontSize="inherit" /> },
  { title: 'Series', param: '/series', icon: <MovieFilterOutlinedIcon fontSize="inherit" /> },
  { title: 'Favorites', param: '/favorites', icon: <FavoriteBorderIcon fontSize="inherit" /> },
  { title: 'Rated', param: '/rated', icon: <StarBorderIcon fontSize="inherit" /> },
  { title: 'Search', param: '/search', icon: <SearchIcon fontSize="inherit" /> },
];

export default function HamburgerMenu({ isOpen, toggleMenu }) {
  const [currentUser, setCurrentUser] = useState(null);
  const menuRef = useRef(null);

  const user = currentUser ? (currentUser.displayName ? currentUser.displayName.split(' ')[0] : currentUser.email) : '';

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    toggleMenu();
    await logout();
    window.location.href = '/sign-in';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleMenu]);

  useEffect(() => {
    const menuEl = menuRef.current;

    const stopTouchPropagation = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };

    if (menuEl) {
      menuEl.addEventListener('touchmove', stopTouchPropagation, { passive: false });
    }

    return () => {
      if (menuEl) {
        menuEl.removeEventListener('touchmove', stopTouchPropagation);
      }
    };
  }, []);

  return (
    <div ref={menuRef} className={`${styles.hamburger_container} ${isOpen ? styles.open : ''}`}>
      <CloseIcon fontSize="large" className={styles.close_icon} onClick={toggleMenu} />
      <Image
        src="/barts-movies-high-resolution-logo-transparent (6) copy.png"
        width={110}
        height={35}
        alt="Logo"
        className={styles.image}
      />

      {currentUser && (
        <NavbarItem
          icon={<AccountCircleIcon fontSize="inherit" />}
          param=""
          fontSize="inherit"
          title={user}
          onClick={toggleMenu}
          className={styles.user}
        />
      )}

      <div className={styles.menu}>
        {!currentUser && (
          <NavbarItem
            icon={<LoginIcon fontSize="inherit" />}
            title="SIGN IN"
            param="sign-in"
            fontSize="inherit"
            onClick={toggleMenu}
            classNameTitle={styles.menu_item}
            classNameIcon={styles.menu_icon}
          />
        )}

        {navItems.map((item, index) => (
          <NavbarItem
            key={index}
            title={item.title}
            param={item.param}
            icon={item.icon}
            onClick={toggleMenu}
            classNameTitle={styles.menu_item}
            classNameIcon={styles.menu_icon}
          />
        ))}

        {currentUser && (
          <NavbarItem
            title="Sign out"
            param="/"
            icon={<LogoutIcon fontSize="inherit" />}
            onClick={handleLogout}
            fontSize="inherit"
            classNameTitle={styles.menu_item}
            classNameIcon={styles.menu_icon}
          />
        )}
      </div>

      <div className={styles.bottom_container}>
        <ul className={styles.socials_container}>
          <li>
            <Link href="https://www.linkedin.com/in/bartosz-regula/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon fontSize="inherit" />
            </Link>
          </li>
          <li>
            <Link href="https://github.com/bartosz-regula/Bart-s-Movies" target="_blank" rel="noopener noreferrer">
              <GitHubIcon fontSize="inherit" />
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/barreg_/" target="_blank" rel="noopener noreferrer">
              <InstagramIcon fontSize="inherit" />
            </Link>
          </li>
        </ul>
        <p>Copyright © {currentYear} by Bart&apos;s Movies, Inc. All rights reserved.</p>
      </div>
    </div>
  );
}
