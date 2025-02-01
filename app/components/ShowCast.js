'use client';

import Link from 'next/link';
import styles from './ShowCast.module.css';
import Image from 'next/image';
import { handleScroll } from '../helpers/handleScroll';
import { useState, useEffect, useRef, useCallback } from 'react';
import checkButtonsVisibility from '../helpers/checkButtonsVisibility';

import { DEFAULT_PERSON_IMAGE } from '../utilities/config.js';
import Spinner from './Spinner';

export default function ShowCast({ cast }) {
  const containerRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [edgeReached, setEdgeReached] = useState({ left: false, right: false }); //toooooo

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 990);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 990);
  }, []);

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
    checkButtonsVisibility(containerRef, setShowButtons);

    const resizeHandler = () => checkButtonsVisibility(containerRef, setShowButtons);

    window.addEventListener('resize', resizeHandler);
    checkEdge(); // check the edge on load

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [cast]);

  useEffect(() => {
    const container = containerRef.current;
    const handleScrollEvent = () => {
      checkEdge();
    };

    container.addEventListener('scroll', handleScrollEvent);
    return () => container.removeEventListener('scroll', handleScrollEvent);
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!cast?.cast?.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Cast</h2>
      <div
        className={`${styles.cast_container} ${cast.cast.length < 6 ? styles.justify_content : ''}`}
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
        {cast.cast.map((person) => (
          <Link href={`/person/${person.id}`} key={person.id} className={styles.person_box}>
            {isLoading && <Spinner className={styles.spinner} />}
            <div className={styles.img_container}>
              <Image
                src={
                  person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : DEFAULT_PERSON_IMAGE
                }
                className={styles.person_img}
                alt={person.name}
                width={170}
                height={230}
                onLoad={handleImageLoad}
              />
            </div>
            <div className={styles.name_box}>
              <strong>{person.name}</strong>
              <p>{person.character}</p>
              {person.roles && person.roles.length > 0 && (
                <>
                  <p>{person.roles[0].character}</p>
                  <p>{person.roles[0].episode_count} Episodes</p>
                </>
              )}
            </div>
          </Link>
        ))}
        {showButtons && (
          <button
            className={`${styles.btn} ${styles.btn_right} ${edgeReached.right ? styles.btn_edge : ''}`}
            onClick={handleRightClick}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}
