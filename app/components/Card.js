// 'use client';
//
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import styles from './Card.module.css';
// import { DEFAULT_SHOW_IMAGE } from '../utilities/config.js';
// import Heart from './Heart';
// import { checkIfFavorite, addToFavorites, removeFromFavorites } from '../helpers/firebaseUtils';
// import { getType, formatTitle, getImageSrc } from '../helpers/mediaUtils';
// import Spinner from './Spinner';
//
// export default function Card({ show, className }) {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [favoriteDocId, setFavoriteDocId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//
//   const type = getType(show.media_type, show.title, show.name);
//   const title = show?.title || show?.name || 'Untitled';
//   const truncatedTitle = formatTitle(title);
//   const releaseDate = show?.release_date || show?.first_air_date || 'Unknown';
//   const year = releaseDate !== 'Unknown' ? new Date(releaseDate).getFullYear() : show.releaseDate || 'N/A';
//   const vote = show?.vote_average ? show.vote_average.toFixed(1) : show?.vote || 'N/A';
//   const imageSrc = getImageSrc(show.media_type, show.profile_path, show.poster_path, show.poster, DEFAULT_SHOW_IMAGE);
//
//   const showId = show.show_id ? show.show_id : show.id;
//
//   useEffect(() => {
//     checkIfFavorite(showId, setIsFavorite, setFavoriteDocId);
//   }, [showId]);
//
//   const handleAddToFavorites = () => {
//     addToFavorites(show, type, year, vote, imageSrc, showId, isFavorite, setIsFavorite, setFavoriteDocId);
//   };
//
//   const handleRemoveFromFavorites = () => {
//     removeFromFavorites(favoriteDocId, setIsFavorite, setFavoriteDocId);
//   };
//
//   const handleImageLoad = () => {
//     setIsLoading(false);
//   };
//
//   return (
//     <div className={`${styles.card} ${className}`}>
//       <Link href={`/${type}/${showId}`}>
//         <div className={styles.image_container}>
//           {isLoading && <Spinner className={styles.spinner} />}
//           <Image
//             src={imageSrc}
//             className={styles.img}
//             width={215}
//             height={330}
//             alt={title}
//             onLoadingComplete={handleImageLoad}
//           />
//         </div>
//         <p className={styles.title}>{truncatedTitle}</p>
//
//         {show.known_for ? (
//           <div className={styles.details_person_container}>
//             <p>{show.known_for_department}</p>
//           </div>
//         ) : (
//           <div className={styles.details_show_container}>
//             <p>
//               <span>⭐️ </span>
//               {vote}
//             </p>
//             <p>{year}</p>
//           </div>
//         )}
//       </Link>
//       {!show.known_for && (
//         <Heart
//           handleAddToFavorites={handleAddToFavorites}
//           handleRemoveFromFavorites={handleRemoveFromFavorites}
//           isFavorite={isFavorite}
//           className={styles.heart}
//         />
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Card.module.css';
import { DEFAULT_SHOW_IMAGE } from '../utilities/config.js';
import Heart from './Heart';
import { checkIfFavorite, addToFavorites, removeFromFavorites } from '../helpers/firebaseUtils';
import { getType, formatTitle, getImageSrc } from '../helpers/mediaUtils';
import Spinner from './Spinner';

export default function Card({ show, className }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteDocId, setFavoriteDocId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const type = getType(show.media_type, show.title, show.name);
  const title = show?.title || show?.name || 'Untitled';
  const truncatedTitle = formatTitle(title);
  const releaseDate = show?.release_date || show?.first_air_date || 'Unknown';
  const year = releaseDate !== 'Unknown' ? new Date(releaseDate).getFullYear() : show.releaseDate || 'N/A';
  const vote = show?.vote_average ? show.vote_average.toFixed(1) : show?.vote || 'N/A';
  const imageSrc = getImageSrc(show.media_type, show.profile_path, show.poster_path, show.poster, DEFAULT_SHOW_IMAGE);

  const showId = show.show_id ? show.show_id : show.id;

  useEffect(() => {
    checkIfFavorite(showId, setIsFavorite, setFavoriteDocId);
  }, [showId]);

  const handleAddToFavorites = () => {
    addToFavorites(show, type, year, vote, imageSrc, showId, isFavorite, setIsFavorite, setFavoriteDocId);
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(favoriteDocId, setIsFavorite, setFavoriteDocId);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <Link href={`/${type}/${showId}`}>
        <div className={styles.image_container}>
          {isLoading && <Spinner className={styles.spinner} />}
          <Image
            src={imageSrc}
            className={styles.img}
            width={215}
            height={330}
            alt={title}
            onLoadingComplete={handleImageLoad}
          />
        </div>
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
      {!show.known_for && (
        <Heart
          handleAddToFavorites={handleAddToFavorites}
          handleRemoveFromFavorites={handleRemoveFromFavorites}
          isFavorite={isFavorite}
          className={`${styles.heart} ${isFavorite ? styles.heartVisible : ''}`}
        />
      )}
    </div>
  );
}
