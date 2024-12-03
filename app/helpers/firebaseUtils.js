import { db } from '../config/firebase';
import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot, getDocs } from 'firebase/firestore';

import { serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const getUserFavoritesCollectionRef = (userIdentifier) => {
  return collection(db, `users/${userIdentifier}/favorites`);
};

const getUserRatedCollectionRef = (userIdentifier) => {
  return collection(db, `users/${userIdentifier}/rated`);
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



export const checkIfRated = (showId, setIsRated, setRatedDocId, setRating) => {
  const userIdentifier = getUserIdentifier();
  if (!userIdentifier || !showId) return;

  const ratedCollectionRef = getUserRatedCollectionRef(userIdentifier);
  const q = query(ratedCollectionRef, where('show_id', '==', showId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      setIsRated(true);
      setRatedDocId(docId);
      const rating = querySnapshot.docs[0].data().rating;
      if (typeof setRating === 'function') {
        setRating(rating || 0);
      } else {
        console.error('setRating nie jest funkcją');
      }
    } else {
      setIsRated(false);
      setRatedDocId(null);
      if (typeof setRating === 'function') {
        setRating(0);
      } else {
        console.error('setRating nie jest funkcją');
      }
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
  if (!userIdentifier) return;

  const favoritesCollectionRef = getUserFavoritesCollectionRef(userIdentifier);
  const q = query(favoritesCollectionRef, where('show_id', '==', showId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    console.log('This movie is already in favorites.');
    return;
  }

  try {
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

export const addToRated = async (
  show,
  type,
  year,
  vote,
  rating,
  imageSrc,
  showId,
  isRated,
  setIsRated,
  setRatedDocId
) => {
  const userIdentifier = getUserIdentifier();
  if (!userIdentifier) return;

  const ratedCollectionRef = getUserRatedCollectionRef(userIdentifier);
  const q = query(ratedCollectionRef, where('show_id', '==', showId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    console.log('This movie is already in rated.');
    return;
  }

  try {
    const dataToAdd = {
      rating: rating,
      poster: imageSrc,
      year: year,
      vote: vote,
      timestamp: serverTimestamp(),
      type: type,
      show_id: showId,
      ...(show?.title ? { title: show.title } : {}),
      ...(show?.name ? { name: show.name } : {}),
    };

    const docRef = await addDoc(ratedCollectionRef, dataToAdd);
    setIsRated(true);
    setRatedDocId(docRef.id);
  } catch (err) {
    console.error('Error adding to rated:', err);
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

export const removeFromRated = async (ratedDocId, setIsRated, setRatedDocId) => {
  const userIdentifier = getUserIdentifier();
  if (!userIdentifier || !ratedDocId) return;

  try {
    const ratedCollectionRef = getUserRatedCollectionRef(userIdentifier);
    await deleteDoc(doc(ratedCollectionRef, ratedDocId));
    setIsRated(false);
    setRatedDocId(null);
  } catch (err) {
    console.error('Error removing from rated:', err);
  }
};
