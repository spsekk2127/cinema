"use client";

import { useState } from "react";
import { Button } from "@/components/admin/ui/button";
import { Label } from "@/components/admin/ui/label";

const SEAT_TYPES = {
  AVAILABLE: "available",
  BLOCKED: "blocked",
  AISLE: "aisle",
};

const SEAT_COLORS = {
  [SEAT_TYPES.AVAILABLE]: "bg-blue-600 hover:bg-blue-700",
  [SEAT_TYPES.BLOCKED]: "bg-gray-700 hover:bg-gray-800",
  [SEAT_TYPES.AISLE]: "bg-transparent",
};

export default function SeatLayout({ rows, seatsPerRow, layout, onChange }) {
  const [selectedType, setSelectedType] = useState(SEAT_TYPES.AVAILABLE);

  // 初始化座位布局
  const [seatMap, setSeatMap] = useState(() => {
    if (layout) return layout;

    // 創建預設布局
    const initialLayout = {};
    for (let row of rows) {
      initialLayout[row] = Array(seatsPerRow).fill(SEAT_TYPES.AVAILABLE);
    }
    return initialLayout;
  });

  const handleSeatClick = (row, seatIndex) => {
    const newSeatMap = {
      ...seatMap,
      [row]: [...seatMap[row]],
    };
    newSeatMap[row][seatIndex] = selectedType;
    setSeatMap(newSeatMap);
    onChange?.(newSeatMap);
  };

  const getSeatButton = (row, seatIndex) => {
    const seatType = seatMap[row][seatIndex];
    return (
      <Button
        key={`${row}-${seatIndex}`}
        className={`w-8 h-8 m-0.5 p-0 text-xs font-medium ${SEAT_COLORS[seatType]}`}
        onClick={() => handleSeatClick(row, seatIndex)}
      >
        {seatType !== SEAT_TYPES.AISLE ? `${row}${seatIndex + 1}` : ""}
      </Button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>座位類型</Label>
        <div className="flex space-x-2">
          <Button
            className={`${SEAT_COLORS[SEAT_TYPES.AVAILABLE]} ${
              selectedType === SEAT_TYPES.AVAILABLE ? "ring-2 ring-white" : ""
            }`}
            onClick={() => setSelectedType(SEAT_TYPES.AVAILABLE)}
          >
            一般座位
          </Button>
          <Button
            className={`${SEAT_COLORS[SEAT_TYPES.BLOCKED]} ${
              selectedType === SEAT_TYPES.BLOCKED ? "ring-2 ring-white" : ""
            }`}
            onClick={() => setSelectedType(SEAT_TYPES.BLOCKED)}
          >
            禁用座位
          </Button>
          <Button
            className={`border border-dashed border-gray-500 ${
              selectedType === SEAT_TYPES.AISLE ? "ring-2 ring-white" : ""
            }`}
            onClick={() => setSelectedType(SEAT_TYPES.AISLE)}
          >
            走道
          </Button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
        <div className="flex justify-center mb-4">
          <div className="w-48 bg-gray-700 rounded text-center text-sm">螢幕</div>
        </div>

        <div className="flex flex-col items-center">
          {rows.map((row) => (
            <div key={row} className="flex">
              <span className="w-6 text-center text-gray-400 mr-2 leading-8">
                {row}
              </span>
              <div className="flex">
                {Array.from({ length: seatsPerRow }).map((_, index) =>
                  getSeatButton(row, index)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
