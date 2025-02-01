'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './PersonDetails.module.css';
import { DEFAULT_PERSON_IMAGE } from '../utilities/config.js';
import Spinner from './Spinner';
import { FaChevronDown, FaChevronRight, FaChevronUp } from 'react-icons/fa';

export default function PersonDetails({ person }) {
  const [showFullBiography, setShowFullBiography] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contentHeight, setContentHeight] = useState('auto');
  const contentRef = useRef(null);

  const name = person.name;
  const known_for = person.known_for_department ? person.known_for_department : 'N/A';
  const gender = person.gender === 2 ? 'Male' : person.gender === 1 ? 'Female' : 'N/A';
  const birthday = person.birthday ? person.birthday : 'N/A';
  const birth_place = person.place_of_birth ? person.place_of_birth : 'N/A';
  const biographyFull = person.biography ? person.biography : `We don't have a biography for ${person.name} yet.`;
  const deathday = person.deathday;
  const MAX_CHAR_COUNT = 800;
  const biography = biographyFull.split('\n\n');

  const getBiographyToShow = (biography, maxCharCount) => {
    const firstTwo = biography.slice(0, 2).join('\n\n');
    const firstThree = biography.slice(0, 3).join('\n\n');

    if (firstTwo.length <= maxCharCount) {
      if (firstThree.length <= maxCharCount) {
        return biography.slice(0, 4);
      }
      return biography.slice(0, 3);
    }
    return biography.slice(0, 2);
  };

  const biographyToShow = showFullBiography ? biography : getBiographyToShow(biography, MAX_CHAR_COUNT);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [showFullBiography]);

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        {isLoading && <Spinner className={styles.spinner} />}
        <Image
          src={person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : DEFAULT_PERSON_IMAGE}
          alt={person.profile_path ? person.name : 'No Poster Available'}
          width={300}
          height={450}
          onLoadingComplete={handleImageLoad}
        />
      </div>

      <div className={styles.text_container}>
        <h2 className={styles.person_name}>{name}</h2>
        <div className={styles.biography_container}>
          <strong>Biography</strong>
          <div
            className={styles.biography}
            ref={contentRef}
            style={{
              height: showFullBiography ? `${contentHeight}px` : 'auto',
              overflow: 'hidden',
              transition: 'height 0.3s ease',
            }}
          >
            {biographyToShow.map((paragraph, index) => (
              <p className={styles.fade_out} key={index}>
                {paragraph}
                {index === biographyToShow.length - 1 && biography.length > 2 && (
                  <button onClick={() => setShowFullBiography(!showFullBiography)}>
                    {showFullBiography ? 'Show Less' : 'Read More'}
                    {showFullBiography ? <FaChevronUp /> : <FaChevronRight />}
                  </button>
                )}
              </p>
            ))}
          </div>
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
