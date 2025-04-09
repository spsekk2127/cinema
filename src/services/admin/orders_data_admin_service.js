import { db } from '@/firebase/config';
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';

const ordersRef = collection(db, 'orders_Data');

export const getAllOrders = async () => {
  try {
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date()
    }));
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
}; 