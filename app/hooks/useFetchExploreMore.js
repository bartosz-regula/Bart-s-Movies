import { useState, useEffect } from 'react';

export function useFetchExploreMore(showType, page) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}${showType}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalPages(data.total_pages);

        setMovies((prevMovies) => {
          const combinedMovies = [...prevMovies, ...data.results];
          return combinedMovies.filter((movie, index, self) => self.findIndex((m) => m.id === movie.id) === index);
        });

        setLoading(false);
      } catch (error) {
        console.error('Downloading Error ', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, showType]);

  return { movies, loading, totalPages };
}
