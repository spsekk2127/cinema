'use client';

import { useState, useEffect } from 'react';
import { Search } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin/ui/table";
import { useToast } from "@/hooks/admin/use-toast";
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { getAllOrders } from '@/services/admin/orders_data_admin_service';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        variant: "destructive",
        description: "載入訂單資料失敗",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return '已確認';
      case 'pending':
        return '待處理';
      case 'cancelled':
        return '已取消';
      default:
        return '未知狀態';
    }
  };

  const formatTickets = (tickets) => {
    if (!tickets) return '';

    const ticketTypes = {
      adult: '全票',
      student: '學生票',
      child: '兒童票',
      senior: '敬老票'
    };

    return Object.entries(tickets)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => `${ticketTypes[type]}: ${count}`)
      .join(', ');
  };

  const filteredOrders = orders.filter(order => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (order?.bookingId || '').toLowerCase().includes(searchTermLower) ||
      (order?.userName || '').toLowerCase().includes(searchTermLower) ||
      (order?.movieName || '').toLowerCase().includes(searchTermLower)
    );
  });

  if (isLoading) {
    return <div className="text-center p-4">載入中...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">訂單管理</h1>
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="搜尋訂單..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 text-base hover:bg-gray-700">
            <TableHead className="text-gray-400">訂單編號</TableHead>
            <TableHead className="text-gray-400">會員姓名</TableHead>
            <TableHead className="text-gray-400">電影</TableHead>
            <TableHead className="text-gray-400">影城/影廳</TableHead>
            <TableHead className="text-gray-400">日期/時間</TableHead>
            <TableHead className="text-gray-400">座位</TableHead>
            <TableHead className="text-gray-400">票種</TableHead>
            <TableHead className="text-gray-400">金額</TableHead>
            <TableHead className="text-gray-400">狀態</TableHead>
            <TableHead className="text-gray-400">建立時間</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order, index) => (
            <TableRow 
              key={order.bookingId || order.id || `order-${index}`} 
              className="border-gray-700 text-base hover:bg-gray-700"
            >
              <TableCell className="font-medium text-white">
                {order.id || '無訂單編號'}
              </TableCell>
              <TableCell className="text-white">
                {order.userName || '無姓名'}
              </TableCell>
              <TableCell className="text-white">
                {order.movieName || '無電影名稱'}
              </TableCell>
              <TableCell className="text-white">
                {order.theaterName || '無影城資訊'}
              </TableCell>
              <TableCell className="text-white">
                {order.date || '無日期'}
                <br />
                {order.startTime || '無時間'}
              </TableCell>
              <TableCell className="text-white">
                {Array.isArray(order.seats) ? order.seats.join(', ') : '無座位資訊'}
              </TableCell>
              <TableCell className="text-white">
                {formatTickets(order.ticketType)}
              </TableCell>
              <TableCell className="text-white">
                ${order.totalAmount || 0}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </TableCell>
              <TableCell className="text-white">
                {order.createdAt ? 
                  format(new Date(order.createdAt), 'yyyy/MM/dd HH:mm', { locale: zhTW }) 
                  : '無建立時間'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 