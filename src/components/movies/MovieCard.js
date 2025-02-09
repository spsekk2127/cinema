"use client";

import Image from 'next/image';
import Button from '../ui/Button';

export default function MovieCard({ 
  title, 
  posterUrl, 
  rating, 
  duration, 
  releaseDate,
  onBookClick 
}) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg w-[200px]">
      <div className="relative w-[200px] h-[300px]">
        <Image
          src={posterUrl}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-lg font-bold z-10">
          {rating}
        </div>
      </div>
      
      {/* Moive Infomation */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <div className="flex items-center gap-4 text-gray-300 text-sm mb-4">
          <span>{duration}</span>
          <span>{releaseDate}</span>
        </div>
        <Button
          variant="primary"
          className="w-full"
          onClick={onBookClick}
        >
          立即訂票
        </Button>
      </div>
    </div>
  );
} 