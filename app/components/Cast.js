'use client';

import Link from 'next/link';
import styles from './Cast.module.css';
import Image from 'next/image';
import ButtonArrow from './ButtonArrow';
import { handleScroll } from '../helpers/handleScroll';
import { useRef, useState, useEffect, useCallback } from 'react';

export default function Cast({ cast }) {
  const containerRef = useRef(null);

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 1000);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 1000);
  }, []);

  return (
    <div className={styles.cast_container} ref={containerRef}>
      <ButtonArrow additionalClass="btn_cast_l" onClick={handleLeftClick}>
        &lt;
      </ButtonArrow>
      {cast.cast.map((actor) => (
        <Link href={`/person/${actor.id}`} key={actor.id} className={styles.actor_box}>
          <Image
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            className={styles.actor_img}
            alt={actor.name}
            width={170}
            height={230}
          />

          <strong>{actor.name}</strong>
          <p>{actor.character}</p>
          {/* {actor.roles && actor.roles.length > 0 && (
              <>
                <p>{actor.roles[0].character}</p>
                <p>{actor.roles[0].episode_count} Episodes</p>
              </>
            )} */}
        </Link>
      ))}
      <ButtonArrow additionalClass="btn_cast_r" onClick={handleRightClick}>
        &gt;
      </ButtonArrow>
    </div>
  );
}
