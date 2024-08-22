'use client';

import { useState, useEffect } from 'react';
import Card from './Card';
import styles from './ExploreMore.module.css';

export default function ExploreMore({ showType }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}${showType}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setTotalPages(data.total_pages);

        setMovies((prevMovies) => {
          const combinedMovies = [...prevMovies, ...data.results];
          const uniqueMovies = combinedMovies.filter(
            (movie, index, self) => self.findIndex((m) => m.id === movie.id) === index
          );
          return uniqueMovies;
        });

        setLoading(false);
      } catch (error) {
        console.error('Downloading Error ', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, showType]);

  const handleScroll = () => {
    if (document.documentElement.scrollHeight - (window.innerHeight + document.documentElement.scrollTop) < 100) {
      if (!loading && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, totalPages, loading]);

  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Card key={movie.id} show={movie} />
      ))}
    </div>
  );
}
