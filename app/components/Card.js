import Link from 'next/link';
import Image from 'next/image';
import styles from './Card.module.css';
import { DEFAULT_PERSON_IMAGE } from '../utilities/config.js';
import { DEFAULT_SHOW_IMAGE } from '../utilities/config.js';

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
  const shouldRenderDetails = () => ['movie', 'tv'].includes(show.media_type);

  const imageSrc =
    show.media_type === 'person'
      ? show.profile_path
        ? `https://image.tmdb.org/t/p/w500${show.profile_path}`
        : DEFAULT_PERSON_IMAGE
      : show.poster_path
        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
        : DEFAULT_SHOW_IMAGE;

  console.log('Typ mediów:', show.media_type, 'Typ:', type);

  return (
    <Link href={`/${type}/${show.id}`}>
      <div className={styles.card}>
        <Image src={imageSrc} className={styles.img} width={215} height={330} alt={title} />
        <p className={styles.title}>{truncatedTitle}</p>
        {shouldRenderDetails() && (
          <div className={styles.details_container}>
            <p>{year}</p>
            <p>
              <span>⭐️ </span>
              {vote}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
