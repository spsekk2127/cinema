import { theatersData } from "@/data/theaters";
import { useState } from "react";

function TicketTypeSelection({ showtime, onTicketSelect }) {
  const [selectedTickets, setSelectedTickets] = useState({
    adult: 0,
    student: 0,
    child: 0,
    senior: 0,
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);

  // 取得影城和影廳資料
  const theater = theatersData.find((t) => t.id === showtime.theaterId);
  const hall = theater?.halls.find((h) => h.id === showtime.hallId);

  // 如果沒有提供 onTicketSelect 回調函數，則提供一個空函數
  if (!onTicketSelect) {
    onTicketSelect = () => {};
  }

  // 計算每種票型可購買的最大數量，單次購買最多六張
  function getMaxTickets(type) {
    if (!hall) return 0;
    const quota = hall.ticketQuota[type]; //影廳票種配置
    const sold = showtime.ticketSold[type]; //影廳票種已售出
    const remaining = quota.maxPerShow - sold; //影廳票種剩餘
    return Math.min(remaining, 6 - totalTickets + selectedTickets[type]); //影廳票種剩餘票數
  }

  // 票數變更
  // type:票種
  // delta:票數變更
  // newCount:票數變更後的票數
  // newTotal:票數變更後的總票數

  function handleTicketChange(type, delta) {
    const newCount = selectedTickets[type] + delta; //票數變更
    const newTotal = totalTickets + delta; //總票數變更

    if (newCount < 0 || newCount > getMaxTickets(type)) return;
    if (newTotal > 6) return;

    const newSelectedTickets = {
      ...selectedTickets,
      [type]: newCount,
    };
    setSelectedTickets(newSelectedTickets);

    // 計算新的總金額和總票數
    let amount = 0;
    let count = 0;
    Object.entries(newSelectedTickets).forEach(([ticketType, quantity]) => {
      amount += showtime.price[ticketType] * quantity;
      count += quantity;
    });

    setTotalAmount(amount);
    setTotalTickets(count);

    // 呼叫父元件的回調函數
    onTicketSelect({
      selectedTickets: newSelectedTickets,
      totalAmount: amount,
    });
  }

  return (
    <div className="bg-gray-900 py-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4 text-white">選擇票種</h3>

      {/* ticket type selection area */}
      <div className="space-y-4">
        {Object.entries(theater.ticketTypes).map(([type, info]) => (
          <div
            key={type}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
          >
            <div>
              <span className="font-medium text-white">{info.name}</span>
              <span className="ml-2 text-gray-400">
                ${showtime.price[type]}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleTicketChange(type, -1)}
                disabled={selectedTickets[type] === 0}
                className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center 
                         disabled:opacity-50 hover:bg-gray-600 transition-colors text-2xl"
              >
                -
              </button>
              <span className="w-8 text-center text-white">
                {selectedTickets[type]}
              </span>
              <button
                onClick={() => handleTicketChange(type, 1)}
                disabled={selectedTickets[type] >= getMaxTickets(type)}
                className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center 
                         disabled:opacity-50 hover:bg-gray-600 transition-colors text-xl"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 總計區域 */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-medium text-white">總計: </span>
            <span className="text-lg text-gray-300">{totalTickets} 張票</span>
          </div>
          <div className="text-xl font-bold text-white">${totalAmount}</div>
        </div>
        <div className="text-sm text-gray-400 mt-2">*單次最多可購買 6 張票</div>
      </div>
    </div>
  );
}

export default TicketTypeSelection;
