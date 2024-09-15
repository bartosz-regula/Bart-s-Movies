'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Card.module.css';
import { DEFAULT_SHOW_IMAGE } from '../utilities/config.js';
import Heart from './Heart';
import {
  checkIfFavorite,
  checkIfWatched,
  addToFavorites,
  removeFromFavorites,
  removeFromWatched,
} from '../helpers/firebaseUtils';
import { getType, formatTitle, getImageSrc } from '../helpers/mediaUtils';

export default function Card({ show }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteDocId, setFavoriteDocId] = useState(null);
  const [isWatched, setIsWatched] = useState(false);
  const [watchedDocId, setWatchedDocId] = useState(null);

  const type = getType(show.media_type, show.title, show.name);
  const title = show?.title || show?.name || 'Untitled';
  const truncatedTitle = formatTitle(title);
  const releaseDate = show?.release_date || show?.first_air_date || 'Unknown';
  const year = releaseDate !== 'Unknown' ? new Date(releaseDate).getFullYear() : show.releaseDate || 'N/A';
  const vote = show?.vote_average ? show.vote_average.toFixed(1) : show?.vote || 'N/A';
  const imageSrc = getImageSrc(show.media_type, show.profile_path, show.poster_path, show.poster, DEFAULT_SHOW_IMAGE);

  const showId = show.show_id ? show.show_id : show.id;

  useEffect(() => {
    checkIfFavorite(showId, setIsFavorite, setFavoriteDocId);
    checkIfWatched(showId, setIsWatched, setWatchedDocId);
  }, [showId]);

  const handleAddToFavorites = () => {
    addToFavorites(show, type, year, vote, imageSrc, showId, isFavorite, setIsFavorite, setFavoriteDocId);
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(favoriteDocId, setIsFavorite, setFavoriteDocId);
  };

  const handleRemoveFromWatched = () => {
    removeFromWatched(watchedDocId, setIsWatched, setWatchedDocId);
  };

  return (
    <div className={styles.card}>
      <Link href={`/${type}/${showId}`}>
        <Image src={imageSrc} className={styles.img} width={215} height={330} alt={title} />
        <p className={styles.title}>{truncatedTitle}</p>

        {show.known_for ? (
          <div className={styles.details_person_container}>
            <p>{show.known_for_department}</p>
          </div>
        ) : (
          <div className={styles.details_show_container}>
            <p>
              <span>⭐️ </span>
              {vote}
            </p>
            <p>{year}</p>
          </div>
        )}
      </Link>
      <button onClick={handleRemoveFromWatched}>Delete</button>
      <Heart
        handleAddToFavorites={handleAddToFavorites}
        handleRemoveFromFavorites={handleRemoveFromFavorites}
        isFavorite={isFavorite}
        className={styles.heart}
      />
    </div>
  );
}
