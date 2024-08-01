'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './PersonShowsContainer.module.css';
import { handleScroll } from '../helpers/handleScroll';
import { DEFAULT_SHOW_IMAGE } from '../utilities/config.js';
import { useRef, useCallback } from 'react';

export default function PersonShowContainer({ show }) {
  const containerRef = useRef(null);
  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 1020);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 1020);
  }, []);

  return (
    <div>
      <ul className={styles.container} ref={containerRef}>
        <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
          &lt;
        </button>
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
        <button className={`${styles.btn} ${styles.btn_right}`} onClick={handleRightClick}>
          &gt;
        </button>
      </ul>
    </div>
  );
}
