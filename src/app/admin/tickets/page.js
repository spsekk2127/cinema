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
import TicketDialog from "@/components/admin/TicketDialog";
import { getAllTickets, deleteTicket } from "@/services/ticket_data_service";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/admin/ui/tooltip";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const data = await getAllTickets();
    setTickets(data);
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setIsDialogOpen(true);
  };

  const handleDelete = async (ticketId) => {
    if (window.confirm("確定要刪除此票種嗎？")) {
      try {
        await deleteTicket(ticketId);
        toast({
          description: "票種已刪除",
        });
        fetchTickets();
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
        <h1 className="text-2xl font-bold text-white">票種管理</h1>
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
              <p>新增票種</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 text-base">
              <TableHead className="text-gray-200 ps-3 w-[25%]">
                票種名稱
              </TableHead>
              <TableHead className="text-gray-200 w-[20%]">代碼</TableHead>
              <TableHead className="text-gray-200 text-center w-[15%]">
                基本票價
              </TableHead>
              <TableHead className="text-gray-200 text-center w-[20%]">
                狀態
              </TableHead>
              <TableHead className="text-right text-gray-200 pe-4 w-[20%]">
                操作
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id} className="border-gray-700 text-base">
                <TableCell className="text-gray-200 ps-3 w-[25%]">
                  {ticket.name}
                </TableCell>
                <TableCell className="text-gray-200 w-[20%]">
                  {ticket.code}
                </TableCell>
                <TableCell className="text-gray-200 text-center w-[15%]">
                  ${ticket.basePrice}
                </TableCell>
                <TableCell className="text-gray-200 text-center w-[20%]">
                  {ticket.isActive ? "啟用" : "停用"}
                </TableCell>
                <TableCell className="text-right w-[20%]">
                  <div className="flex justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-400"
                            onClick={() => handleEdit(ticket)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>編輯票種</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400"
                            onClick={() => handleDelete(ticket.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>刪除票種</p>
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

      <TicketDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        ticket={editingTicket}
        onClose={() => {
          setEditingTicket(null);
          setIsDialogOpen(false);
          fetchTickets();
        }}
      />
    </div>
  );
}
