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
import { useToast } from "@/hooks/admin/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/admin/ui/tooltip";
import ShowtimeDialog from "@/components/admin/ShowtimeDialog";
import {
  getAllShowtimes,
  deleteShowtime,
} from "@/services/admin/showtimes_data_admin_service";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";

export default function ShowtimesPage() {
  const [showtimes, setShowtimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState(null);
  const { toast } = useToast();

  const fetchShowtimes = async () => {
    try {
      const data = await getAllShowtimes();
      setShowtimes(data);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
      toast({
        variant: "destructive",
        description: "載入場次資料失敗",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShowtimes();
  }, []);

  const handleEdit = (showtime) => {
    setEditingShowtime(showtime);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("確定要刪除此場次嗎？")) {
      try {
        await deleteShowtime(id);
        await fetchShowtimes();
        toast({ description: "場次已刪除" });
      } catch (error) {
        console.error("Error deleting showtime:", error);
        toast({
          variant: "destructive",
          description: "刪除場次失敗",
        });
      }
    }
  };

  const handleDialogClose = () => {
    setEditingShowtime(null);
    setIsDialogOpen(false);
    fetchShowtimes();
  };

  // 新增一個格式化日期的函數
  const formatDate = (dateValue) => {
    try {
      if (!dateValue) return "未設定";

      // 如果是 Firestore Timestamp
      if (dateValue?.toDate) {
        return format(dateValue.toDate(), "yyyy/MM/dd", { locale: zhTW });
      }

      // 如果是字串格式
      return format(new Date(dateValue), "yyyy/MM/dd", { locale: zhTW });
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateValue; // 直接返回原始值
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">載入中...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">場次管理</h1>
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
              <p>新增場次</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 text-base hover:bg-gray-700">
              <TableHead className="text-gray-400 ps-3 w-[20%]">電影</TableHead>
              <TableHead className="text-gray-400">影城</TableHead>
              <TableHead className="text-gray-400">影廳</TableHead>
              <TableHead className="text-gray-400">日期</TableHead>
              <TableHead className="text-gray-400">時間</TableHead>
              <TableHead className="text-gray-400">票價</TableHead>
              <TableHead className="text-gray-400">座位</TableHead>
              <TableHead className="text-gray-400">狀態</TableHead>
              <TableHead className="text-gray-400 pe-4 text-right">
                操作
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showtimes.map((showtime) => (
              <TableRow
                key={showtime.id}
                className="border-gray-700 text-base hover:bg-gray-700"
              >
                <TableCell className="text-white ps-3">
                  {showtime.movieTitle}
                </TableCell>
                <TableCell className="text-white">
                  {showtime.theaterName}
                </TableCell>
                <TableCell className="text-white">
                  {showtime.hallName}
                </TableCell>
                <TableCell className="text-white">
                  {formatDate(showtime.date)}
                </TableCell>
                <TableCell className="text-white">
                  {showtime.startTime} - {showtime.endTime}
                </TableCell>
                <TableCell className="text-white">
                  <div className="space-y-1 text-sm">
                    <div>全票: ${showtime.price.adult}</div>
                    <div>學生: ${showtime.price.student}</div>
                    <div>兒童: ${showtime.price.child}</div>
                    <div>敬老: ${showtime.price.senior}</div>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  {showtime.availableSeats?.length || 0}/{showtime.totalSeats}
                </TableCell>
                <TableCell className="text-white">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      showtime.status === "available"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {showtime.status === "available" ? "上映中" : "已結束"}
                  </span>
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
                            onClick={() => handleEdit(showtime)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>編輯場次</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400"
                            onClick={() => handleDelete(showtime.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>刪除場次</p>
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
      <ShowtimeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        showtime={editingShowtime}
        onClose={handleDialogClose}
      />
    </div>
  );
}
