'use client';

import Card from './Card';
import styles from './SearchResults.module.css';
import { useScrollTop } from '../hooks/useScrollTop.js';

export default function SearchResults({ results, loading, page, totalPages, setPage }) {
  const { isVisible } = useScrollTop({ loading, page, totalPages, setPage });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.container}>
      {results.map((show) => (
        <Card key={show.id} show={show} />
      ))}

      {isVisible && (
        <button className={styles.button_up} onClick={scrollToTop}>
          Up
        </button>
      )}
    </div>
  );
}
