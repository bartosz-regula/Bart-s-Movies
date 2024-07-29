'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './PersonData.module.css';
import { DEFAULT_PERSON_IMAGE } from '../utilities/config,js';

export default function PersonData({ person }) {
  const [showFullBiography, setShowFullBiography] = useState(false);

  const name = person.name;
  const known_for = person.known_for_department ? person.known_for_department : 'N/A';
  const gender = person.gender === 2 ? 'Male' : person.gender === 1 ? 'Female' : 'N/A';
  const birthday = person.birthday ? person.birthday : 'N/A';
  const birth_place = person.place_of_birth ? person.place_of_birth : 'N/A';
  const biographyFull = person.biography ? person.biography : `We don't have a biography for ${person.name} yet.`;
  const deathday = person.deathday;
  const biography = biographyFull.split('\n\n');
  const biographyToShow = showFullBiography ? biography : biography.slice(0, 2);

  return (
    <div className={styles.container}>
      <Image
        src={person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : DEFAULT_PERSON_IMAGE}
        alt={person.profile_path ? person.name : 'No Poster Available'}
        width={300}
        height={450}
      />

      <div className={styles.text_container}>
        <h2 className={styles.person_name}>{name}</h2>
        <div className={styles.biography_container}>
          <strong>Biography</strong>
          {biographyToShow.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {biography.length > 2 && (
            <button onClick={() => setShowFullBiography(!showFullBiography)}>
              {showFullBiography ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
        <div className={styles.details_container}>
          <ul>
            <li>
              <strong>Birthday:</strong> {birthday}
            </li>
            <li>
              <strong>Place of Birth:</strong> {birth_place}
            </li>
            {deathday && (
              <li>
                <strong>Deathday:</strong> {deathday}
              </li>
            )}
          </ul>

          <ul>
            <li>
              <strong>Known for:</strong> {known_for}
            </li>
            <li>
              <strong>Gender:</strong> {gender}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
