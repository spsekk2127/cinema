"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getMovieById } from '@/services/movies_data_Service';
import MovieDetail from '@/components/movies/MovieDetail';

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // scroll to top when the page is loaded
    window.scrollTo(0, 0);
    
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 p-8 text-white">載入中...</div>;
  }

  if (!movie) {
    return <div className="min-h-screen bg-gray-900 p-8 text-white">找不到電影</div>;
  }

  return (
    <MovieDetail
      movieId={id}
      {...movie}
      onBookClick={() => alert(`開始訂票 ${movie.title}`)}
    />
  );
} 