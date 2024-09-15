'use client';

import Image from 'next/image';
import styles from './ShowDetails.module.css';
import { useState, useEffect } from 'react';
import formatList from '../helpers/formatList';
import { DEFAULT_SHOW_IMAGE } from '../utilities/config.js';
import Heart from './Heart';
import { db } from '../config/firebase';
import { addDoc, deleteDoc, doc, query, where, onSnapshot, serverTimestamp, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const getUserFavoritesCollectionRef = (userIdentifier) => {
  return collection(db, `users/${userIdentifier}/favorites`);
};

const getUserIdentifier = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return user.email;
  }
  return null;
};

export default function ShowDetails({ show, cast }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteDocId, setFavoriteDocId] = useState(null);

  const imageSrc = show.poster_path ? `https://image.tmdb.org/t/p/w300${show.poster_path}` : DEFAULT_SHOW_IMAGE;
  const truncatedTitle = show.title || show.name;
  const release = show.release_date || show.first_air_date;
  const year = release ? new Date(release).getFullYear() : 'N/A';
  const overview = show.overview ? show.overview : `We don't have an overview for ${show.title} yet.`;
  const tagline = show.tagline || '';
  const runtime = show.runtime
    ? `${show.runtime} min`
    : show.episode_run_time?.[0]
      ? `${show.episode_run_time[0]} min`
      : 'N/A';

  const director =
    cast.crew.find((person) => person.job === 'Director')?.name ||
    show.created_by?.find((person) => person.name)?.name ||
    'N/A';
  const numberOfSeasons = show.number_of_seasons;
  const vote = show.vote_average && show.vote_average.toFixed(1) !== '0.0' ? show.vote_average.toFixed(1) : 'N/A';

  const showId = show.show_id ? show.show_id : show.id;

  const checkIfFavorite = () => {
    const userIdentifier = getUserIdentifier();
    if (!userIdentifier) return;

    const favoritesCollectionRef = getUserFavoritesCollectionRef(userIdentifier);
    const q = query(favoritesCollectionRef, where('show_id', '==', showId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        setIsFavorite(true);
        setFavoriteDocId(docId);
      } else {
        setIsFavorite(false);
        setFavoriteDocId(null);
      }
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    checkIfFavorite();
  }, [showId]);

  const handleAddToFavorites = async () => {
    const userIdentifier = getUserIdentifier();
    if (!userIdentifier || isFavorite) return;

    const favoritesCollectionRef = getUserFavoritesCollectionRef(userIdentifier);

    try {
      const dataToAdd = {
        releaseDate: year,
        vote: vote,
        poster: imageSrc,
        timestamp: serverTimestamp(),
        type: show.title ? 'movie' : 'series',
        show_id: show.id,
        title: show.title || show.name,
      };

      const docRef = await addDoc(favoritesCollectionRef, dataToAdd);
      setIsFavorite(true);
      setFavoriteDocId(docRef.id);
    } catch (err) {
      console.error('Error adding to favorites:', err);
    }
  };

  const handleRemoveFromFavorites = async () => {
    const userIdentifier = getUserIdentifier();
    if (!userIdentifier || !isFavorite || !favoriteDocId) return;

    const favoritesCollectionRef = getUserFavoritesCollectionRef(userIdentifier);

    try {
      await deleteDoc(doc(favoritesCollectionRef, favoriteDocId));
      setIsFavorite(false);
      setFavoriteDocId(null);
    } catch (err) {
      console.error('Error removing from favorites:', err);
    }
  };

  return (
    <div className={styles.show_details}>
      <div>
        <Image
          src={imageSrc}
          width={300}
          height={450}
          alt={show.profile_path ? truncatedTitle : 'No Poster Available'}
        />
      </div>
      <div className={styles.text_container}>
        <h2 className={styles.title}>
          {truncatedTitle} {''}
          <span className={styles.year}>({year})</span>
        </h2>
        <div className={styles.genres}>
          <ul>
            {show.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <Heart
            className={styles.heart}
            handleAddToFavorites={handleAddToFavorites}
            handleRemoveFromFavorites={handleRemoveFromFavorites}
            isFavorite={isFavorite}
          />
          <p>⭐️ {vote}</p>
        </div>
        <h3 className={styles.tagline}>{tagline}</h3>
        <div className={styles.overview}>
          <h4>Overview</h4>
          <p>{overview}</p>
        </div>
        <div className={styles.details_container}>
          <ul>
            <li>
              <strong>Director:</strong> {director}
            </li>
            {numberOfSeasons && (
              <li>
                <strong>Number of seasons:</strong> {numberOfSeasons}
              </li>
            )}
            <li>
              <strong>Runtime:</strong> {runtime}
            </li>
            <li>
              <strong>Language: </strong>
              {formatList(show.spoken_languages, (language) => language.name)}
            </li>
            <li>
              <strong>Production: </strong>
              {formatList(show.production_countries, (country) => country.name)}
            </li>
          </ul>
          <ul>
            <li>
              <strong>Release Date:</strong> {release}
            </li>
            <li>
              <strong>Popularity:</strong> {show.popularity || 'N/A'}
            </li>
            <li>
              <strong>Vote Count:</strong> {show.vote_count || 'N/A'}
            </li>
            <li>
              <strong>Entities: </strong>
              {formatList(show.production_companies, (company) => company.name)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
