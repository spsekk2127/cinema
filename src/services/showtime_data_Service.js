import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const showtimeCollectionRef = collection(db, "showtimes_Data");

class ShowtimeDataService {
  // 新增場次
  addShowtime = (newShowtime) => {
    return addDoc(showtimeCollectionRef, newShowtime);
  };

  // 更新場次
  updateShowtime = (id, updatedShowtime) => {
    const showtimeDoc = doc(db, "showtimes_Data", id);
    return updateDoc(showtimeDoc, updatedShowtime);
  };

  // 刪除場次
  deleteShowtime = (id) => {
    const showtimeDoc = doc(db, "showtimes_Data", id);
    return deleteDoc(showtimeDoc);
  };

  // 取得單一場次
  getShowtime = (id) => {
    const showtimeDoc = doc(db, "showtimes_Data", id);
    return getDoc(showtimeDoc);
  };

  // 取得所有場次
  getAllshowtimes_Data = () => {
    return getDocs(showtimeCollectionRef);
  };

  // 取得特定電影的場次
  getshowtimes_DataByMovie = (movieId) => {
    const q = query(showtimeCollectionRef, where("movieId", "==", movieId));
    return getDocs(q);
  };

  // 更新場次的票種銷售數量
  updateTicketSold = (id, ticketType, quantity) => {
    const showtimeDoc = doc(db, "showtimes_Data", id);
    return updateDoc(showtimeDoc, {
      [`ticketSold.${ticketType}`]: quantity,
    });
  };

  // 更新場次的已訂位座位
  updateBookedSeats = (id, seats) => {
    const showtimeDoc = doc(db, "showtimes_Data", id);
    return updateDoc(showtimeDoc, {
      bookedSeats: seats,
    });
  };
}

const showtimeDataService = new ShowtimeDataService();
export default showtimeDataService;
