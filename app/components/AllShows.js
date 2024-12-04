'use client';

import { useState, useEffect, useRef } from 'react';
import { useScrollTop } from '../hooks/useScrollTop';
import CardContainer from '../components/CardContainer';
import Card from '../components/Card';
import FilterSelector from '../components/FilterSelector';
import styles from '../components/AllShows.module.css';
import ButtonTop from './ButtonTop';

export default function Page({ type, category, header }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const isFetching = useRef(false);

  const { isVisible } = useScrollTop({ loading, page, totalPages, setPage });

  useEffect(() => {
    setItems([]);
    setPage(1);
  }, [selectedGenre, selectedCountry, releaseYear, sortOption]);

  useEffect(() => {
    const fetchItems = async () => {
      if (isFetching.current) return;
      isFetching.current = true;

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const genreId = selectedGenre;
      const country = selectedCountry;
      const yearFilter = releaseYear
        ? type === 'movie'
          ? `primary_release_year=${releaseYear}`
          : `first_air_date.gte=${releaseYear}-01-01&first_air_date.lte=${releaseYear}-12-31`
        : '';

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
        setLoading(true);
        const response = await fetch(`${baseUrl}/discover/${type}?api_key=${apiKey}&${queryParams}&page=${page}`);

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        setItems((prevItems) => [...prevItems, ...data.results]);
        setTotalPages(data.total_pages);
        setLoading(false);
        isFetching.current = false;
      } catch (err) {
        setError('Something went wrong!');
        setLoading(false);
        isFetching.current = false;
      }
    };

    fetchItems();
  }, [selectedGenre, selectedCountry, releaseYear, sortOption, page]);

  return (
    <div className={styles.container}>
      <div className={styles.filter_container}>
        <h2 className={styles.header}>{header}</h2>
        <div>
          <FilterSelector
            label="Genre"
            options={category.genres}
            value={selectedGenre}
            onChange={setSelectedGenre}
            option="All"
            optionKey="id"
            optionLabel="name"
          />

          <FilterSelector
            label="Country"
            options={category.countries}
            value={selectedCountry}
            onChange={setSelectedCountry}
            option="All"
            optionKey="code"
            optionLabel="name"
          />

          <FilterSelector
            label="Released"
            option="All"
            options={category.releaseYears.map((year) => ({ value: year, label: year }))}
            value={releaseYear}
            onChange={setReleaseYear}
          />

          <FilterSelector
            label="Sort By"
            option="Unsorted"
            options={category.sortOptions}
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

      {isVisible && <ButtonTop />}
    </div>
  );
}
