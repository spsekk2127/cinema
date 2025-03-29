'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { useToast } from '@/hooks/admin/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import HallManagement from '@/components/admin/HallManagements';
import { addTheater, updateTheater } from '@/services/admin/theaters_data_admin_service';

const REGIONS = [
  { value: 'north', label: '北部' },
  { value: 'central', label: '中部' },
  { value: 'south', label: '南部' },
];

export default function TheaterDialog({ open, onOpenChange, theater, onClose }) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('basic');
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue,
    control,
    watch,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      name: '',
      region: 'north',
      city: '',
      address: '',
      phone: '',
      halls: []
    }
  });

  useEffect(() => {
    if (!open) {
      reset();
      setActiveTab('basic');
    }
  }, [open, reset]);

  useEffect(() => {
    if (theater && open) {
      Object.entries(theater).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          setValue(key, value);
        }
      });
    }
  }, [theater, open, setValue]);

  const handleClose = () => {
    reset();
    setActiveTab('basic');
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});

      if (theater) {
        await updateTheater(theater.id, cleanData);
        toast({ description: "影城資料已更新" });
      } else {
        await addTheater(cleanData);
        toast({ description: "影城已新增" });
      }
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        description: "操作失敗，請稍後再試",
      });
    }
  };

  const halls = watch('halls') || [];

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) handleClose();
      onOpenChange(open);
    }}>
      <DialogContent className="bg-gray-800 text-white max-w-4xl border-gray-700 border-2">
        <DialogHeader>
          <DialogTitle>{theater ? '編輯影城' : '新增影城'}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {theater ? '編輯影城資訊及管理影廳' : '新增影城，請填寫基本資訊'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gray-700">
            <TabsTrigger value="basic" className="data-[state=active]:bg-gray-600">
              <span className="text-gray-200">基本資訊</span>
            </TabsTrigger>
            {theater && (
              <TabsTrigger value="halls" className="data-[state=active]:bg-gray-600">
                <span className="text-gray-200">影廳管理</span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="basic">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">影城名稱</Label>
                  <Input 
                    id="name" 
                    className="bg-gray-700 border-gray-600 text-white focus:bg-gray-700"
                    {...register('name', { 
                      required: "請輸入影城名稱"
                    })} 
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">地區</Label>
                  <select
                    id="region"
                    className="w-full h-9 bg-gray-700 border-gray-600 text-white rounded-md px-2"
                    {...register('region', { required: "請選擇地區" })}
                  >
                    {REGIONS.map(region => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <p className="text-sm text-red-500">{errors.region.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">城市</Label>
                  <Input 
                    id="city" 
                    className="bg-gray-700 border-gray-600 text-white focus:bg-gray-700"
                    {...register('city', { 
                      required: "請輸入城市"
                    })} 
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">聯絡電話</Label>
                  <Input 
                    id="phone" 
                    className="bg-gray-700 border-gray-600 text-white focus:bg-gray-700"
                    {...register('phone', { 
                      required: "請輸入聯絡電話"
                    })} 
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">地址</Label>
                <Input 
                  id="address" 
                  className="bg-gray-700 border-gray-600 text-white focus:bg-gray-700"
                  {...register('address', { 
                    required: "請輸入地址"
                  })} 
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClose}
                  className="bg-gray-700 border-gray-600 hover:bg-gray-600 hover:text-white"
                >
                  取消
                </Button>
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500"
                >
                  {theater ? '更新' : '新增'}
                </Button>
              </div>
            </form>
          </TabsContent>

          {theater && (
            <TabsContent value="halls">
              <HallManagement 
                theaterId={theater.id}
                halls={halls}
                onHallsChange={(newHalls) => setValue('halls', newHalls)}
              />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}