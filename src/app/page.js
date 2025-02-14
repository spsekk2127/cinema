"use client";

import MovieCard from '@/components/movies/MovieCard';
import { useMovies } from '@/hooks/useMovies';

export default function Home() {
  const { movies, isLoading, error } = useMovies();

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 p-8 text-white">載入中...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 p-8 text-white">錯誤: {error}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Button test*/}
        {/* <div>
          <h2 className="text-2xl font-bold text-white mb-4">測試按鈕</h2>
          <Button onClick={() => alert('被點擊了！')}>
            點擊
          </Button>
        </div> */}

        {/* MovieCard test*/}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">電影清單</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
