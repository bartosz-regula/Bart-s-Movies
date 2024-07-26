'use client';

import Link from 'next/link';
import styles from './Cast.module.css';
import Image from 'next/image';
import { handleScroll } from '../helpers/handleScroll';
import { useRef, useCallback } from 'react';

export default function Cast({ cast }) {
  const containerRef = useRef(null);

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 990);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 990);
  }, []);

  return (
    <div className={styles.cast_container} ref={containerRef}>
      <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
        &lt;
      </button>
      {cast.cast.map((person) => (
        <Link href={`/person/${person.id}`} key={person.id} className={styles.person_box}>
          <Image
            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
            className={styles.person_img}
            alt={person.name}
            width={170}
            height={230}
          />

          <strong>{person.name}</strong>
          <p>{person.character}</p>
          {/* {person.roles && person.roles.length > 0 && (
              <>
                <p>{person.roles[0].character}</p>
                <p>{person.roles[0].episode_count} Episodes</p>
              </>
            )} */}
        </Link>
      ))}
      <button className={`${styles.btn} ${styles.btn_right}`} onClick={handleRightClick}>
        &gt;
      </button>
    </div>
  );
}
