// export default function ExploreMore() {
//   return <div>ExploreMore</div>;
// }

// Importujemy potrzebne funkcje i komponenty
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Linkowanie między stronami w Next.js
import axios from 'axios'; // Biblioteka do wykonywania zapytań HTTP

// Komponent ExploreMore, który wyświetla listę filmów
const ExploreMore = ({ type1, type2, type3, title }) => {
  // Ustawienia stanów komponentu
  const [movies, setMovies] = useState([]); // Lista filmów
  const [page, setPage] = useState(1); // Aktualna strona paginacji
  const [loading, setLoading] = useState(false); // Czy trwa ładowanie danych
  const [totalPages, setTotalPages] = useState(1); // Łączna liczba stron
  const [favorites, setFavorites] = useState([]); // Lista ulubionych filmów
  const [hoveredItem, setHoveredItem] = useState(null); // Zmienna do zarządzania stanem najechania myszą na film
  const [isVisible, setIsVisible] = useState(false); // Widoczność przycisku przewijania do góry

  // Funkcja kontrolująca widoczność przycisku "Up" w zależności od pozycji scrolla
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true); // Pokazuje przycisk, jeśli scroll jest większy niż 300px
    } else {
      setIsVisible(false); // Ukrywa przycisk, jeśli scroll jest mniejszy
    }
  };

  // Hook useEffect, który uruchamia się po zmianie strony paginacji
  useEffect(() => {
    setLoading(true); // Ustawiamy stan ładowania na true przed fetchowaniem danych
    fetchMovies(); // Wywołanie funkcji do pobierania filmów
  }, [page]); // Funkcja uruchamia się ponownie za każdym razem, gdy zmieni się wartość page

  // Funkcja do pobierania filmów z TMDb API
  const fetchMovies = async () => {
    try {
      // Wysyłamy żądanie do API TMDb z parametrami typu, języka i strony
      const response = await axios.get(`${API_URL}/${type1}/${type2}?api_key=${API_KEY}&language=en-US&page=${page}`);

      // Ustawiamy łączną liczbę stron, aby wiedzieć, ile stron można jeszcze załadować
      setTotalPages(response.data.total_pages);

      // Aktualizujemy listę filmów, usuwając duplikaty
      setMovies((prevMovies) => {
        const uniqueMovies = [...prevMovies, ...response.data.results]; // Dodajemy nowe filmy do listy
        // Używamy Set do eliminacji duplikatów po ID filmu
        const uniqueMoviesSet = new Set(uniqueMovies.map((movie) => movie.id));
        return Array.from(uniqueMoviesSet).map((id) => uniqueMovies.find((movie) => movie.id === id));
      });

      setLoading(false); // Po zakończeniu pobierania, wyłączamy stan ładowania
    } catch (error) {
      console.error('Error fetching movies: ', error); // Obsługa błędów
      setLoading(false); // W przypadku błędu również wyłączamy stan ładowania
    }
  };

  // Funkcja, która monitoruje przewijanie strony i automatycznie ładuje więcej filmów, jeśli użytkownik zbliża się do dołu strony
  const handleScroll = () => {
    if (document.documentElement.scrollHeight - (window.innerHeight + document.documentElement.scrollTop) < 100) {
      // Jeśli użytkownik nie dotarł jeszcze do końca stron
      if (page < totalPages) {
        setPage((prevPage) => prevPage + 1); // Zwiększamy numer strony o 1, aby załadować kolejne filmy
      }
    }
  };

  // Funkcja przewijająca stronę do góry po kliknięciu przycisku
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Przewinięcie na górę strony
      behavior: 'smooth', // Płynna animacja
    });
  };

  // Hook useEffect, który dodaje i usuwa nasłuchiwanie przewijania strony do zarządzania widocznością przycisku "Up"
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility); // Dodanie nasłuchiwania przewijania
    return () => {
      window.removeEventListener('scroll', toggleVisibility); // Usunięcie nasłuchiwania po demontażu komponentu
    };
  }, []);

  // Hook useEffect, który ładuje ulubione filmy z localStorage przy pierwszym uruchomieniu komponentu
  useEffect(() => {
    const storedFavorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites); // Ustawiamy stan ulubionych na podstawie danych z localStorage
  }, []);

  // Hook useEffect, który dodaje nasłuchiwanie przewijania w celu automatycznego ładowania nowych filmów
  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Dodajemy nasłuchiwanie
    return () => window.removeEventListener('scroll', handleScroll); // Usuwamy nasłuchiwanie po demontażu komponentu
  }, [page, totalPages]); // Ponownie uruchamia się przy zmianie wartości page lub totalPages

  // Funkcja do zarządzania dodawaniem i usuwaniem filmów z listy ulubionych
  const handleAddToFavorites = (movie) => {
    const storedFavorites = JSON.parse(window.localStorage.getItem('favorites')) || []; // Pobieramy istniejące ulubione filmy z localStorage
    const isFav = storedFavorites.some((favMovie) => favMovie.title === movie.title); // Sprawdzamy, czy film już jest w ulubionych

    // Jeśli film jest w ulubionych, usuwamy go, w przeciwnym razie dodajemy do ulubionych
    if (isFav) {
      const updatedFavorites = storedFavorites.filter((favMovie) => favMovie.title !== movie.title);
      setFavorites(updatedFavorites); // Aktualizujemy stan ulubionych
      window.localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Zapisujemy nową listę ulubionych do localStorage
    } else {
      const updatedFavorites = [
        ...storedFavorites,
        {
          title: movie.title || movie.name, // Nazwa filmu
          imageUrl: `https://image.tmdb.org/t/p/w300${movie.poster_path}`, // Ścieżka do plakatu filmu
          rate: movie.vote_average, // Ocena filmu
          release_date: movie.release_date, // Data wydania
        },
      ];
      setFavorites(updatedFavorites); // Aktualizujemy stan ulubionych
      window.localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Zapisujemy do localStorage
    }
  };

  return (
    <div className={styles.container}>
      <NavBar /> {/* Pasek nawigacyjny */}
      {/* Przycisk "Up" widoczny, gdy isVisible jest true */}
      {isVisible && (
        <button className={styles.button_up} onClick={scrollToTop}>
          Up
        </button>
      )}
      <div>
        <h1>{title}</h1> {/* Tytuł sekcji */}
        <ul className={styles.movieList}>
          {/* Renderowanie listy filmów */}
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link href={`${type3}/${movie.id}`}>
                {' '}
                {/* Link do strony szczegółów filmu */}
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`} // Obrazek z plakatu filmu
                  alt={movie.title}
                />
                <div className={styles.title}>
                  <p>
                    {/* Wyświetlanie tytułu filmu, obcinanie długich tytułów */}
                    {movie.name && <span>{movie.name.length > 24 ? movie.name.slice(0, 24) + '...' : movie.name}</span>}
                    {movie.title && (
                      <span>{movie.title.length > 24 ? movie.title.slice(0, 24) + '...' : movie.title}</span>
                    )}
                  </p>
                </div>
                <div className={styles.details}>
                  {/* Wyświetlanie roku wydania i oceny filmu */}
                  {movie.release_date || movie.first_air_date ? (
                    <>
                      {movie.release_date && <p>{new Date(movie.release_date).getFullYear()}</p>}
                      {movie.first_air_date && <p>{new Date(movie.first_air_date).getFullYear()}</p>}
                    </>
                  ) : (
                    <p>N/A</p> // Jeśli nie ma daty wydania, wyświetla N/A
                  )}

                  <p>
                    <span>⭐️ </span>
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} {/* Wyświetlanie oceny filmu */}
                  </p>
                </div>
              </Link>
              <span className={styles.heart} title="Add to favorites">
                <Heart
                  // Ikona serca, pozwalająca na dodanie lub usunięcie filmu z ulubionych
                  handleClick={() => handleAddToFavorites(movie)}
                  isFavorite={
                    Array.isArray(favorites) &&
                    favorites.some((favMovie) => favMovie.title === movie.title || favMovie.title === movie.name)
                  }
                />
              </span>
            </li>
          ))}
        </ul>
        {loading && <p>Loading...</p>} {/* Informacja o ładowaniu, jeśli trwa pobieranie filmów */}
      </div>
    </div>
  );
};

export default ExploreMore; // Eksport komponentu jako domyślny

const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}${showType}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
);
