import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

export async function getMovies() {
  try {
    const moviesCollection = collection(db, "movies_Data");
    const querySnapshot = await getDocs(moviesCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

export async function getMovieById(id) {
  try {
    const movieDoc = await getDoc(doc(db, "movies_Data", movieId));
    if (!movieDoc.exists()) {
      throw new Error("Movie not found");
    }
    return {
      id: movieDoc.id,
      ...movieDoc.data(),
    };
  } catch (error) {
    console.error("Error getting movie:", error);
    throw error;
  }
}
