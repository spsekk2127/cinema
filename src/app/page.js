"use client";

import MovieCard from '@/components/movies/MovieCard';
import { useMovies } from '@/hooks/useMovies';

export default function Home() {
  const { movies, isLoading, error } = useMovies();

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 p-8 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 p-8 text-white">Error: {error}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* MovieCard test*/}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">電影清單</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={index}
                {...movie}
                onBookClick={() => alert(`開始訂票 ${movie.title}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
