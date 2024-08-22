'use client';

import Link from 'next/link';
import styles from './ShowCast.module.css';
import Image from 'next/image';
import { handleScroll } from '../helpers/handleScroll';
import { useState, useEffect, useRef, useCallback } from 'react';
import checkButtonsVisibility from '../helpers/checkButtonsVisibility';

import { DEFAULT_PERSON_IMAGE } from '../utilities/config.js';

export default function ShowCast({ cast }) {
  const containerRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 990);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 990);
  }, []);

  useEffect(() => {
    checkButtonsVisibility(containerRef, setShowButtons);

    const resizeHandler = () => checkButtonsVisibility(containerRef, setShowButtons);

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [cast]);

  return (
    <div className={styles.cast_container} ref={containerRef}>
      {showButtons && (
        <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
          &lt;
        </button>
      )}
      {cast.cast.map((person) => (
        <Link href={`/person/${person.id}`} key={person.id} className={styles.person_box}>
          <Image
            src={person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : DEFAULT_PERSON_IMAGE}
            className={styles.person_img}
            alt={person.name}
            width={170}
            height={230}
          />

          <strong>{person.name}</strong>
          <p>{person.character}</p>
          {person.roles && person.roles.length > 0 && (
            <>
              <p>{person.roles[0].character}</p>
              <p>{person.roles[0].episode_count} Episodes</p>
            </>
          )}
        </Link>
      ))}
      {showButtons && (
        <button className={`${styles.btn} ${styles.btn_right}`} onClick={handleRightClick}>
          &gt;
        </button>
      )}
    </div>
  );
}
