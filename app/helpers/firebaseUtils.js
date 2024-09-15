import { db } from '../config/firebase';
import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Funkcja pomocnicza do uzyskania kolekcji ulubionych filmów dla zalogowanego użytkownika
const getUserFavoritesCollectionRef = (userIdentifier) => {
  return collection(db, `users/${userIdentifier}/favorites`);
};

// Pobranie e-maila lub nazwy użytkownika
const getUserIdentifier = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return user.email; // lub user.displayName jeśli używasz nazw użytkowników
  }
  return null;
};

// Sprawdzenie, czy film jest ulubiony
export const checkIfFavorite = (showId, setIsFavorite, setFavoriteDocId) => {
  const userIdentifier = getUserIdentifier();
  if (!userIdentifier) return;

  const favoritesCollectionRef = getUserFavoritesCollectionRef(userIdentifier);
  const q = query(favoritesCollectionRef, where('show_id', '==', showId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      setIsFavorite(true);
      setFavoriteDocId(docId);
    } else {
      setIsFavorite(false);
      setFavoriteDocId(null);
    }
  });

  return () => unsubscribe();
};

// Dodanie filmu do ulubionych
export const addToFavorites = async (
  show,
  type,
  year,
  vote,
  imageSrc,
  showId,
  isFavorite,
  setIsFavorite,
  setFavoriteDocId
) => {
  const userIdentifier = getUserIdentifier();
  if (!userIdentifier || isFavorite) return;

  try {
    const favoritesCollectionRef = getUserFavoritesCollectionRef(userIdentifier);
    const dataToAdd = {
      releaseDate: year,
      vote: vote,
      poster: imageSrc,
      timestamp: serverTimestamp(),
      type: type,
      show_id: showId,
      ...(show?.title ? { title: show.title } : {}),
      ...(show?.name ? { name: show.name } : {}),
    };

    const docRef = await addDoc(favoritesCollectionRef, dataToAdd);
    setIsFavorite(true);
    setFavoriteDocId(docRef.id);
  } catch (err) {
    console.error('Error adding to favorites:', err);
  }
};

// Usunięcie filmu z ulubionych
export const removeFromFavorites = async (favoriteDocId, setIsFavorite, setFavoriteDocId) => {
  const userIdentifier = getUserIdentifier();
  if (!userIdentifier || !favoriteDocId) return;

  try {
    const favoritesCollectionRef = getUserFavoritesCollectionRef(userIdentifier);
    await deleteDoc(doc(favoritesCollectionRef, favoriteDocId));
    setIsFavorite(false);
    setFavoriteDocId(null);
  } catch (err) {
    console.error('Error removing from favorites:', err);
  }
};
