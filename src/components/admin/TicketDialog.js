"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/admin/ui/dialog";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { Label } from "@/components/admin/ui/label";
import { Switch } from "@/components/admin/ui/switch";
import { useToast } from "@/hooks/admin/use-toast";
import { addTicket, updateTicket } from "@/services/admin/ticket_data_service";

export default function TicketDialog({ open, onOpenChange, ticket, onClose }) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      basePrice: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (!open) {
      reset({
        name: "",
        code: "",
        basePrice: "",
        isActive: true,
      });
    }
  }, [open, reset]);

  useEffect(() => {
    if (ticket && open) {
      setValue("name", ticket.name);
      setValue("code", ticket.code);
      setValue("basePrice", ticket.basePrice);
      setValue("isActive", ticket.isActive);
    }
  }, [ticket, open, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      if (ticket) {
        await updateTicket(ticket.id, data);
        toast({ description: "票種已更新" });
      } else {
        await addTicket(data);
        toast({ description: "票種已新增" });
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
      if (!open) {
        handleClose();
      }
      onOpenChange(open);
    }}>
      <DialogContent className="bg-gray-800 text-white border-gray-700 border-2">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {ticket ? "編輯票種" : "新增票種"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">票種名稱</Label>
            <Input
              id="name"
              className="bg-gray-700 border-gray-600 text-white"
              {...register("name", {
                required: "請輸入票種名稱",
                maxLength: {
                  value: 20,
                  message: "票種名稱不能超過20個字",
                },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="code">代碼</Label>
            <Input
              id="code"
              className="bg-gray-700 border-gray-600 text-white"
              {...register("code", {
                required: "請輸入代碼",
                pattern: {
                  value: /^[a-z0-9_]+$/,
                  message: "代碼只能包含小寫字母、數字和底線",
                },
              })}
            />
            {errors.code && (
              <p className="text-sm text-red-500 mt-1">{errors.code.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="basePrice">基本票價</Label>
            <Input
              id="basePrice"
              type="number"
              className="bg-gray-700 border-gray-600 text-white"
              {...register("basePrice", {
                required: "請輸入基本票價",
                min: {
                  value: 0,
                  message: "票價不能小於0",
                },
                max: {
                  value: 9999,
                  message: "票價不能超過9999",
                },
              })}
            />
            {errors.basePrice && (
              <p className="text-sm text-red-500 mt-1">{errors.basePrice.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              name="isActive"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch
                  id="isActive"
                  checked={value}
                  onCheckedChange={onChange}
                  className="data-[state=checked]:bg-green-500/50 data-[state=unchecked]:bg-gray-600"
                />
              )}
            />
            <Label htmlFor="isActive">
              啟用
            </Label>
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
              {ticket ? "更新" : "新增"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
