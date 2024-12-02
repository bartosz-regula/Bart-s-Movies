'use client';

import { useState, useEffect } from 'react';
import CardContainer from '../components/CardContainer';
import Card from '../components/Card';
import { categoryOptions } from '../resources/categoryOptions';
import FilterSelector from '../components/FilterSelector';
import styles from './page.module.css';

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const type = 'movie';
      const genreId = selectedGenre;
      const country = selectedCountry;
      const yearFilter = releaseYear ? `primary_release_year=${releaseYear}` : '';
      const sortByFilter = sortOption ? `sort_by=${sortOption}` : '';
      const minVotes = 'vote_count.gte=300';

      const queryParams = [
        genreId && `with_genres=${genreId}`,
        country && `with_origin_country=${country}`,
        yearFilter,
        sortByFilter,
        minVotes,
      ]
        .filter(Boolean)
        .join('&');

      try {
        const response = await fetch(`${baseUrl}/discover/${type}?api_key=${apiKey}&${queryParams}&page=1`);

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        setItems(data.results);
        setLoading(false);
      } catch (err) {
        setError('Something went wrong!');
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedGenre, selectedCountry, releaseYear, sortOption]);

  return (
    <div>
      <div className={styles.filter_container}>
        <h2 className={styles.header}>All Movies</h2>
        <div>
          <FilterSelector
            label="Genre"
            options={categoryOptions.movieGenres}
            value={selectedGenre}
            onChange={setSelectedGenre}
            option="All"
            optionKey="id"
            optionLabel="name"
          />

          <FilterSelector
            label="Country"
            options={categoryOptions.countries}
            value={selectedCountry}
            onChange={setSelectedCountry}
            option="All"
            optionKey="code"
            optionLabel="name"
          />

          <FilterSelector
            label="Released"
            option="All"
            options={categoryOptions.releaseYears.map((year) => ({ value: year, label: year }))}
            value={releaseYear}
            onChange={setReleaseYear}
          />

          <FilterSelector
            label="Sort By"
            option="Unsorted"
            options={categoryOptions.sortOptions}
            value={sortOption}
            onChange={setSortOption}
          />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <CardContainer>
        {items.map((item) => (
          <Card key={item.id} show={item} className={styles.card}></Card>
        ))}
      </CardContainer>
    </div>
  );
}
