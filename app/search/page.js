'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Card from '../components/Card';
import CardContainer from '../components/CardContainer';
import SearchBox from '../components/SearchBox';
import Image from 'next/image';
import styles from './page.module.css';
import FilterSelector from '../components/FilterSelector';
import { categoryOptionsSearch } from '../resources/catgoryOptionsSearch';
import ButtonTop from '../components/ButtonTop';
import Loading from '../loading';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState([]);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [filter, setFilter] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
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
    if (window.scrollY > 200) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

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

  const filteredResults = results.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'movie') return item.media_type === 'movie';
    if (filter === 'tv') return item.media_type === 'tv';
    if (filter === 'person') return item.media_type === 'person';
    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchBox value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {query !== '' && (
        <div className={styles.card_container}>
          {!loading && query !== '' && results.length !== 0 && (
            <div className={styles.header_container}>
              <h2 className={styles.header}>
                Search Results for: <span>"{query}"</span>
              </h2>
              <FilterSelector
                label="Filter by"
                options={categoryOptionsSearch.sortOptions}
                value={filter}
                onChange={setFilter}
                option="All"
              />
            </div>
          )}
          <CardContainer>
            {filteredResults.map((show) => (
              <Card key={show.id} show={show} className={styles.card} />
            ))}
            {loading && <Loading />}
          </CardContainer>
        </div>
      )}

      {query === '' && (
        <div>
          <h2 className={styles.header}>Frequently Searched</h2>

          <CardContainer>
            {shows.slice(0, 18).map((show) => (
              <Card key={show.id} show={show} className={styles.card} />
            ))}
          </CardContainer>
        </div>
      )}

      {isScrolled && <ButtonTop />}

      {!loading && query !== '' && results.length === 0 && (
        <div className={styles.start_typing_container}>
          <Image src="/barts-movies-high-resolution-logo-transparent (6) copy.png" width={200} height={70} />
          <h2>No movies, series, or persons found for:</h2>
          <p>"{query}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
