export const showtimesData = [
    // 台北 - 奇異博士2
    {
      id: "showtime_001",
      movieId: "movie_001", // 奇異博士2
      theaterId: "theater_north",
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
      totalSeats: 40,
      availableSeats: generateSeats(40), // 這個函數需要另外實作
      bookedSeats: [],
      status: "available",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "showtime_002",
      movieId: "movie_001",
      theaterId: "theater_north",
      hallId: "hall_1",
      date: "2024-03-20",
      startTime: "17:00",
      endTime: "19:15",
      price: {
        adult: 340,
        student: 300,
        child: 270,
        senior: 270
      },
      totalSeats: 40,
      availableSeats: generateSeats(40),
      bookedSeats: [],
      status: "available",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
    // 台中 - 蜘蛛人
    {
      id: "showtime_003",
      movieId: "movie_002", // 蜘蛛人
      theaterId: "theater_central",
      hallId: "hall_2",
      date: "2024-03-20",
      startTime: "13:30",
      endTime: "15:50",
      price: {
        adult: 340,
        student: 300,
        child: 270,
        senior: 270
      },
      totalSeats: 45,
      availableSeats: generateSeats(45),
      bookedSeats: [],
      status: "available",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "showtime_004",
      movieId: "movie_002",
      theaterId: "theater_central",
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
      totalSeats: 45,
      availableSeats: generateSeats(45),
      bookedSeats: [],
      status: "available",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
    // 高雄 - 玩具總動員5
    {
      id: "showtime_005",
      movieId: "movie_003", // 玩具總動員5
      theaterId: "theater_south",
      hallId: "hall_3",
      date: "2024-03-20",
      startTime: "12:30",
      endTime: "14:25",
      price: {
        adult: 340,
        student: 300,
        child: 270,
        senior: 270
      },
      totalSeats: 50,
      availableSeats: generateSeats(50),
      bookedSeats: [],
      status: "available",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "showtime_006",
      movieId: "movie_003",
      theaterId: "theater_south",
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
      totalSeats: 50,
      availableSeats: generateSeats(50),
      bookedSeats: [],
      status: "available",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  // create seats
  function generateSeats(capacity) {
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = Math.ceil(capacity / rows.length);
    
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        seats.push(`${row}${i}`);
        if (seats.length >= capacity) break;
      }
    });
    
    return seats;
  }