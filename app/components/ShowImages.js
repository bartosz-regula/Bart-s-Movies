'use client';

import Image from 'next/image';
import styles from './ShowImages.module.css';
import { handleScroll } from '../helpers/handleScroll';
import { useRef, useCallback } from 'react';

export default function ShowImages({ images }) {
  const containerRef = useRef(null);

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 976.5);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 976.5);
  }, []);

  return (
    <div className={styles.images_container} ref={containerRef}>
      <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
        &lt;
      </button>
      {images.map((image, index) => (
        <Image
          key={index}
          className={styles.images}
          src={`https://image.tmdb.org/t/p/w300${image.file_path}`}
          alt={`Image ${index}`}
          width={301}
          height={170}
        />
      ))}
      <button className={`${styles.btn} ${styles.btn_right}`} onClick={handleRightClick}>
        &gt;
      </button>
    </div>
  );
}
