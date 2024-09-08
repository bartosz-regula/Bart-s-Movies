'use client'; // Wymusza na komponencie działanie po stronie klienta (w Next.js).

import { useState, useEffect } from 'react'; // Importuje hooki z Reacta.
import Auth from '../components/Auth'; // Importuje komponent autoryzacji.
import { db, auth } from '../config/firebase'; // Importuje konfigurację Firebase (baza danych i autoryzacja).
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore'; // Importuje funkcje do pracy z bazą Firestore.
import Card from '../components/Card';
import Image from 'next/image';

export default function Page() {
  const [movieList, setMovieList] = useState([]); // Przechowuje listę filmów pobraną z Firebase.

  const moviesCollectionRef = collection(db, 'movies'); // Referencja do kolekcji 'movies' w Firestore.

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
  }, []); // Efekt zostanie wykonany, gdy zmieni się stan dodawania nowego filmu.

  return (
    <div>
      {movieList.map((movie) => (

        <Card key={movie.id} show={movie} />
      ))}
    </div>
  );
}
