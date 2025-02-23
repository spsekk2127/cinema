"use client";

import Image from 'next/image';
import Button from '../ui/Button';

export default function MovieDetail({ 
  title, 
  posterUrl, 
  rating, 
  duration, 
  releaseDate,
  genre,
  description,
  director,
  cast,
  onBookClick 
}) {
  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie poster */}
          <div className="relative min-w-[250px] w-1/2 sm:w-1/3 aspect-[2/3]">
            <Image
              src={posterUrl}
              alt={title}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          {/* Movie information */}
          <div className="flex-1 text-white space-y-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            
            <div className="flex items-center gap-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg font-bold">
                {rating}
              </span>
              <span>{duration}</span>
              <span>{releaseDate}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {genre?.map((g, index) => (
                <span key={index} className="bg-gray-700 px-3 py-1 rounded-full">
                  {g}
                </span>
              ))}
            </div>

            <p className="text-gray-300">{description}</p>

            <div className="space-y-2">
              <p><span className="text-gray-400">導演：</span>{director}</p>
              <p><span className="text-gray-400">演員：</span>{cast?.join('、')}</p>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full md:w-auto"
              onClick={onBookClick}
            >
              立即訂票
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 