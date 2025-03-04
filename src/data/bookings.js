export const bookingsData = [
  {
    id: "bookings_001",
    userId: "user_001",
    showtimeId: "showtime_001",
    seats: ["A1", "A2"],
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
    showtimeId: "showtime_003",
    seats: ["B3", "B4", "B5"],
    totalAmount: 870, // 1張全票，2張學生票
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
    showtimeId: "showtime_005",
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