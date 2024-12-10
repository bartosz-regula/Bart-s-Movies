'use client';

import styles from './PersonImages.module.css';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import ModalImage from './ModalImage';
import handleKeyPress from '../helpers/handleKeyPress';
import checkButtonsVisibility from '../helpers/checkButtonsVisibility';
import { handleScroll } from '../helpers/handleScroll';
import { handleImageClick, handleNextImage, handlePrevImage } from '../helpers/imageHandlers';

export default function PersonImages({ images }) {
  if (!images?.profiles?.length) {
    return null;
  }
  const containerRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 1020);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 1020);
  }, []);

  const closeModal = () => {
    setActiveImage(null);
  };

  useEffect(() => {
    const keyPressHandler = (event) => {
      handleKeyPress(
        event,
        activeImage,
        closeModal,
        () => handlePrevImage(images.profiles, activeImage, setActiveImage),
        () => handleNextImage(images.profiles, activeImage, setActiveImage)
      );
    };

    window.addEventListener('keydown', keyPressHandler);

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [activeImage, images.profiles]);

  useEffect(() => {
    checkButtonsVisibility(containerRef, setShowButtons);

    const resizeHandler = () => checkButtonsVisibility(containerRef, setShowButtons);

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [images]);

  useEffect(() => {
    if (containerRef.current) {
      if (activeImage !== null) {
        containerRef.current.classList.add(styles.hiddenOverflow);
      } else {
        containerRef.current.classList.remove(styles.hiddenOverflow);
      }
    }
  }, [activeImage]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Posters</h2>
      <ul className={styles.container_images} ref={containerRef}>
        {showButtons && (
          <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
            &lt;
          </button>
        )}
        {images.profiles.map((image, index) => (
          <li key={index}>
            <Image
              className={styles.image}
              src={`https://image.tmdb.org/t/p/w300${image.file_path}`}
              width={180}
              height={270}
              onClick={() => handleImageClick(index, setActiveImage)}
              alt={`Image ${index}`}
            />
          </li>
        ))}
        {showButtons && (
          <button className={`${styles.btn} ${styles.btn_right}`} onClick={handleRightClick}>
            &gt;
          </button>
        )}
      </ul>

      {activeImage !== null && (
        <ModalImage
          images={images.profiles}
          activeImage={activeImage}
          totalImages={images.profiles ? images.profiles.length : images.length}
          currentIndex={activeImage}
          closeModal={() => setActiveImage(null)}
          handleNextImage={() => handleNextImage(images.profiles, activeImage, setActiveImage)}
          handlePrevImage={() => handlePrevImage(images.profiles, activeImage, setActiveImage)}
        />
      )}
    </div>
  );
}
