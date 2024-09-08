'use client';

import { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import { db, auth } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import Card from '../components/Card';
import Image from 'next/image';

export default function Page() {
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, 'movies');

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setMovieList(filteredData);
      } catch (err) {
        console.error('Error fetching movies: ', err);
      }
    };

    getMovieList();
  }, [movieList]);

  return (
    <div>
      {movieList.map((movie) => (
        <Card key={movie.id} show={movie} />
      ))}
    </div>
  );
}
