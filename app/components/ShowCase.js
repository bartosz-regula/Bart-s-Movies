'use client';

import styles from './ShowCase.module.css';
import Card from './Card';
import ButtonArrow from './ButtonArrow';
import { handleScroll } from '../helpers/handleScroll';
import { useRef, useState, useEffect, useCallback } from 'react';

export default function ShowCase({ type, title }) {
  const [shows, setShows] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch shows');
        }
        const data = await response.json();
        setShows(data.results || []);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, [type]);

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 1180);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 1180);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <button>Explore More</button>
      </div>

      <div className={styles.show_list} ref={containerRef}>
        <ButtonArrow additionalClass="btn_show_case_l" onClick={handleLeftClick}>
          &lt;
        </ButtonArrow>
        {shows.map((show) => (
          <Card key={show.id} show={show} />
        ))}
        <ButtonArrow additionalClass="btn_show_case_r" onClick={handleRightClick}>
          &gt;
        </ButtonArrow>
      </div>
    </div>
  );
}
