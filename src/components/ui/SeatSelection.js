import { useState } from "react";
import { theatersData } from "@/data/theaters";
// 座位選擇處理
// showtime: 場次資料
// maxSeats: 最大座位數量
// onSeatSelect: 座位選擇回調函數
// selectedSeats: 已選擇的座位
const SeatSelection = ({ showtime, maxSeats, onSeatSelect, selectedSeats }) => {
  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      // 如果已選擇的座位包含該座位，則移除該座位
      onSeatSelect(selectedSeats.filter(id => id !== seatId));
    } else if (selectedSeats.length < maxSeats) {
      // 如果已選擇的座位數量小於最大座位數量，則新增該座位
      onSeatSelect([...selectedSeats, seatId]);
    }
  };

  // 生成座位配置
  const seats = generateSeatLayout(showtime);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* 電影螢幕 */}
      <div className="mb-8">
        <div className="w-full h-10 bg-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-800">
          螢幕位置
        </div>
      </div>

      {/* 座位狀態範例 */}
      <div className="flex gap-4 mb-6 justify-center text-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <span>可選擇</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded"></div>
          <span>已選擇</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <span>已售出</span>
        </div>
      </div>

      {/* 座位區域 */}
      <div className="flex flex-col items-center">
        <div className="space-y-2">
          {Array.from(new Set(seats.map(seat => seat.row))).map(row => (
            <div key={row} className="flex items-center justify-center">
              <div className="w-8 text-center text-gray-400">{row}</div>
              <div className="flex gap-2">
                {seats
                  .filter(seat => seat.row === row)
                  .map((seat) => (
                    <button
                      key={seat.id}
                      disabled={seat.isBooked || seat.isUnavailable}
                      className={`
                        w-8 h-8 rounded text-xs flex items-center justify-center
                        ${seat.isWalkway ? "mr-4" : ""}
                        ${
                          seat.isBooked
                            ? "bg-gray-400 cursor-not-allowed"
                            : seat.isUnavailable
                            ? "invisible"
                            : selectedSeats.includes(seat.id)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }
                      `}
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      {seat.label}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 已選座位資訊 */}
      <div className="mt-6">
        <h3 className="font-bold mb-2 text-white">已選座位：</h3>
        <div className="flex flex-wrap gap-2">
          {selectedSeats.map((seatId) => (
            <span key={seatId} className="px-2 py-1 bg-blue-600 rounded text-center text-white">
              {seatId}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// 生成座位配置函數
const generateSeatLayout = (showtime) => {
  if (!showtime) return [];
  
  // 從 theatersData 中找到對應的影廳數據
  const theater = theatersData.find(t => t.id === showtime.theaterId);
  const hall = theater?.halls.find(h => h.id === showtime.hallId);
  
  if (!hall) return [];

  // 使用影廳的座位設定
  const {
    rows,            
    seatsPerRow,     
    unavailableSeats = ['A5','B3'] // 從影廳設定獲取不可用座位
  } = hall.seatLayout;

  // 從 showtime 獲取已訂位的座位
  const bookedSeats = showtime.bookedSeats || [];

  const seats = [];
  rows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      const seatId = `${row}${i}`;
      seats.push({
        id: seatId,
        label: i,
        row: row,
        isBooked: bookedSeats.includes(seatId),
        // 檢查座位是否在不可用列表中
        isUnavailable: unavailableSeats.includes(seatId)
      });
    }
  });

  return seats;
};

export default SeatSelection;
