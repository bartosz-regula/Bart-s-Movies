'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ModalVideo from './ModalVideo';
import Link from 'next/link';
import handleKeyPress from '../helpers/handleKeyPress';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { notify } from '../helpers/notify';
import { AiFillYoutube } from 'react-icons/ai';
import { checkIfFavorite, addToFavorites, removeFromFavorites } from '../helpers/firebaseUtils';
import Loading from '../loading';

export default function Hero() {
  const [movies, setMovies] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isFavorite, setIsFavorite] = useState({});
  const [favoriteDocId, setFavoriteDocId] = useState({});
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const closeModal = () => {
    setActiveVideo(null);
  };

  useEffect(() => {
    const keyPressHandler = (event) => {
      handleKeyPress(event, activeVideo, closeModal);
    };

    window.addEventListener('keydown', keyPressHandler);

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [activeVideo]);

  const handleVideoClick = async (index) => {
    setActiveVideo(null);
    const movieId = movies[index].id;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      setActiveVideo(data.results[0].key);
    } else {
      setActiveVideo(null);
    }

    setVideos(data.results);
  };

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const data = await res.json();
      setMovies(data.results);
    }

    fetchMovies();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        movies.forEach((movie) => {
          checkIfFavorite(
            movie.id,
            (status) => {
              setIsFavorite((prevState) => ({
                ...prevState,
                [movie.id]: status,
              }));
            },
            (docId) => {
              setFavoriteDocId((prevState) => ({
                ...prevState,
                [movie.id]: docId,
              }));
            }
          );
        });
      } else {
        setIsFavorite({});
        setFavoriteDocId({});
      }
    });

    return () => unsubscribe();
  }, [movies, auth]);

  const notifyAddFavorites = () => {
    notify('Added To Favorites', 'success');
  };

  const handleAddToFavorites = (index) => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    const movie = movies[index];
    const type = 'movie';
    const year = movie.release_date ? movie.release_date.split('-')[0] : 'Unknown';
    const vote = movie.vote_average && movie.vote_average.toFixed(1) !== '0.0' ? movie.vote_average.toFixed(1) : 'N/A';
    const imageSrc = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : '/path/to/default-image.jpg';
    const showId = movie.id;

    addToFavorites(
      movie,
      type,
      year,
      vote,
      imageSrc,
      showId,
      isFavorite[movie.id],
      (status) => setIsFavorite((prevState) => ({ ...prevState, [movie.id]: status })),
      (docId) => setFavoriteDocId((prevState) => ({ ...prevState, [movie.id]: docId }))
    );
    notifyAddFavorites();
  };

  const notifyRemoveFavorites = () => {
    notify('Removed From Favorites', 'error');
  };

  const handleRemoveFromFavorites = (index) => {
    const movie = movies[index];
    const docId = favoriteDocId[movie.id];

    if (docId) {
      removeFromFavorites(docId, (status) => {
        setIsFavorite((prevState) => ({
          ...prevState,
          [movie.id]: false,
        }));
        setFavoriteDocId((prevState) => {
          const newState = { ...prevState };
          delete newState[movie.id];
          return newState;
        });
      });
      notifyRemoveFavorites();
    }
  };

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <div className={styles.hero}>
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        swipeable={true}
        dynamicHeight={false}
        emulateTouch={true}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={styles.slide}
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,1) 5%,  rgba(0,0,0,0) ), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
              backgroundSize: 'cover',
            }}
          >
            <div className={styles.text_container}>
              <Link href={`/movie/${movie.id}`}>
                <h1>{movie.title}</h1>
                <p>
                  {movie.overview
                    ? movie.overview.length > 300
                      ? `${movie.overview.slice(0, movie.overview.slice(0, 300).lastIndexOf(' '))}...`
                      : movie.overview
                    : `We don't have an overview for ${movie.title} yet.`}
                </p>
              </Link>
              <div className={styles.buttons_container}>
                <span className={styles.btn_trailer_container}>
                  <AiFillYoutube size={28} />
                  <button className={`${styles.btn_trailer} ${styles.btn}`} onClick={() => handleVideoClick(index)}>
                    TRAILER
                  </button>
                </span>
                {isFavorite[movie.id] ? (
                  <button
                    className={`${styles.btn_favorite} ${styles.btn}`}
                    onClick={() => handleRemoveFromFavorites(index)}
                  >
                    REMOVE FROM FAVORITES
                  </button>
                ) : (
                  <button
                    className={`${styles.btn_favorite} ${styles.btn}`}
                    onClick={() => handleAddToFavorites(index)}
                  >
                    ADD TO FAVORITES
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {activeVideo && <ModalVideo videos={activeVideo} closeModal={closeModal} />}
    </div>
  );
}
