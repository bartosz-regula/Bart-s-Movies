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
  const [favoriteDocId, setFavoriteDocId] = useState(null); // Przechowuje ID dokumentu, aby móc usunąć film z ulubionych

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

  // Funkcja sprawdzająca, czy film jest w ulubionych
  const checkIfFavorite = async () => {
    const q = query(moviesCollectionRef, where('title', '==', truncatedTitle));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id; // Pobierz ID dokumentu, który odpowiada filmowi
      setIsFavorite(true);
      setFavoriteDocId(docId); // Zapisz ID dokumentu
    } else {
      setIsFavorite(false);
      setFavoriteDocId(null); // Wyzeruj ID dokumentu
    }
  };

  // Sprawdzenie, czy film jest ulubionym po załadowaniu komponentu
  useEffect(() => {
    checkIfFavorite();
  }, []);

  // Funkcja dodająca film do ulubionych
  const handleAddToFavorites = async () => {
    try {
      if (!isFavorite) {
        const docRef = await addDoc(moviesCollectionRef, {
          title: truncatedTitle,
          releaseDate: year,
          vote: vote,
          poster: imageSrc,
        });
        setIsFavorite(true);
        setFavoriteDocId(docRef.id); // Zapisz ID nowo dodanego dokumentu
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Funkcja usuwająca film z ulubionych
  const handleRemoveFromFavorites = async () => {
    try {
      if (isFavorite && favoriteDocId) {
        await deleteDoc(doc(db, 'movies', favoriteDocId)); // Usunięcie dokumentu na podstawie ID
        setIsFavorite(false);
        setFavoriteDocId(null); // Wyzeruj ID po usunięciu
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
        handleRemoveFromFavorites={handleRemoveFromFavorites} // Przekazanie funkcji usuwania
        isFavorite={isFavorite} // Przekazanie stanu ulubionego
        className={styles.heart}
      />
    </div>
  );
}
