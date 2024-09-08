import Link from 'next/link';
import Image from 'next/image';
import styles from './Card.module.css';
import { DEFAULT_PERSON_IMAGE, DEFAULT_SHOW_IMAGE } from '../utilities/config.js';
import Heart from './Heart';
import Auth from '../components/Auth';
import { db, auth } from '../config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore'; 
import { useState, useEffect } from 'react';

export default function Card({ show }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const typeMap = {
    movie: 'movie',
    tv: 'series',
    person: 'person',
  };

  const type = typeMap[show.media_type] || (show.title ? 'movie' : show.name ? 'series' : 'unknown');
  const title = show?.title || show?.name || 'Untitled';
  const truncatedTitle = title.length > 24 ? title.slice(0, 24) + '...' : title;
  const releaseDate = show?.release_date || show?.first_air_date || 'Unknown';
  const year = releaseDate !== 'Unknown' ? new Date(releaseDate).getFullYear() : show.releaseDate || 'N/A';
  const vote = show?.vote_average ? show.vote_average.toFixed(1) : show?.vote || 'N/A';

  const imageSrc =
    show.media_type === 'person'
      ? show.profile_path
        ? `https://image.tmdb.org/t/p/w500${show.profile_path}`
        : DEFAULT_PERSON_IMAGE
      : show.poster_path
        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
        : show.poster || DEFAULT_SHOW_IMAGE;

  const moviesCollectionRef = collection(db, 'movies');  
  const checkIfFavorite = async () => {
    const q = query(moviesCollectionRef, where('title', '==', truncatedTitle));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const handleAddToFavorites = async () => {
    try {
      if (!isFavorite) {
        await addDoc(moviesCollectionRef, {
          title: truncatedTitle,
          releaseDate: year,
          vote: vote,
          poster: imageSrc,
        });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.card}>
      <Link href={`/${type}/${show.id}`}>
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
      <Heart
        handleAddToFavorites={handleAddToFavorites}
        isFavorite={isFavorite} 
        className={styles.heart}
      />
    </div>
  );
}
