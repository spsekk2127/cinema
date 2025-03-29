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
  orderBy,
  Timestamp
} from 'firebase/firestore';

const showtimesRef = collection(db, 'showtimes_Data');
const moviesRef = collection(db, 'movies_Data');
const theatersRef = collection(db, 'theaters_Data');

export const getAllShowtimes = async () => {
  try {
    // 1. 獲取所有場次
    const q = query(showtimesRef, orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    const showtimes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 2. 獲取所有電影和影城的資料
    const [moviesSnapshot, theatersSnapshot] = await Promise.all([
      getDocs(moviesRef),
      getDocs(theatersRef)
    ]);

    // 建立查找映射
    const moviesMap = new Map(
      moviesSnapshot.docs.map(doc => [doc.id, { id: doc.id, ...doc.data() }])
    );
    const theatersMap = new Map(
      theatersSnapshot.docs.map(doc => [doc.id, { id: doc.id, ...doc.data() }])
    );

    // 3. 整合資料
    const enrichedShowtimes = showtimes.map(showtime => {
      const movie = moviesMap.get(showtime.movieId) || {};
      const theater = theatersMap.get(showtime.theaterId) || {};
      const hall = theater.halls?.find(h => h.id === showtime.hallId) || {};

      return {
        ...showtime,
        movieTitle: movie.title || '未知電影',
        theaterName: theater.name || '未知影城',
        hallName: hall.name || '未知影廳',
        totalSeats: hall.capacity || 0
      };
    });

    return enrichedShowtimes;
  } catch (error) {
    console.error('Error getting showtimes:', error);
    throw error;
  }
};

export const getShowtime = async (id) => {
  const docRef = doc(showtimesRef, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const addShowtime = async (showtimeData) => {
  const data = {
    ...showtimeData,
    date: Timestamp.fromDate(new Date(showtimeData.date)),
    startTime: showtimeData.startTime,
    endTime: showtimeData.endTime,
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    bookedSeats: [],
    status: 'available',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  return await addDoc(showtimesRef, data);
};

export const updateShowtime = async (id, showtimeData) => {
  const docRef = doc(showtimesRef, id);
  const data = {
    ...showtimeData,
    date: Timestamp.fromDate(new Date(showtimeData.date)),
    updatedAt: Timestamp.now()
  };
  return await updateDoc(docRef, data);
};

export const deleteShowtime = async (id) => {
  const docRef = doc(showtimesRef, id);
  return await deleteDoc(docRef);
}; 