import { db } from '../config/firebase';
import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const getUserFavoritesCollectionRef = (userIdentifier) => {
  return collection(db, `users/${userIdentifier}/favorites`);
};

const getUserWatchedCollectionRef = (userIdentifier) => {
  return collection(db, `users/${userIdentifier}/watched`);
};

const getUserIdentifier = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return user.email;
  }
  return null;
};

export const checkIfFavorite = (showId, setIsFavorite, setFavoriteDocId) => {
  const userIdentifier = getUserIdentifier();
  if (!userIdentifier || !showId) return;
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

export const checkIfWatched = (showId, setIsWatched, setWatchedDocId) => {
  const userIdentifier = getUserIdentifier();
  if (!userIdentifier || !showId) return;

  const watchedCollectionRef = getUserWatchedCollectionRef(userIdentifier);
  const q = query(watchedCollectionRef, where('show_id', '==', showId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      setIsWatched(true);
      setWatchedDocId(docId);
    } else {
      setIsWatched(false);
      setWatchedDocId(null);
    }
  });

  return () => unsubscribe();
};

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

export const addToWatched = async (
  show,
  type,
  year,
  vote,
  imageSrc,
  showId,
  isWatched,
  setIsWacthed,
  setWatchedDocId
) => {
  const userIdentifier = getUserIdentifier();
  if (!userIdentifier || isWatched) return;

  try {
    const watchedCollectionRef = getUserWatchedCollectionRef(userIdentifier);
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

    const docRef = await addDoc(watchedCollectionRef, dataToAdd);
    setIsWacthed(true);
    setWatchedDocId(docRef.id);
  } catch (err) {
    console.error('Error adding to watched:', err);
  }
};

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

export const removeFromWatched = async (watchedDocId, setIsWatched, setWatchedDocId) => {
  const userIdentifier = getUserIdentifier();
  if (!userIdentifier || !watchedDocId) return;

  try {
    const watchedCollectionRef = getUserWatchedCollectionRef(userIdentifier);
    await deleteDoc(doc(watchedCollectionRef, watchedDocId));
    setIsWatched(false);
    setWatchedDocId(null);
  } catch (err) {
    console.error('Error removing from watched:', err);
  }
};
