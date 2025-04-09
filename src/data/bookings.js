export const bookingsData = [
  {
    id: "bookings_001",
    userId: "user_001",
    userName: "王大明",
    movieId: "movie_001",
    movieName: "奇異博士2",
    theaterId: "theater_north",
    theaterName: "台北影城",
    showtimeId: "showtime_001",
    seats: ["A1", "A2"],
    date: "2024-03-20",
    startTime: "14:30",
    totalAmount: 680, // 2張全票
    ticketType: {
      adult: 2,
      student: 0,
      child: 0,
      senior: 0
    },
    paymentStatus: "paid", // paid, pending, cancelled
    paymentMethod: "credit_card",
    bookingsDate: new Date("2024-03-15T10:30:00"),
    status: "confirmed", // confirmed, cancelled
    updatedAt: new Date("2024-03-15T10:30:00")
  },
  {
    id: "bookings_002",
    userId: "user_002",
    userName: "林小美",
    movieId: "movie_003",
    movieName: "玩具總動員5",
    theaterId: "theater_south",
    theaterName: "高雄影城",
    showtimeId: "showtime_006",
    date: "2024-03-20",
    startTime: "14:30",
    seats: ["C7", "C8"],
    totalAmount: 540,
    ticketType: {
      adult: 1,
      student: 2,
      child: 0,
      senior: 0
    },
    paymentStatus: "paid",
    paymentMethod: "line_pay",
    bookingsDate: new Date("2024-03-16T14:20:00"),
    status: "confirmed",
    updatedAt: new Date("2024-03-16T14:20:00")
  },
  {
    id: "bookings_003",
    userId: "user_003",
    userName: "張三",
    movieId: "movie_002",
    movieName: "蜘蛛人：無家日",
    theaterId: "theater_central",
    theaterName: "台中影城",
    showtimeId: "showtime_005",
    date: "2024-03-20",
    startTime: "14:30",
    seats: ["C1", "C2", "C3", "C4"],
    totalAmount: 1220, // 2張全票，2張敬老票
    ticketType: {
      adult: 2,
      student: 0,
      child: 0,
      senior: 2
    },
    paymentStatus: "cancelled",
    paymentMethod: "credit_card",
    bookingsDate: new Date("2024-03-17T09:15:00"),
    status: "cancelled",
    updatedAt: new Date("2024-03-17T09:20:00")
  }
]; 