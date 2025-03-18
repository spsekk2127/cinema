import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const theaterCollectionRef = collection(db, "theaters_Data");

class TheaterDataService {
  // 新增影城
  addTheater = (newTheater) => {
    return addDoc(theaterCollectionRef, newTheater);
  };

  // 更新影城
  updateTheater = (id, updatedTheater) => {
    const theaterDoc = doc(db, "theaters_Data", id);
    return updateDoc(theaterDoc, updatedTheater);
  };

  // 刪除影城
  deleteTheater = (id) => {
    const theaterDoc = doc(db, "theaters_Data", id);
    return deleteDoc(theaterDoc);
  };

  // 取得單一影城
  getTheater = (id) => {
    const theaterDoc = doc(db, "theaters_Data", id);
    return getDoc(theaterDoc);
  };

  // 取得所有影城
  getAllTheaters = () => {
    return getDocs(theaterCollectionRef);
  };
}

export default new TheaterDataService();
