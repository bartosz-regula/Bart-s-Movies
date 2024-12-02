'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Card from '../components/Card';
import CardContainer from '../components/CardContainer';
import SearchBox from '../components/SearchBox';
import Image from 'next/image';
import styles from './page.module.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState([]);

  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const pageRef = useRef(currentPage);

  const fetchMovies = useCallback(
    async (page = 1) => {
      if (!query) {
        setResults([]);
        setTotalResults(0);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`
        );
        const data = await response.json();

        if (data.results) {
          setResults((prevResults) => (page === 1 ? data.results : [...prevResults, ...data.results]));
          setTotalResults(data.total_results);
        }
        pageRef.current = page;
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [query, apiKey, baseUrl]
  );

  useEffect(() => {
    if (query) {
      setResults([]);
      setCurrentPage(1);
      fetchMovies(1);
    }
  }, [query, fetchMovies]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight &&
      !loading &&
      results.length < totalResults &&
      pageRef.current === currentPage
    ) {
      setCurrentPage((prev) => prev + 1);
      fetchMovies(currentPage + 1);
    }
  }, [loading, results, totalResults, currentPage, fetchMovies]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch shows');
        }
        const data = await response.json();
        setShows(data.results || []);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchBox value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {query !== '' && (
        <div className={styles.card_container}>
          {!loading && query !== '' && results.length !== 0 && (
            <h2 className={styles.header}>Search Results for: {query}</h2>
          )}
          <CardContainer>
            {results.map((show) => (
              <Card key={show.id} show={show} className={styles.card} />
            ))}
            {loading && <p>Loading...</p>}
          </CardContainer>
        </div>
      )}

      {query === '' && (
        <div>
          <h2 className={styles.header}>Frequently Searched </h2>
          <CardContainer>
            {shows.map((show) => (
              <Card key={show.id} show={show} className={styles.card} />
            ))}
          </CardContainer>
        </div>
      )}

      {!loading && query !== '' && results.length === 0 && (
        <div className={styles.start_typing_container}>
          <Image src="/barts-movies-high-resolution-logo-transparent (6) copy.png" width={200} height={70} />
          <h2>No movies, series, or actors found for: {query}</h2>
        </div>
      )}
    </div>
  );
};

export default SearchPage;