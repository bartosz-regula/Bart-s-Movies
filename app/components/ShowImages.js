'use client';

import Image from 'next/image';
import styles from './ShowImages.module.css';
import ButtonArrow from './ButtonArrow';
import { handleScroll } from '../helpers/handleScroll';
import { useRef, useCallback } from 'react';

export default function ShowImages({ images }) {
  const containerRef = useRef(null);

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 975);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 975);
  }, []);

  return (
    <div className={styles.images_container} ref={containerRef}>
      <ButtonArrow additionalClass="btn_images_l" onClick={handleLeftClick}>
        &lt;
      </ButtonArrow>
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
      <ButtonArrow additionalClass="btn_images_r" onClick={handleRightClick}>
        &gt;
      </ButtonArrow>
    </div>
  );
}
