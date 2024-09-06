import Link from 'next/link';
import Image from 'next/image';
import styles from './Card.module.css';
import { DEFAULT_PERSON_IMAGE, DEFAULT_SHOW_IMAGE } from '../utilities/config.js';
import Heart from './Heart';

export default function Card({ show }) {
  const typeMap = {
    movie: 'movie',
    tv: 'series',
    person: 'person',
  };

  const type = typeMap[show.media_type] || (show.title ? 'movie' : show.name ? 'series' : 'unknown');
  const title = show?.title || show?.name || 'Untitled';
  const truncatedTitle = title.length > 24 ? title.slice(0, 24) + '...' : title;
  const releaseDate = show?.release_date || show?.first_air_date || 'Unknown';
  const year = releaseDate !== 'Unknown' ? new Date(releaseDate).getFullYear() : 'N/A';
  const vote = show?.vote_average ? show.vote_average.toFixed(1) : 'N/A';

  const imageSrc =
    show.media_type === 'person'
      ? show.profile_path
        ? `https://image.tmdb.org/t/p/w500${show.profile_path}`
        : DEFAULT_PERSON_IMAGE
      : show.poster_path
        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
        : DEFAULT_SHOW_IMAGE;

  return (
    <Link href={`/${type}/${show.id}`}>
      <div className={styles.card}>
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
            <Heart className={styles.heart} />
          </div>
        )}
      </div>
    </Link>
  );
}
