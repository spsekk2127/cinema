export async function getMovies() {
  const res = await fetch('http://localhost:3000/api/movies/');
  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }
  return res.json();
}
