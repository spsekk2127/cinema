export const ordersData = [
  {
    bookingId: "booking_001",
    userId: "user_001",
    userName: "王大明",
    movieId: "movie_001",
    movieName: "奇異博士2",
    theaterId: "theater_north",
    theaterName: "台北影城",
    showtimeId: "showtime_001",
    date: "2024-03-20",
    startTime: "14:30",
    seats: ["A1", "A2"],
    tickets: {
      adult: 1,
      student: 1,
      child: 0,
      senior: 0
    },
    totalAmount: 640,
    status: "confirmed",
    createdAt: new Date("2024-03-15")
  },
  {
    bookingId: "booking_002",
    userId: "user_002",
    userName: "林小美",
    movieId: "movie_003",
    movieName: "玩具總動員5",
    theaterId: "theater_south",
    theaterName: "高雄影城",
    showtimeId: "showtime_006",
    date: "2024-03-20",
    startTime: "14:45",
    seats: ["C7", "C8"],
    tickets: {
      adult: 0,
      student: 0,
      child: 2,
      senior: 0
    },
    totalAmount: 540,
    status: "confirmed",
    createdAt: new Date("2024-03-16")
  },
  {
    bookingId: "booking_003",
    userId: "user_003",
    userName: "陳志明",
    movieId: "movie_004",
    movieName: "蜘蛛人：返校日",
    theaterId: "theater_central",
    theaterName: "台中影城",
    showtimeId: "showtime_008",
    date: "2024-03-20",
    startTime: "18:00",
    seats: ["D1", "D2", "D3", "D4"],
    tickets: {
      adult: 2,
      student: 0,
      child: 1,
      senior: 1
    },
    totalAmount: 1220,
    status: "confirmed",
    createdAt: new Date("2024-03-17")
  },
  {
    bookingId: "booking_004",
    userId: "user_001",
    userName: "王大明",
    movieId: "movie_002",
    movieName: "蜘蛛人",
    theaterId: "theater_central",
    theaterName: "台中影城",
    showtimeId: "showtime_003",
    date: "2024-03-20",
    startTime: "13:30",
    seats: ["B3", "B4", "B5"],
    tickets: {
      adult: 2,
      student: 1,
      child: 0,
      senior: 0
    },
    totalAmount: 980,
    status: "confirmed",
    createdAt: new Date("2024-03-18")
  },
  {
    bookingId: "booking_005",
    userId: "user_002",
    userName: "林小美",
    movieId: "movie_005",
    movieName: "魔物獵人",
    theaterId: "theater_central",
    theaterName: "台中影城",
    showtimeId: "showtime_009",
    date: "2024-03-20",
    startTime: "19:30",
    seats: ["E5", "E6", "E7"],
    tickets: {
      adult: 1,
      student: 2,
      child: 0,
      senior: 0
    },
    totalAmount: 940,
    status: "pending",
    createdAt: new Date("2024-03-19")
  },
  {
    bookingId: "booking_006",
    userId: "user_003",
    userName: "陳志明",
    movieId: "movie_001",
    movieName: "奇異博士2",
    theaterId: "theater_north",
    theaterName: "台北影城",
    showtimeId: "showtime_011",
    date: "2024-03-20",
    startTime: "19:30",
    seats: ["F1", "F2"],
    tickets: {
      adult: 0,
      student: 2,
      child: 0,
      senior: 0
    },
    totalAmount: 600,
    status: "cancelled",
    createdAt: new Date("2024-03-19")
  }
]; 