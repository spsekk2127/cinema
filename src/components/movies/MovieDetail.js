"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { showtimesData } from "@/data/showtimes";
import { theatersData } from "@/data/theaters";
// import theaterDataService from "@/services/theater_data_Service";
// import showtimeDataService from "@/services/showtime_data_Service";
import TheaterButton from "@/components/ui/TheaterButton";
import ShowtimeButton from "@/components/ui/ShowtimeButton";
import TicketTypeSelection from "@/components/ui/TicketTypeSelection";

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
  onBookClick,
  movieId,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       // 取得該電影的所有場次
  //       const showtimeSnapshot = await showtimeDataService.getshowtimes_DataByMovie(
  //         movieId
  //       );
  //       console.log(showtimeSnapshot);
  //       const showtimesData = showtimeSnapshot.docs.map((doc) => ({
  //         id: doc.imovieIdd,
  //         ...doc.data(),
  //       }));
  //       setShowtimes(showtimesData);

  //       // 取得所有影城資料
  //       const theaterSnapshot = await theaterDataService.getAllTheaters();
  //       const theatersData = theaterSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setTheaters(theatersData);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [movieId]);

  // according to movieId, filter out the showtimes
  const movieShowtimes = showtimesData.filter(
    (showtime) => showtime.movieId === movieId
  );

  // get the unique theater ids from the showtimes
  const availableTheaterIds = [
    ...new Set(movieShowtimes.map((showtime) => showtime.theaterId)),
  ];

  // according to the theater ids, find the corresponding theater data
  const availableTheaters = theatersData.filter((theater) =>
    availableTheaterIds.includes(theater.id)
  );

  const availableShowtimes = selectedTheater
    ? movieShowtimes.filter(
        (showtime) => showtime.theaterId === selectedTheater.id
      )
    : [];

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie poster */}
          <div className="relative min-w-[250px] max-w-[300px] w-1/2 sm:w-1/3 aspect-[2/3]">
            <Image
              src={posterUrl}
              alt={title}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          {/* Movie information */}
          <div className="flex flex-col gap-4">
            <div className="text-white space-y-6">
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
                  <span
                    key={index}
                    className="bg-gray-700 px-3 py-1 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-gray-300">{description}</p>

              <div className="space-y-2">
                <p>
                  <span className="text-gray-400">導演：</span>
                  {director}
                </p>
                <p>
                  <span className="text-gray-400">演員：</span>
                  {cast?.join("、")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg mt-2">
          <h2 className="text-white text-xl font-bold mb-4">線上訂票</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">選擇影城</label>
              <div className="flex flex-wrap gap-4">
                {availableTheaters?.map((theater) => (
                  <TheaterButton
                    key={theater.id}
                    theater={theater}
                    isSelected={selectedTheater?.id === theater.id}
                    onClick={() => {
                      setSelectedTheater(theater);
                      setSelectedShowtime(null);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {selectedTheater && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-3">選擇場次</h2>
              <div className="flex flex-wrap gap-2">
                {availableShowtimes?.map((showtime) => (
                  <ShowtimeButton
                    key={showtime.id}
                    showtime={showtime}
                    isSelected={selectedShowtime?.id === showtime.id}
                    onClick={() => setSelectedShowtime(showtime)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedShowtime && (
          <TicketTypeSelection showtime={selectedShowtime} />
        )}
      </div>
    </div>
  );
}
