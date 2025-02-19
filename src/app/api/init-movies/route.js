import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { moviesData } from "@/data/movieData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const moviesCollection = collection(db, "movies");

    // check if movies data already exists
    const existMovieData = await getDocs(moviesCollection);
    if (!existMovieData.empty) {
      return NextResponse.json({
        message: "Movies data already exists",
        count: existMovieData.size,
      });
    }

    // write movies data to firestore
    const results = [];
    for (const movie of moviesData) {
      await setDoc(doc(db, "movies", movie.id), {
        ...movie,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      results.push({
        ...movie,
      });
      console.log(`已新增電影: ${movie.title}`);
    }

    return NextResponse.json({
      message: "Movies data set successfully",
      count: results.length,
      movies: results,
    });
  } catch (error) {
    console.error("Error initializing movies data:", error);
    return NextResponse.json(
      {
        error: "Failed to set movies data",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
