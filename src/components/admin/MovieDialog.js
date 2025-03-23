'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/admin/ui/dialog';
import { Input } from '@/components/admin/ui/input';
import { Button } from '@/components/admin/ui/button';
import { Label } from '@/components/admin/ui/label';
import { Switch } from '@/components/admin/ui/switch';
import { Textarea } from '@/components/admin/ui/textarea';
import { useToast } from '@/hooks/admin/use-toast';
import { addMovie, updateMovie } from '@/services/admin/movies_data_admin_Service';

export default function MovieDialog({ open, onOpenChange, movie, onClose }) {
  const { toast } = useToast();
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue,
    control,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      posterUrl: '',
      releaseDate: '',
      duration: '',
      director: '',
      cast: '',
      trailerUrl: '',
      isShowing: true
    }
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  useEffect(() => {
    if (movie && open) {
      setValue('title', movie.title);
      setValue('description', movie.description);
      setValue('posterUrl', movie.posterUrl);
      setValue('releaseDate', movie.releaseDate);
      setValue('duration', movie.duration);
      setValue('director', movie.director);
      setValue('cast', movie.cast);
      setValue('trailerUrl', movie.trailerUrl);
      setValue('isShowing', movie.isShowing);
    }
  }, [movie, open, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      if (movie) {
        await updateMovie(movie.id, data);
        toast({ description: "電影資料已更新" });
      } else {
        await addMovie(data);
        toast({ description: "電影已新增" });
      }
      handleClose();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "操作失敗，請稍後再試",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) handleClose();
      onOpenChange(open);
    }}>
      <DialogContent className="bg-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>{movie ? '編輯電影' : '新增電影'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">電影名稱</Label>
              <Input 
                id="title" 
                className="bg-gray-700 border-gray-600 text-white"
                {...register('title', { 
                  required: "請輸入電影名稱"
                })} 
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="releaseDate">上映日期</Label>
              <Input 
                id="releaseDate" 
                type="date"
                className="bg-gray-700 border-gray-600 text-white"
                {...register('releaseDate', { 
                  required: "請選擇上映日期"
                })} 
              />
              {errors.releaseDate && (
                <p className="text-sm text-red-500">{errors.releaseDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">片長（分鐘）</Label>
              <Input 
                id="duration" 
                type="number"
                className="bg-gray-700 border-gray-600 text-white"
                {...register('duration', { 
                  required: "請輸入片長",
                  min: {
                    value: 1,
                    message: "片長必須大於0分鐘"
                  }
                })} 
              />
              {errors.duration && (
                <p className="text-sm text-red-500">{errors.duration.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="director">導演</Label>
              <Input 
                id="director" 
                className="bg-gray-700 border-gray-600 text-white"
                {...register('director', { 
                  required: "請輸入導演名稱"
                })} 
              />
              {errors.director && (
                <p className="text-sm text-red-500">{errors.director.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cast">主要演員</Label>
            <Input 
              id="cast" 
              className="bg-gray-700 border-gray-600 text-white"
              {...register('cast', { 
                required: "請輸入主要演員"
              })} 
            />
            {errors.cast && (
              <p className="text-sm text-red-500">{errors.cast.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">電影簡介</Label>
            <Textarea 
              id="description" 
              className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
              {...register('description', { 
                required: "請輸入電影簡介"
              })} 
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="posterUrl">海報圖片網址</Label>
            <Input 
              id="posterUrl" 
              className="bg-gray-700 border-gray-600 text-white"
              {...register('posterUrl', { 
                required: "請輸入海報圖片網址",
                // pattern: {
                //   value: /^https?:\/\/.+/i,
                //   message: "請輸入有效的圖片網址"
                // }
              })} 
            />
            {errors.posterUrl && (
              <p className="text-sm text-red-500">{errors.posterUrl.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              name="isShowing"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch 
                  id="isShowing"
                  checked={value}
                  onCheckedChange={onChange}
                  className="data-[state=checked]:bg-green-500/50 data-[state=unchecked]:bg-gray-600"
                />
              )}
            />
            <Label htmlFor="isShowing">
              上映狀態 ({control._formValues.isShowing ? '上映中' : '未上映'})
            </Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="bg-gray-700 hover:bg-gray-600"
            >
              取消
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500"
            >
              {movie ? '更新' : '新增'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 