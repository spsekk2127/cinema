import { NextResponse } from "next/server";

export async function GET() {
    try {
    const moviesData = await getAllMovies();
    return NextResponse.json(moviesData);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error fetching movies" }, { status: 500 });
  }
}
