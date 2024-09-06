'use client';

import { useState, useEffect } from 'react';
import Header from './components/Hero';
import MainSection from './components/MainSection';
import Auth from './components/Auth';
import { db, auth } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

export default function Home() {
  const [movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const moviesCollectionRef = collection(db, 'movies');

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      //   console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await deleteDoc(movieDoc);
  };

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(filteredData);
        setMovieList(filteredData);
      } catch (err) {
        // console.error(err);
      }
    };

    getMovieList();
  }, [onSubmitMovie]);

  return (
    <div>
      <Header />
      {/* <MainSection /> */}
      <Auth />

      <div>
        <input placeholder="Movie Title..." onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? 'green' : 'red' }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
          </div>
        ))}
      </div>
    </div>
  );
}
