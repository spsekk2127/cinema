"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
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
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/admin/use-toast";
import MovieDialog from "@/components/admin/MovieDialog";
import {
  getAllMovies,
  deleteMovie,
} from "@/services/admin/movies_data_admin_Service";

const STATUS_CONFIG = {
  true: {
    label: "上映中",
    className: "bg-green-500/10 text-green-500",
  },
  false: {
    label: "已下檔",
    className: "bg-gray-500/10 text-gray-500",
  },
};

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const data = await getAllMovies();
    setMovies(data);
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setIsDialogOpen(true);
  };

  const handleDelete = async (movieId) => {
    if (window.confirm("確定要刪除此電影嗎？")) {
      try {
        await deleteMovie(movieId);
        toast({
          description: "電影已刪除",
        });
        fetchMovies();
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
        <h1 className="text-2xl font-bold text-white">電影管理</h1>
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
              <p>新增電影</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 text-base hover:bg-gray-700">
              <TableHead className="text-gray-400 ps-3 w-[15%]">電影海報</TableHead>
              <TableHead className="text-gray-400 w-[20%]">電影名稱</TableHead>
              <TableHead className="text-gray-400 w-[30%]">簡介</TableHead>
              <TableHead className="text-gray-400 w-[15%]">上映日期</TableHead>
              <TableHead className="text-gray-400 w-[10%]">狀態</TableHead>
              <TableHead className="text-gray-400 w-[10%] pe-4 text-right">
                操作
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id} className="border-gray-700 text-base hover:bg-gray-700">
                <TableCell className="text-gray-200 ps-3">
                  <div className="relative w-[80px] h-[120px]">
                    <Image
                      src={movie.posterUrl}
                      alt={movie.title}
                      fill
                      sizes="80px"
                      className="object-cover rounded"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-gray-200 font-medium">
                  {movie.title}
                </TableCell>
                <TableCell className="text-gray-200">
                  <p className="line-clamp-2">{movie.description}</p>
                </TableCell>
                <TableCell className="text-gray-200">
                  {movie.releaseDate}
                </TableCell>
                <TableCell className="text-gray-200">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      STATUS_CONFIG[movie.status]?.className ||
                      "bg-gray-500/10 text-gray-500"
                    }`}
                  >
                    {STATUS_CONFIG[movie.status]?.label || "未知狀態"}
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
                            onClick={() => handleEdit(movie)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>編輯電影</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400"
                            onClick={() => handleDelete(movie.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>刪除電影</p>
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

      <MovieDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        movie={editingMovie}
        onClose={() => {
          setEditingMovie(null);
          setIsDialogOpen(false);
          fetchMovies();
        }}
      />
    </div>
  );
}
