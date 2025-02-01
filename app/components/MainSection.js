'use client';
import ShowCase from './ShowCase';
import { useEffect } from 'react';
import styles from './MainSection.module.css';

export default function MainSection() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <main className={styles.container}>
      <ShowCase type="movie/popular" title="Popular Movies" route="/popular/movies" />
      <ShowCase type="movie/top_rated" title="Top Rated Movies" route="/top-rated/movies" />
      <ShowCase type="trending/tv/day" title="Popular Series" route="/popular/series" />
      <ShowCase type="tv/top_rated" title="Top Rated Series" route="top-rated/series" />
    </main>
  );
}
