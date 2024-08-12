'use client';

import styles from './PersonImages.module.css';
import Image from 'next/image';
import { handleScroll } from '../helpers/handleScroll';
import { useRef, useCallback } from 'react';

export default function PersonImages({ images }) {
  const containerRef = useRef(null);
  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 1020);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 1020);
  }, []);

  return (
    <ul className={styles.container} ref={containerRef}>
      <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
        &lt;
      </button>
      {images.profiles.map((image) => (
        <li key={image.index}>
          <Image
            className={styles.image}
            src={`https://image.tmdb.org/t/p/w300${image.file_path}`}
            width={180}
            height={270}
            alt="image"
          />
        </li>
      ))}
      <button className={`${styles.btn} ${styles.btn_right}`} onClick={handleRightClick}>
        &gt;
      </button>
    </ul>
  );
}
