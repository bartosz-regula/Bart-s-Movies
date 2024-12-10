'use client';

import Image from 'next/image';
import styles from './ShowImages.module.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import ModalImage from './ModalImage';
import handleKeyPress from '../helpers/handleKeyPress';
import checkButtonsVisibility from '../helpers/checkButtonsVisibility';
import { handleScroll } from '../helpers/handleScroll';
import { handleImageClick, handleNextImage, handlePrevImage } from '../helpers/imageHandlers';

export default function ShowImages({ images }) {
  if (!images?.length) {
    return null;
  }
  const containerRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 976.5);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 976.5);
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
        () => handlePrevImage(images, activeImage, setActiveImage),
        () => handleNextImage(images, activeImage, setActiveImage)
      );
    };

    window.addEventListener('keydown', keyPressHandler);

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [activeImage, images]);

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
      <ul className={styles.images_container} ref={containerRef}>
        {showButtons && (
          <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
            &lt;
          </button>
        )}
        {images.map((image, index) => (
          <li key={index}>
            <Image
              key={index}
              className={styles.images}
              src={`https:image.tmdb.org/t/p/w300${image.file_path}`}
              alt={`Image ${index}`}
              width={301}
              height={170}
              onClick={() => handleImageClick(index, setActiveImage)}
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
          images={images}
          activeImage={activeImage}
          totalImages={images.length}
          currentIndex={activeImage}
          closeModal={() => setActiveImage(null)}
          handleNextImage={() => handleNextImage(images, activeImage, setActiveImage)}
          handlePrevImage={() => handlePrevImage(images, activeImage, setActiveImage)}
        />
      )}
    </div>
  );
}
