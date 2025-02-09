"use client";

import Button from '@/components/ui/Button';
import MovieCard from '@/components/movies/MovieCard';

export default function Home() {
  const movieData = {
    title: "奇異博士2：失控多重宇宙",
    posterUrl: "/images/movie_image_01.jpg",
    rating: "8.5",
    duration: "126分鐘",
    releaseDate: "2024-03-15"

  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Button test*/}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">測試按鈕</h2>
          <Button onClick={() => alert('被點擊了！')}>
            點擊
          </Button>
        </div>

        {/* MovieCard test*/}
        <div className=''>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">電影清單</h2>
            <MovieCard
              {...movieData}
              onBookClick={() => alert('開始訂票')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
