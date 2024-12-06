'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './PersonShowsContainer.module.css';
import { handleScroll } from '../helpers/handleScroll';
import { DEFAULT_SHOW_IMAGE } from '../utilities/config.js';
import { useState, useRef, useEffect, useCallback } from 'react';
import checkButtonsVisibility from '../helpers/checkButtonsVisibility';

export default function PersonShowContainer({ show, header }) {
  if (!show?.length) {
    return null;
  }
  const containerRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 1020);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 1020);
  }, []);

  useEffect(() => {
    checkButtonsVisibility(containerRef, setShowButtons);

    const resizeHandler = () => checkButtonsVisibility(containerRef, setShowButtons);

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [show]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{header}</h2>
      <ul ref={containerRef}>
        {showButtons && (
          <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
            &lt;
          </button>
        )}
        {show.map((item) => {
          const title = item.title || item.name;
          const type = item.title ? 'movie' : 'series';
          const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : DEFAULT_SHOW_IMAGE;

          return (
            <li key={item.id}>
              <Link href={`/${type}/${item.id}`}>
                <Image src={imageUrl} alt={title ? title : 'No Poster Available'} width={180} height={260} />
                <h3>{title.length > 24 ? title.slice(0, 24) + '...' : title}</h3>
              </Link>
            </li>
          );
        })}
        {showButtons && (
          <button className={`${styles.btn} ${styles.btn_right}`} onClick={handleRightClick}>
            &gt;
          </button>
        )}
      </ul>
    </div>
  );
}
