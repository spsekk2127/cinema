import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const theatersRef = collection(db, 'theaters_Data');

export const getAllTheaters = async () => {
  const snapshot = await getDocs(theatersRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getTheater = async (id) => {
  const docRef = doc(theatersRef, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const addTheater = async (theaterData) => {
  return await addDoc(theatersRef, {
    ...theaterData,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

export const updateTheater = async (id, theaterData) => {
  const docRef = doc(theatersRef, id);
  return await updateDoc(docRef, {
    ...theaterData,
    updatedAt: new Date()
  });
};

export const deleteTheater = async (id) => {
  const docRef = doc(theatersRef, id);
  return await deleteDoc(docRef);
}; 