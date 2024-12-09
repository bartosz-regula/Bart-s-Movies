'use client';

import Image from 'next/image';
import styles from './ShowDetails.module.css';
import { useState, useEffect } from 'react';
import formatList from '../helpers/formatList';
import { DEFAULT_SHOW_IMAGE } from '../utilities/config.js';
import Heart from './Heart';
import StarRating from './StarRating';
import { getType } from '../helpers/mediaUtils';
import {
  checkIfFavorite,
  checkIfRated,
  addToFavorites,
  addToRated,
  removeFromFavorites,
  removeFromRated,
} from '../helpers/firebaseUtils';

export default function ShowDetails({ show, cast, providers }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteDocId, setFavoriteDocId] = useState(null);
  const [isRated, setIsRated] = useState(false);
  const [ratedDocId, setRatedDocId] = useState(null);
  const [rating, setRating] = useState(0);

  const imageSrc = show.poster_path ? `https://image.tmdb.org/t/p/w300${show.poster_path}` : DEFAULT_SHOW_IMAGE;
  const type = getType(show.media_type, show.title, show.name);

  const truncatedTitle = show.title || show.name;
  const release = show.release_date || show.first_air_date;
  const year = release ? new Date(release).getFullYear() : 'N/A';
  const overview = show.overview ? show.overview : `We don't have an overview for ${show.title} yet.`;
  const tagline = show.tagline || '';

  const runtime = show.runtime;

  const director =
    cast.crew.find((person) => person.job === 'Director')?.name ||
    show.created_by?.find((person) => person.name)?.name ||
    'N/A';
  const numberOfSeasons = show.number_of_seasons;
  const vote = show.vote_average && show.vote_average.toFixed(1) !== '0.0' ? show.vote_average.toFixed(1) : 'N/A';

  const showId = show.show_id ? show.show_id : show.id;

  const region = 'PL';

  const streamingProviders = providers?.results?.[region]?.flatrate || [];
  const buyProviders = providers?.results?.[region]?.buy || [];

  useEffect(() => {
    checkIfFavorite(showId, setIsFavorite, setFavoriteDocId);
  }, [showId]);

  useEffect(() => {
    checkIfRated(showId, setIsRated, setRatedDocId, setRating);
  }, [showId]);

  const handleAddToFavorites = () => {
    addToFavorites(show, type, year, vote, imageSrc, showId, isFavorite, setIsFavorite, setFavoriteDocId);
  };

  const handleAddToRated = () => {
    addToRated(show, type, year, vote, rating, imageSrc, showId, isRated, setIsRated, setRatedDocId);
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(favoriteDocId, setIsFavorite, setFavoriteDocId);
  };

  const handleRemoveFromRated = () => {
    removeFromRated(ratedDocId, setIsRated, setRatedDocId);
  };

  return (
    <div className={styles.show_details}>
      <div>
        <Image
          src={imageSrc}
          width={300}
          height={450}
          alt={show.profile_path ? truncatedTitle : 'No Poster Available'}
        />
      </div>
      <div className={styles.text_container}>
        <h2 className={styles.title}>
          {truncatedTitle} {''}
          <span className={styles.year}>({year})</span>
        </h2>
        <div className={styles.genres}>
          <ul>
            {show.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <Heart
            className={styles.heart}
            handleAddToFavorites={handleAddToFavorites}
            handleRemoveFromFavorites={handleRemoveFromFavorites}
            isFavorite={isFavorite}
          />
          <p>⭐️ {vote}</p>
        </div>
        {!isRated ? (
          <div className={styles.rating_container}>
            <StarRating rating={rating} setRating={setRating} />
            {rating !== 0 && (
              <button className={`${styles.btn} ${styles.btn_add}`} onClick={handleAddToRated}>
                ADD TO RATED
              </button>
            )}
          </div>
        ) : (
          <div className={styles.rating_container}>
            <button className={`${styles.btn} ${styles.btn_remove}`} onClick={handleRemoveFromRated}>
              Remove from rated <span className={styles.rating}>⭐️{rating}</span>
            </button>
          </div>
        )}

        <h3 className={styles.tagline}>{tagline}</h3>
        <div className={styles.overview}>
          <h4>Overview</h4>
          <p>{overview}</p>
        </div>
        <div className={styles.details_container}>
          <ul>
            <li>
              <strong>Director:</strong> {director}
            </li>
            {numberOfSeasons && (
              <li>
                <strong>Number of seasons:</strong> {numberOfSeasons}
              </li>
            )}
            {runtime && (
              <li>
                <strong>Runtime:</strong> {runtime} min
              </li>
            )}
            <li>
              <strong>Language: </strong>
              {formatList(show.spoken_languages, (language) => language.name)}
            </li>
            <li>
              <strong>Production: </strong>
              {formatList(show.production_countries.slice(0, 4), (country) => country.name)}
            </li>
            <li>
              <strong>Available on streaming: </strong>
              {streamingProviders.length === 0 && 'Currently unavailable'}

              <ul className={styles.providers}>
                {streamingProviders.length > 0 &&
                  streamingProviders.map((provider) => (
                    <li key={provider.provider_id}>
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                        alt={provider.provider_name}
                        width={40}
                        height={40}
                      />
                    </li>
                  ))}
              </ul>
            </li>
          </ul>

          <ul>
            <li>
              <strong>Release Date:</strong> {release}
            </li>
            <li>
              <strong>Popularity:</strong> {show.popularity || 'N/A'}
            </li>
            <li>
              <strong>Vote Count:</strong> {show.vote_count || 'N/A'}
            </li>
            <li>
              <strong>Entities: </strong>
              {formatList(show.production_companies.slice(0, 2), (company) => company.name)}
            </li>
            <li>
              <strong>Available for Buy/Rent: </strong>
              {buyProviders.length === 0 && 'Currently unavailable'}
              <ul className={styles.providers}>
                {buyProviders.length > 0 &&
                  buyProviders.map((provider) => (
                    <li key={provider.provider_id}>
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                        alt={provider.provider_name}
                        width={40}
                        height={40}
                      />
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
