"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';

export default function MovieCard({ 
  id,
  title, 
  posterUrl, 
  rating, 
  duration, 
  releaseDate,
  genre,
  description,
  director,
  cast
}) {
  const router = useRouter();

  const handleClick = () => {
    if (id) {
      window.scrollTo(0, 0);
      router.push(`/movies/${id}`);
    } else {
      console.error('No movie ID provided');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg w-full hover:scale-105 transition-transform duration-300 flex flex-col">
      <div className="relative aspect-[2/3]">
        <Image
          src={posterUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
        />
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-lg font-bold z-10">
          {rating}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          
          {/* type tag */}
          <div className="flex flex-wrap gap-1">
            {genre?.map((g, index) => (
              <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                {g}
              </span>
            ))}
          </div>

          {/* basic information */}
          <div className="text-gray-300 text-sm space-y-1">
            <div className="flex items-center gap-2">
              <span>{duration}</span>
              <span>•</span>
              <span>{releaseDate}</span>
            </div>
            <div>導演：{director}</div>
            <div className="truncate">演員：{cast?.join('、')}</div>
          </div>

          {/* description */}
          <p className="text-sm text-gray-400 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Button fixed at the bottom */}
        <div className="mt-4">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleClick}
          >
            立即訂票
          </Button>
        </div>
      </div>
    </div>
  );
} 