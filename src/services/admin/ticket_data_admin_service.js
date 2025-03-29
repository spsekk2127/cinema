import { db } from '@/firebase/config';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const ticketsRef = collection(db, 'tickets_Data');

export const getAllTickets = async () => {
  const snapshot = await getDocs(ticketsRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getTicket = async (id) => {
  const docRef = doc(ticketsRef, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const addTicket = async (ticketData) => {
  return await addDoc(ticketsRef, {
    ...ticketData,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

export const updateTicket = async (id, ticketData) => {
  const docRef = doc(ticketsRef, id);
  return await updateDoc(docRef, {
    ...ticketData,
    updatedAt: new Date()
  });
};

export const deleteTicket = async (id) => {
  const docRef = doc(ticketsRef, id);
  return await deleteDoc(docRef);
}; 