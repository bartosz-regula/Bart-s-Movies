'use client';

import styles from './ExploreMore.module.css';
import Card from './Card';
import { useState } from 'react';
import { useFetchExploreMore } from '../hooks/useFetchExploreMore';
import { useScrollTop } from '../hooks/useScrollTop.js';
import ProtectedRoute from './ProtectedRoute';
import CardContainer from './CardContainer';

export default function ExploreMore({ showType, header }) {
  const [page, setPage] = useState(1);
  const { movies, loading, totalPages } = useFetchExploreMore(showType, page);
  const { isVisible } = useScrollTop({ loading, page, totalPages, setPage });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ProtectedRoute>
      <h2 className={styles.header}>{header}</h2>
      <CardContainer>
        {movies.map((movie) => (
          <Card key={movie.id} show={movie} className={styles.card} />
        ))}

        {isVisible && (
          <button className={styles.button_up} onClick={scrollToTop}>
            Up
          </button>
        )}
      </CardContainer>
    </ProtectedRoute>
  );
}
