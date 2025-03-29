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
import SeatLayout from './SeatLayout';

export default function HallDialog({ open, onOpenChange, hall, onClose, onSave }) {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      name: '',
      capacity: '',
      rows: '',
      seatsPerRow: '',
    }
  });

  const [seatLayout, setSeatLayout] = useState(null);

  useEffect(() => {
    if (hall && open) {
      reset({
        name: hall.name,
        capacity: hall.capacity,
        rows: hall.rows?.length || '',
        seatsPerRow: hall.seatsPerRow || '',
      });
    } else if (!open) {
      reset();
    }
  }, [hall, open, reset]);

  const onSubmit = (data) => {
    const rows = Array.from({ length: parseInt(data.rows) }, (_, i) => 
      String.fromCharCode(65 + i)
    );

    const hallData = {
      name: data.name,
      capacity: parseInt(data.capacity),
      rows: rows,
      seatsPerRow: parseInt(data.seatsPerRow),
      seatLayout: seatLayout
    };

    onSave(hallData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 text-white border-gray-700 border-2 max-w-4xl">
        <DialogHeader>
          <DialogTitle>{hall ? '編輯影廳' : '新增影廳'}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {hall ? '編輯影廳資訊' : '新增影廳，請填寫相關資訊'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">影廳名稱</Label>
            <Input 
              id="name"
              className="bg-gray-700 border-gray-600 text-white focus:bg-gray-700"
              {...register('name', { required: "請輸入影廳名稱" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rows">排數</Label>
              <Input
                id="rows"
                type="number"
                className="bg-gray-700 border-gray-600 text-white focus:bg-gray-700"
                {...register('rows', {
                  required: "請輸入排數",
                  min: { value: 1, message: "最少需要1排" },
                  max: { value: 26, message: "最多26排" }
                })}
              />
              {errors.rows && (
                <p className="text-sm text-red-500">{errors.rows.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="seatsPerRow">每排座位數</Label>
              <Input
                id="seatsPerRow"
                type="number"
                className="bg-gray-700 border-gray-600 text-white focus:bg-gray-700"
                {...register('seatsPerRow', {
                  required: "請輸入每排座位數",
                  min: { value: 1, message: "最少需要1個座位" }
                })}
              />
              {errors.seatsPerRow && (
                <p className="text-sm text-red-500">{errors.seatsPerRow.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">總座位數</Label>
            <Input
              id="capacity"
              type="number"
              className="bg-gray-700 border-gray-600 text-white focus:bg-gray-700"
              {...register('capacity', {
                required: "請輸入總座位數",
                min: { value: 1, message: "最少需要1個座位" }
              })}
            />
            {errors.capacity && (
              <p className="text-sm text-red-500">{errors.capacity.message}</p>
            )}
          </div>

          {watch('rows') && watch('seatsPerRow') && (
            <div className="space-y-2">
              <Label>座位布局</Label>
              <SeatLayout
                rows={Array.from({ length: parseInt(watch('rows')) }, (_, i) => 
                  String.fromCharCode(65 + i)
                )}
                seatsPerRow={parseInt(watch('seatsPerRow'))}
                layout={hall?.seatLayout}
                onChange={setSeatLayout}
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-gray-700 border-gray-600 hover:bg-gray-600 hover:text-white"
            >
              取消
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500"
            >
              {hall ? '更新' : '新增'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}