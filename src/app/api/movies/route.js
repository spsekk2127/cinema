import { NextResponse } from "next/server";
import { getMovies } from "@/services/movies_data_Service";

export async function GET() {
  try {
    const moviesData = await getMovies();
    return NextResponse.json(moviesData);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
