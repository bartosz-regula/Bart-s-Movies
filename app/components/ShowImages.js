'use client';

import Image from 'next/image';
import styles from './ShowImages.module.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import ModalImage from './ModalImage';
import handleKeyPress from '../helpers/handleKeyPress';
import checkButtonsVisibility from '../helpers/checkButtonsVisibility';
import { handleScroll } from '../helpers/handleScroll';
import { handleImageClick, handleNextImage, handlePrevImage } from '../helpers/imageHandlers';
import { disableScroll } from '../helpers/disableScroll';
import Spinner from './Spinner';

export default function ShowImages({ images }) {
  const containerRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [edgeReached, setEdgeReached] = useState({ left: false, right: false }); //toooooo

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 976.5);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 976.5);
  }, []);

  const closeModal = () => {
    setActiveImage(null);
  };

  const checkEdge = () => {
    const container = containerRef.current;
    const isAtStart = container.scrollLeft === 0;
    const margin = 1;
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - margin;
    setEdgeReached({
      left: isAtStart,
      right: isAtEnd,
    });
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
    checkEdge();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [images]);

  useEffect(() => {
    const container = containerRef.current;
    const handleScrollEvent = () => {
      checkEdge();
    };

    container.addEventListener('scroll', handleScrollEvent);
    return () => container.removeEventListener('scroll', handleScrollEvent);
  }, []);

  useEffect(() => {
    disableScroll(activeImage !== null);
    return () => {
      disableScroll(false);
    };
  }, [activeImage]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!images?.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Posters</h2>
      <ul
        className={`${styles.images_container} ${images.length < 4 ? styles.justify_content : ''}`}
        ref={containerRef}
      >
        {showButtons && (
          <button
            className={`${styles.btn} ${styles.btn_left} ${edgeReached.left ? styles.btn_edge : ''}`}
            onClick={handleLeftClick}
          >
            &lt;
          </button>
        )}
        {images.map((image, index) => (
          <li key={index}>
            {isLoading && <Spinner className={styles.spinner} />}
            <div className={styles.image_box}>
              <Image
                key={index}
                className={styles.image}
                src={`https://image.tmdb.org/t/p/w300${image.file_path}`}
                alt={`Image ${index}`}
                width={301}
                height={170}
                onLoadingComplete={handleImageLoad}
                onClick={() => handleImageClick(index, setActiveImage)}
              />
            </div>
          </li>
        ))}
        {showButtons && (
          <button
            className={`${styles.btn} ${styles.btn_right} ${edgeReached.right ? styles.btn_edge : ''}`}
            onClick={handleRightClick}
          >
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
