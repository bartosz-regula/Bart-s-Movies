'use client';

import NavbarItem from './NavbarItem';
import styles from './Navbar.module.css';
import Link from 'next/link';
import SearchBox from './SearchBox';
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.navbar}>
      <Link href="/">
        <h2>LOGO</h2>
      </Link>
      <NavbarItem title="Movies" param="/movies" />
      <NavbarItem title="Series" param="/series" />
      <NavbarItem title="Favorites" param="/favorites" />
      <NavbarItem title="Rated" param="/rated" />

      <div>
        {/* Wyświetlanie aktualnie zalogowanego użytkownika */}
        {currentUser ? (
          <p>Logged in as: {currentUser.displayName || currentUser.email}</p> // Wyświetla nazwę lub email użytkownika.
        ) : (
          <p>Not logged in</p> // Komunikat, gdy użytkownik nie jest zalogowany.
        )}
      </div>
      <SearchBox />
    </div>
  );
}
