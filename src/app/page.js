"use client";

import { useState, useEffect } from 'react';
// import Button from '@/components/ui/Button';
import MovieCard from '@/components/movies/MovieCard';
import { getMovies } from '@/services/movies_data_Service'



export default function Home() {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        console.log(data)
        setMoviesData(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

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
            {moviesData.map((movie, index) => (
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
