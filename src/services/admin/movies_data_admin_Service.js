import { db } from '@/firebase/config';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';

const moviesRef = collection(db, 'movies_Data');

export const getAllMovies = async () => {
  const q = query(moviesRef, orderBy('releaseDate', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getMovie = async (id) => {
  const docRef = doc(moviesRef, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const addMovie = async (movieData) => {
  return await addDoc(moviesRef, {
    ...movieData,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

export const updateMovie = async (id, movieData) => {
  const docRef = doc(moviesRef, id);
  return await updateDoc(docRef, {
    ...movieData,
    updatedAt: new Date()
  });
};

export const deleteMovie = async (id) => {
  const docRef = doc(moviesRef, id);
  return await deleteDoc(docRef);
};