export const usersData = [
  {
    id: "user_001",
    username: "john_doe",
    email: "john.doe@example.com",
    name: "王大明",
    phone: "0912-345-678",
    membershipLevel: "gold", // gold, silver, regular
    points: 1500,
    bookings: [
      {
        bookingId: "booking_001",
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
        bookingId: "booking_004",
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
      }
    ],
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-03-01")
  },
  {
    id: "user_002",
    username: "jane_smith",
    email: "jane.smith@example.com",
    name: "林小美",
    phone: "0923-456-789",
    membershipLevel: "silver",
    points: 800,
    bookings: [
      {
        bookingId: "booking_002",
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
      }
    ],
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2024-02-15")
  },
  {
    id: "user_003",
    username: "david_chen",
    email: "david.chen@example.com",
    name: "陳志明",
    phone: "0934-567-890",
    membershipLevel: "regular",
    points: 300,
    bookings: [
      {
        bookingId: "booking_003",
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
      }
    ],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-03-10")
  }
]; 