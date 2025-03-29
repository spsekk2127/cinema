"use client";

import { useState } from "react";
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
import HallDialog from "./HallDialog";
import { useToast } from "@/hooks/admin/use-toast";

export default function HallManagement({
  theaterId,
  halls = [],
  onHallsChange,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHall, setEditingHall] = useState(null);
  const { toast } = useToast();

  const handleEdit = (hall) => {
    setEditingHall(hall);
    setIsDialogOpen(true);
  };

  const handleDelete = (hallId) => {
    if (window.confirm("確定要刪除此影廳嗎？")) {
      const newHalls = halls.filter((hall) => hall.id !== hallId);
      onHallsChange(newHalls);
      toast({ description: "影廳已刪除" });
    }
  };

  const handleSave = (hallData) => {
    let newHalls;
    if (editingHall) {
      // 更新現有影廳
      newHalls = halls.map((hall) =>
        hall.id === editingHall.id ? { ...hall, ...hallData } : hall
      );
    } else {
      // 新增影廳
      const newHall = {
        id: `hall_${Date.now()}`,
        ...hallData,
      };
      newHalls = [...halls, newHall];
    }
    onHallsChange(newHalls);
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">影廳列表</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-400"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-4 w-4 text-center" />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow
            className="border-gray-700 text-white hover:bg-gray-700"
          >
            <TableHead className="text-gray-200">影廳名稱</TableHead>
            <TableHead className="text-gray-200">座位數</TableHead>
            <TableHead className="text-gray-200">排數</TableHead>
            <TableHead className="text-gray-200">每排座位</TableHead>
            <TableHead className="text-gray-200 text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {halls.map((hall) => (
            <TableRow key={hall.id} className="border-gray-700 hover:bg-gray-700">
              <TableCell className="text-gray-200">{hall.name}</TableCell>
              <TableCell className="text-gray-200">{hall.capacity}</TableCell>
              <TableCell className="text-gray-200">
                {hall.rows?.length || 0}
              </TableCell>
              <TableCell className="text-gray-200">
                {hall.seatsPerRow || 0}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-400"
                    onClick={() => handleEdit(hall)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400"
                    onClick={() => handleDelete(hall.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <HallDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        hall={editingHall}
        onClose={() => {
          setEditingHall(null);
          setIsDialogOpen(false);
        }}
        onSave={handleSave}
      />
    </div>
  );
}
