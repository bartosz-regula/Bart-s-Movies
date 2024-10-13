'use client';
import { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import { db } from '../config/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import CardRated from '../components/CardRated';

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

  if (!user) {
    return <Auth />;
  }

  return (
    <div>
      {movieList.length > 0 ? (
        movieList.map((movie) => <CardRated key={movie.id} show={movie} />)
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
}
