'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CardRated.module.css';
import { DEFAULT_SHOW_IMAGE } from '../utilities/config.js';
import { checkIfRated } from '../helpers/firebaseUtils.js';
import { getType, formatTitle, getImageSrc } from '../helpers/mediaUtils.js';
import StarCard from './StarCard';

export default function CardRated({ show, className }) {
  const [isRated, setIsRated] = useState(false);
  const [ratedDocId, setRatedDocId] = useState(null);

  const type = getType(show.media_type, show.title, show.name);
  const title = show?.title || show?.name || 'Untitled';
  const truncatedTitle = formatTitle(title);
  const year = show.year || 'N/A';
  const vote = show?.vote_average ? show.vote_average.toFixed(1) : show?.vote || 'N/A';
  const imageSrc = getImageSrc(show.media_type, show.profile_path, show.poster_path, show.poster, DEFAULT_SHOW_IMAGE);

  const showId = show.show_id ? show.show_id : show.id;

  useEffect(() => {
    checkIfRated(showId, setIsRated, setRatedDocId);
  }, [showId]);

  return (
    <div className={`${styles.card} ${className}`}>
      <Link href={`/${type}/${showId}`}>
        <Image src={imageSrc} className={styles.img} width={215} height={330} alt={title} />
        <p className={styles.title}>{truncatedTitle}</p>

        {show.known_for ? (
          <div className={styles.details_person_container}>
            <p>{show.known_for_department}</p>
          </div>
        ) : (
          <div className={styles.details_show_container}>
            <p>
              <span>⭐️ </span>
              {vote}
            </p>
            <p>{year}</p>
          </div>
        )}
      </Link>
      <StarCard number={show.rating} className={styles.star} />
    </div>
  );
}
