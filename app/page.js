'use client'; // Wymusza na komponencie działanie po stronie klienta (w Next.js).

import { useState, useEffect } from 'react'; // Importuje hooki z Reacta.
import Header from './components/Hero'; // Importuje komponent nagłówka.
import MainSection from './components/MainSection'; // Importuje główną sekcję (aktualnie zakomentowaną).
import Auth from './components/Auth'; // Importuje komponent autoryzacji.
import { db, auth } from './config/firebase'; // Importuje konfigurację Firebase (baza danych i autoryzacja).
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore'; // Importuje funkcje do pracy z bazą Firestore.

export default function Home() {
  const [movieList, setMovieList] = useState([]); // Przechowuje listę filmów pobraną z Firebase.

  // Nowe stany dla dodawanego filmu.
  const [newMovieTitle, setNewMovieTitle] = useState(''); // Tytuł nowego filmu.
  const [newReleaseDate, setNewReleaseDate] = useState(0); // Data wydania nowego filmu.
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false); // Czy film zdobył Oscara.

  const moviesCollectionRef = collection(db, 'movies'); // Referencja do kolekcji 'movies' w Firestore.

  // Funkcja obsługująca dodanie nowego filmu do bazy danych.
  const onSubmitMovie = async () => {
    try {
      // Dodaje nowy dokument do kolekcji 'movies'.
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid, // Dodaje identyfikator aktualnego użytkownika.
      });
    } catch (err) {
      // W przypadku błędu (komentarz z kodem do obsługi błędów).
      // console.error(err);
    }
  };

  // Funkcja usuwająca film z bazy danych na podstawie ID.
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id); // Referencja do dokumentu filmu w Firestore.
    await deleteDoc(movieDoc); // Usuwa dokument.
  };

  // Hook useEffect, który pobiera listę filmów przy załadowaniu komponentu.
  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef); // Pobiera wszystkie dokumenty z kolekcji 'movies'.
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })); // Przekształca dane do obiektu z filmami, dodając ID.
        setMovieList(filteredData); // Ustawia listę filmów w stanie.
      } catch (err) {
        // W przypadku błędu (komentarz z kodem do obsługi błędów).
        // console.error(err);
      }
    };

    getMovieList(); // Wywołuje funkcję pobierającą filmy.
  }, [onSubmitMovie]); // Efekt zostanie wykonany, gdy zmieni się stan dodawania nowego filmu.

  return (
    <div>
      <Header /> {/* Komponent nagłówka */}
      <MainSection />
      <Auth /> {/* Komponent autoryzacji */}
      <div>
        {/* Formularz do dodawania nowego filmu */}
        <input placeholder="Movie Title..." onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))} // Ustawia datę wydania jako liczbę.
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)} // Ustawia, czy film zdobył Oscara.
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button> {/* Przycisk do wysłania nowego filmu */}
      </div>
      <div>
        {/* Renderowanie listy filmów */}
        {movieList.map((movie) => (
          <div key={movie.id}>
            {/* Wyświetla tytuł filmu, kolor zielony jeśli zdobył Oscara, czerwony jeśli nie. */}
            <h1 style={{ color: movie.receivedAnOscar ? 'green' : 'red' }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p> {/* Wyświetla datę wydania filmu */}
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button> {/* Przycisk do usunięcia filmu */}
          </div>
        ))}
      </div>
    </div>
  );
}
