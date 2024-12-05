'use client';
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import CardRated from '../components/CardRated';
import ProtectedRoute from '../components/ProtectedRoute';
import CardContainer from '../components/CardContainer';
import styles from './page.module.css';
import ScrollToTopButton from '../components/ScrollToTopButton';
import NoTitlesAdded from '../components/NoTitlesAdded';

const getUserIdentifier = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return user.email;
  }
  return null;
};

export default function Page() {
  const [movieList, setMovieList] = useState([]);
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const userIdentifier = getUserIdentifier();
      if (userIdentifier) {
        const ratedCollectionRef = collection(db, `users/${userIdentifier}/rated`);
        const q = query(ratedCollectionRef, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const filteredData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMovieList(filteredData);
        });

        return () => unsubscribe();
      }
    }
  }, [user]);

  return (
    <ProtectedRoute>
      {movieList.length > 0 ? (
        <>
          <h2 className={styles.header}>Favorites</h2>
          <CardContainer>
            {movieList.map((movie) => (
              <CardRated key={movie.id} show={movie} className={styles.card} setRating={setRating} />
            ))}
          </CardContainer>
        </>
      ) : (
        <NoTitlesAdded text="Your Rated list is empty. Why don't you add something in here? " />
      )}
      <ScrollToTopButton />
    </ProtectedRoute>
  );
}
