 'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/admin/ui/dialog';
import { Input } from '@/components/admin/ui/input';
import { Button } from '@/components/admin/ui/button';
import { Label } from '@/components/admin/ui/label';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { getAllMovies } from '@/services/admin/movies_data_admin_Service';
import { getAllTheaters } from '@/services/admin/theaters_data_admin_service';
import { addShowtime, updateShowtime } from '@/services/admin/showtimes_data_admin_service';
import { useToast } from '@/hooks/admin/use-toast';

export default function ShowtimeDialog({ open, onOpenChange, showtime, onClose }) {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      movieId: '',
      theaterId: '',
      hallId: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '',
      endTime: '',
      price: {
        adult: 340,
        student: 300,
        child: 270,
        senior: 270
      },
      totalSeats: 0,
      status: 'available'
    }
  });

  const selectedTheaterId = watch('theaterId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesData, theatersData] = await Promise.all([
          getAllMovies(),
          getAllTheaters()
        ]);
        setMovies(moviesData);
        setTheaters(theatersData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          variant: "destructive",
          description: "載入資料失敗",
        });
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  useEffect(() => {
    if (showtime && open) {
      try {
        const date = showtime.date?.toDate?.() || new Date(showtime.date);
        
        setValue('movieId', showtime.movieId);
        setValue('theaterId', showtime.theaterId);
        setValue('hallId', showtime.hallId);
        setValue('date', format(date, 'yyyy-MM-dd'));
        setValue('startTime', showtime.startTime);
        setValue('endTime', showtime.endTime);
        setValue('price', showtime.price);
        setValue('status', showtime.status);
      } catch (error) {
        console.error('Error setting form values:', error);
        toast({
          variant: "destructive",
          description: "載入場次資料時發生錯誤",
        });
      }
    } else {
      reset();
    }
  }, [showtime, open, setValue, reset]);

  useEffect(() => {
    if (selectedTheaterId) {
      const theater = theaters.find(t => t.id === selectedTheaterId);
      setSelectedTheater(theater);
    } else {
      setSelectedTheater(null);
    }
  }, [selectedTheaterId, theaters]);

  const generateSeats = (capacity, hallId) => {
    const theater = theaters.find(t => t.halls.some(h => h.id === hallId));
    const hall = theater?.halls.find(h => h.id === hallId);
    
    if (!hall) return [];

    const { rows, seatsPerRow } = hall.seatLayout;
    const seats = [];
    
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        seats.push(`${row}${i}`);
        if (seats.length >= capacity) break;
      }
    });
    
    return seats;
  };

  const onSubmit = async (data) => {
    try {
      const selectedMovie = movies.find(m => m.id === data.movieId);
      const selectedTheater = theaters.find(t => t.id === data.theaterId);
      const selectedHall = selectedTheater?.halls?.find(h => h.id === data.hallId);

      const showtimeData = {
        movieId: data.movieId,
        movieTitle: selectedMovie?.title || '',
        theaterId: data.theaterId,
        theaterName: selectedTheater?.name || '',
        hallId: data.hallId,
        hallName: selectedHall?.name || '',
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        price: data.price,
        totalSeats: selectedHall?.capacity || 0,
        availableSeats: generateSeats(selectedHall?.capacity || 0, data.hallId),
        status: data.status
      };

      if (showtime) {
        await updateShowtime(showtime.id, showtimeData);
        toast({ description: "場次已更新" });
      } else {
        await addShowtime(showtimeData);
        toast({ description: "場次已新增" });
      }
      onClose();
    } catch (error) {
      console.error('Error saving showtime:', error);
      toast({
        variant: "destructive",
        description: "儲存失敗",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 text-white border-gray-700 border-2">
        <DialogHeader>
          <DialogTitle>{showtime ? '編輯場次' : '新增場次'}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {showtime ? '編輯場次資訊' : '新增場次，請填寫相關資訊'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="movieId">電影</Label>
            <select
              {...register('movieId', { required: "請選擇電影" })}
              className="w-full h-10 bg-gray-700 border-gray-600 text-white rounded-md px-3"
            >
              <option value="">選擇電影</option>
              {movies.map(movie => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
            {errors.movieId && (
              <p className="text-sm text-red-500">{errors.movieId.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="theaterId">影城</Label>
              <select
                {...register('theaterId', { required: "請選擇影城" })}
                className="w-full h-10 bg-gray-700 border-gray-600 text-white rounded-md px-3"
              >
                <option value="">選擇影城</option>
                {theaters.map(theater => (
                  <option key={theater.id} value={theater.id}>
                    {theater.name}
                  </option>
                ))}
              </select>
              {errors.theaterId && (
                <p className="text-sm text-red-500">{errors.theaterId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hallId">影廳</Label>
              <select
                {...register('hallId', { required: "請選擇影廳" })}
                className="w-full h-10 bg-gray-700 border-gray-600 text-white rounded-md px-3"
                disabled={!selectedTheater}
              >
                <option value="">選擇影廳</option>
                {selectedTheater?.halls?.map(hall => (
                  <option key={hall.id} value={hall.id}>
                    {hall.name}
                  </option>
                ))}
              </select>
              {errors.hallId && (
                <p className="text-sm text-red-500">{errors.hallId.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">日期</Label>
              <Input
                type="date"
                {...register('date', { required: "請選擇日期" })}
                className="bg-gray-700 border-gray-600 text-white"
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime">開始時間</Label>
              <Input
                type="time"
                {...register('startTime', { required: "請選擇開始時間" })}
                className="bg-gray-700 border-gray-600 text-white"
              />
              {errors.startTime && (
                <p className="text-sm text-red-500">{errors.startTime.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">結束時間</Label>
              <Input
                type="time"
                {...register('endTime', { required: "請選擇結束時間" })}
                className="bg-gray-700 border-gray-600 text-white"
              />
              {errors.endTime && (
                <p className="text-sm text-red-500">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>票價設定</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price.adult">全票</Label>
                <Input
                  type="number"
                  {...register('price.adult', {
                    required: "請輸入全票票價",
                    min: { value: 0, message: "票價不能小於0" }
                  })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.price?.adult && (
                  <p className="text-sm text-red-500">{errors.price.adult.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price.student">學生票</Label>
                <Input
                  type="number"
                  {...register('price.student', {
                    required: "請輸入學生票票價",
                    min: { value: 0, message: "票價不能小於0" }
                  })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.price?.student && (
                  <p className="text-sm text-red-500">{errors.price.student.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price.child">兒童票</Label>
                <Input
                  type="number"
                  {...register('price.child', {
                    required: "請輸入兒童票票價",
                    min: { value: 0, message: "票價不能小於0" }
                  })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.price?.child && (
                  <p className="text-sm text-red-500">{errors.price.child.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price.senior">敬老票</Label>
                <Input
                  type="number"
                  {...register('price.senior', {
                    required: "請輸入敬老票票價",
                    min: { value: 0, message: "票價不能小於0" }
                  })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.price?.senior && (
                  <p className="text-sm text-red-500">{errors.price.senior.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-gray-700 border-gray-600 hover:bg-gray-600"
            >
              取消
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500"
            >
              {showtime ? '更新' : '新增'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}