import Image from 'next/image';
import styles from './ShowDetails.module.css';
import formatList from '../helpers/formatList';

export default function ShowDetails({ show }) {
  const title = show.title || show.name;
  const release = show.release_date || show.first_air_date;
  const year = show.release ? new Date(show.release).getFullYear() : 'N/A';
  const overview = show.overview ? show.overview : `We don't have an overview for ${show.title} yet.`;
  const tagline = show.tagline || '';
  const runtime = show.runtime ? `${show.runtime} min` : show.episode_run_time ? `${show.episode_run_time} min` : 'N/A';
  const displayVote = show.vote_average ? show.vote_average.toFixed(1) : 'N/A';

  return (
    <div className={styles.showDetails}>
      <Image
        src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
        width={300}
        height={450}
        alt={`${title} poster`}
      />
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>Vote:</strong> {displayVote} ⭐️
      </p>
      <ul>
        {show.genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      <p>
        <strong>Year:</strong> {year}
      </p>
      <p>Director?</p>
      <p>
        <strong>Overview:</strong> {overview}
      </p>
      <p>
        <strong>Tagline:</strong> {tagline}t
      </p>
      <p>
        <strong>Runtime:</strong> {runtime}
      </p>
      <p>
        <strong>Language:</strong>
        {formatList(show.spoken_languages, (language) => language.name)}
      </p>
      <p>
        <strong>Release Date:</strong> {release}
      </p>
      <p>
        <strong>Production:</strong>
        {formatList(show.production_countries, (country) => country.name)}
      </p>
      <p>
        <strong>Popularity:</strong> {show.popularity || 'N/A'}
      </p>
      <p>
        <strong>Vote Count:</strong> {show.vote_count || 'N/A'}
      </p>
      <p>
        <strong>Production Companies:</strong>
        {formatList(show.production_companies, (company) => company.name)}
      </p>
    </div>
  );
}
