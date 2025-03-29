"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/admin/ui/tooltip";
import { useToast } from "@/hooks/admin/use-toast";
import TheaterDialog from "@/components/admin/TheaterDialog";
import {
  getAllTheaters,
  deleteTheater,
} from "@/services/admin/theaters_data_admin_service";

export default function TheatersPage() {
  const [theaters, setTheaters] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTheater, setEditingTheater] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    const data = await getAllTheaters();
    setTheaters(data);
  };

  const handleEdit = (theater) => {
    setEditingTheater(theater);
    setIsDialogOpen(true);
  };

  const handleDelete = async (theaterId) => {
    if (window.confirm("確定要刪除此影城嗎？")) {
      try {
        await deleteTheater(theaterId);
        toast({
          description: "影城已刪除",
        });
        fetchTheaters();
      } catch (error) {
        toast({
          variant: "destructive",
          description: "刪除失敗，請稍後再試",
        });
      }
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">影城管理</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-400"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-4 w-4 text-center" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>新增影城</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 text-base hover:bg-gray-700">
              <TableHead className="text-gray-400 ps-3 w-[15%]">影城名稱</TableHead>
              <TableHead className="text-gray-400 w-[10%]">地區</TableHead>
              <TableHead className="text-gray-400 w-[35%]">地址</TableHead>
              <TableHead className="text-gray-400 w-[15%]">聯絡電話</TableHead>
              <TableHead className="text-gray-400 text-center w-[15%]">影廳數量</TableHead>
              <TableHead className="text-gray-400 w-[10%] pe-4 text-right">
                操作
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {theaters.map((theater) => (
              <TableRow key={theater.id} className="border-gray-700 text-base hover:bg-gray-700">
                <TableCell className="text-gray-200 ps-3">
                  {theater.name}
                </TableCell>
                <TableCell className="text-gray-200">
                  {theater.region}
                </TableCell>
                <TableCell className="text-gray-200">
                  {theater.address}
                </TableCell>
                <TableCell className="text-gray-200">{theater.phone}</TableCell>
                <TableCell className="text-gray-200 text-center">
                  {theater.halls?.length || 0} 廳
                </TableCell>
                <TableCell className="text-right pe-4">
                  <div className="flex justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-400"
                            onClick={() => handleEdit(theater)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>編輯影城</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400"
                            onClick={() => handleDelete(theater.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>刪除影城</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TheaterDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        theater={editingTheater}
        onClose={() => {
          setEditingTheater(null);
          setIsDialogOpen(false);
          fetchTheaters();
        }}
      />
    </div>
  );
}
