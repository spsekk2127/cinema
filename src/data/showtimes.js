import { theatersData } from "@/data/theaters";

export const showtimesData = [
  // 奇異博士2 - 台北、台中
  {
    id: "showtime_001",
    movieId: "movie_001",
    theaterId: "theater_north", // 台北
    hallId: "hall_1",
    date: "2024-03-20",
    startTime: "14:30",
    endTime: "16:45",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 40,
    availableSeats: generateSeats(40, "hall_1"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "showtime_002",
    movieId: "movie_001",
    theaterId: "theater_central", // 台中
    hallId: "hall_2",
    date: "2024-03-20",
    startTime: "15:00",
    endTime: "17:15",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 45,
    availableSeats: generateSeats(45, "hall_2"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 蜘蛛人 - 台中、高雄
  {
    id: "showtime_003",
    movieId: "movie_002",
    theaterId: "theater_central", // 台中
    hallId: "hall_1",
    date: "2024-03-20",
    startTime: "13:30",
    endTime: "15:50",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 40,
    availableSeats: generateSeats(40, "hall_1"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "showtime_004",
    movieId: "movie_002",
    theaterId: "theater_south", // 高雄
    hallId: "hall_2",
    date: "2024-03-20",
    startTime: "16:10",
    endTime: "18:30",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 45,
    availableSeats: generateSeats(45, "hall_2"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 玩具總動員5 - 台北、高雄
  {
    id: "showtime_005",
    movieId: "movie_003",
    theaterId: "theater_north", // 台北
    hallId: "hall_2",
    date: "2024-03-20",
    startTime: "12:30",
    endTime: "14:25",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 45,
    availableSeats: generateSeats(45, "hall_2"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "showtime_006",
    movieId: "movie_003",
    theaterId: "theater_south", // 高雄
    hallId: "hall_3",
    date: "2024-03-20",
    startTime: "14:45",
    endTime: "16:40",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 50,
    availableSeats: generateSeats(50, "hall_3"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 蜘蛛人：返校日 - 台北、台中
  {
    id: "showtime_007",
    movieId: "movie_004",
    theaterId: "theater_north", // 台北
    hallId: "hall_3",
    date: "2024-03-20",
    startTime: "17:30",
    endTime: "19:43",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 50,
    availableSeats: generateSeats(50, "hall_3"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "showtime_008",
    movieId: "movie_004",
    theaterId: "theater_central", // 台中
    hallId: "hall_3",
    date: "2024-03-20",
    startTime: "18:00",
    endTime: "20:13",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 50,
    availableSeats: generateSeats(50, "hall_3"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 魔物獵人 - 台中、高雄
  {
    id: "showtime_009",
    movieId: "movie_005",
    theaterId: "theater_central", // 台中
    hallId: "hall_1",
    date: "2024-03-20",
    startTime: "19:30",
    endTime: "21:43",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 40,
    availableSeats: generateSeats(40, "hall_1"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "showtime_010",
    movieId: "movie_005",
    theaterId: "theater_south", // 高雄
    hallId: "hall_1",
    date: "2024-03-20",
    startTime: "20:00",
    endTime: "22:13",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 40,
    availableSeats: generateSeats(40, "hall_1"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 為奇異博士2新增場次 (台北、台中)
  {
    id: "showtime_011",
    movieId: "movie_001",
    theaterId: "theater_north",
    hallId: "hall_1",
    date: "2024-03-20",
    startTime: "19:30",
    endTime: "21:45",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 40,
    availableSeats: generateSeats(40, "hall_1"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "showtime_012",
    movieId: "movie_001",
    theaterId: "theater_central",
    hallId: "hall_2",
    date: "2024-03-20",
    startTime: "20:00",
    endTime: "22:15",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 45,
    availableSeats: generateSeats(45, "hall_2"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 為蜘蛛人新增場次 (台中、高雄)
  {
    id: "showtime_013",
    movieId: "movie_002",
    theaterId: "theater_central",
    hallId: "hall_1",
    date: "2024-03-20",
    startTime: "21:00",
    endTime: "23:20",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 40,
    availableSeats: generateSeats(40, "hall_1"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "showtime_014",
    movieId: "movie_002",
    theaterId: "theater_south",
    hallId: "hall_2",
    date: "2024-03-20",
    startTime: "21:30",
    endTime: "23:50",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 45,
    availableSeats: generateSeats(45, "hall_2"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 為玩具總動員5新增場次 (台北、高雄)
  {
    id: "showtime_015",
    movieId: "movie_003",
    theaterId: "theater_north",
    hallId: "hall_2",
    date: "2024-03-20",
    startTime: "17:30",
    endTime: "19:25",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 45,
    availableSeats: generateSeats(45, "hall_2"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "showtime_016",
    movieId: "movie_003",
    theaterId: "theater_south",
    hallId: "hall_3",
    date: "2024-03-20",
    startTime: "19:45",
    endTime: "21:40",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 50,
    availableSeats: generateSeats(50, "hall_3"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 為蜘蛛人：返校日新增場次 (台北、台中)
  {
    id: "showtime_017",
    movieId: "movie_004",
    theaterId: "theater_north",
    hallId: "hall_3",
    date: "2024-03-20",
    startTime: "22:00",
    endTime: "00:13",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 50,
    availableSeats: generateSeats(50, "hall_3"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "showtime_018",
    movieId: "movie_004",
    theaterId: "theater_central",
    hallId: "hall_3",
    date: "2024-03-20",
    startTime: "22:30",
    endTime: "00:43",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 50,
    availableSeats: generateSeats(50, "hall_3"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // 為魔物獵人新增場次 (台中、高雄)
  {
    id: "showtime_019",
    movieId: "movie_005",
    theaterId: "theater_central",
    hallId: "hall_1",
    date: "2024-03-20",
    startTime: "23:00",
    endTime: "01:13",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 270
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 40,
    availableSeats: generateSeats(40, "hall_1"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "showtime_020",
    movieId: "movie_005",
    theaterId: "theater_south",
    hallId: "hall_1",
    date: "2024-03-20",
    startTime: "23:30",
    endTime: "01:43",
    price: {
      adult: 340,
      student: 300,
      child: 270,
      senior: 0
    },
    ticketSold: {
      adult: 0,
      student: 0,
      child: 0,
      senior: 0
    },
    totalSeats: 40,
    availableSeats: generateSeats(40, "hall_1"),
    bookedSeats: [],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// 修改生成座位函數
function generateSeats(capacity, hallId) {
  // 從 theatersData 找到對應的影廳資料
  const hall = theatersData
    .flatMap(theater => theater.halls)
    .find(hall => hall.id === hallId);

  if (!hall) return [];

  const { rows, seatsPerRow, walkwayAfterColumn } = hall.seatLayout;
  const unavailableSeats = hall.unavailableSeats || [];
  const seats = [];
  
  rows.forEach(row => {
    for (let i = 1; i <= seatsPerRow; i++) {
      const seatNumber = `${row}${i}`;
      // 檢查是否為不可用座位
      if (!unavailableSeats.includes(seatNumber)) {
        seats.push(seatNumber);
      }
      if (seats.length >= capacity) break;
    }
  });
  
  return seats;
}