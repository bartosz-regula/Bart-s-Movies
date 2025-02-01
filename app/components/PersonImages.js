'use client';

import styles from './PersonImages.module.css';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import ModalImage from './ModalImage';
import handleKeyPress from '../helpers/handleKeyPress';
import checkButtonsVisibility from '../helpers/checkButtonsVisibility';
import { handleScroll } from '../helpers/handleScroll';
import { handleImageClick, handleNextImage, handlePrevImage } from '../helpers/imageHandlers';
import { disableScroll } from '../helpers/disableScroll';
import Spinner from './Spinner';

export default function PersonImages({ images }) {
  const containerRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [edgeReached, setEdgeReached] = useState({ left: false, right: false });

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 1020);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 1020);
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
    checkEdge(); // check the edge on load

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
    if (containerRef.current) {
      if (activeImage !== null) {
        containerRef.current.classList.add(styles.hiddenOverflow);
      } else {
        containerRef.current.classList.remove(styles.hiddenOverflow);
      }
    }
  }, [activeImage]);

  useEffect(() => {
    disableScroll(activeImage !== null);
    return () => {
      disableScroll(false);
    };
  }, [activeImage]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!images?.profiles?.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Posters</h2>
      <ul
        className={`${styles.container_images} ${images.profiles.length < 6 ? styles.justify_content : ''}`}
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
        {images.profiles.map((image, index) => (
          <li key={index}>
            {isLoading && <Spinner className={styles.spinner} />}
            <div className={styles.image_container}>
              <Image
                className={styles.image}
                src={`https://image.tmdb.org/t/p/w300${image.file_path}`}
                width={180}
                height={260}
                onClick={() => handleImageClick(index, setActiveImage)}
                alt={`Image ${index}`}
                onLoadingComplete={handleImageLoad}
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
