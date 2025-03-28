export const theatersData = [
  {
    id: "theater_north",
    name: "台北虛擬",
    city: "台北市",
    region: "north",
    address: "台北市信義區松壽路20號",
    phone: "02-2345-6789",
    ticketTypes: {
      adult: {
        name: "全票",
        price: 340
      },
      student: {
        name: "學生票",
        price: 300
      },
      child: {
        name: "兒童票",
        price: 270
      },
      senior: {
        name: "敬老票",
        price: 270
      }
    },
    halls: [
      { 
        id: "hall_1", 
        name: "1廳", 
        capacity: 40,
        unavailableSeats: ["A1", "A2", "A3"],
        seatLayout: {
          rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          seatsPerRow: 5,
          walkwayAfterColumn: 3
        },
        ticketQuota: {
          adult: {
            percentage: 50,
            maxPerShow: 20
          },
          student: {
            percentage: 25,
            maxPerShow: 10
          },
          child: {
            percentage: 12.5,
            maxPerShow: 5
          },
          senior: {
            percentage: 12.5,
            maxPerShow: 5
          }
        }
      },
      { 
        id: "hall_2", 
        name: "2廳", 
        capacity: 45,
        unavailableSeats: ["B1", "B2", "C1", "C2"],
        seatLayout: {
          rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
          seatsPerRow: 5,
          walkwayAfterColumn: 3
        },
        ticketQuota: {
          adult: {
            percentage: 50,
            maxPerShow: 23
          },
          student: {
            percentage: 25,
            maxPerShow: 11
          },
          child: {
            percentage: 12.5,
            maxPerShow: 6
          },
          senior: {
            percentage: 12.5,
            maxPerShow: 5
          }
        }
      },
      { 
        id: "hall_3", 
        name: "3廳", 
        capacity: 50,
        unavailableSeats: ["H1", "H2", "I1", "I2"],
        seatLayout: {
          rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
          seatsPerRow: 5,
          walkwayAfterColumn: 3
        },
        ticketQuota: {
          adult: {
            percentage: 50,
            maxPerShow: 25
          },
          student: {
            percentage: 25,
            maxPerShow: 13
          },
          child: {
            percentage: 12.5,
            maxPerShow: 6
          },
          senior: {
            percentage: 12.5,
            maxPerShow: 6
          }
        }
      }
    ],
  },
  {
    id: "theater_central",
    name: "台中虛擬",
    city: "台中市",
    region: "central",
    address: "台中市西屯區台灣大道三段251號13樓",
    phone: "04-2345-6789",
    ticketTypes: {
      adult: {
        name: "全票",
        price: 340
      },
      student: {
        name: "學生票",
        price: 300
      },
      child: {
        name: "兒童票",
        price: 270
      },
      senior: {
        name: "敬老票",
        price: 270
      }
    },
    halls: [
      { 
        id: "hall_1", 
        name: "1廳", 
        capacity: 40,
        unavailableSeats: ["A1", "A2", "B1", "B2"],
        seatLayout: {
          rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          seatsPerRow: 5,
          walkwayAfterColumn: 3
        },
        ticketQuota: {
          adult: {
            percentage: 50,
            maxPerShow: 20
          },
          student: {
            percentage: 25,
            maxPerShow: 10
          },
          child: {
            percentage: 12.5,
            maxPerShow: 5
          },
          senior: {
            percentage: 12.5,
            maxPerShow: 5
          }
        }
      },
      { 
        id: "hall_2", 
        name: "2廳", 
        capacity: 45,
        unavailableSeats: ["E1", "E2", "F1", "F2"],
        seatLayout: {
          rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
          seatsPerRow: 5,
          walkwayAfterColumn: 3
        },
        ticketQuota: {
          adult: {
            percentage: 50,
            maxPerShow: 23
          },
          student: {
            percentage: 25,
            maxPerShow: 11
          },
          child: {
            percentage: 12.5,
            maxPerShow: 6
          },
          senior: {
            percentage: 12.5,
            maxPerShow: 5
          }
        }
      },
      { 
        id: "hall_3", 
        name: "3廳", 
        capacity: 50,
        unavailableSeats: ["I1", "I2", "J1", "J2"],
        seatLayout: {
          rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
          seatsPerRow: 5,
          walkwayAfterColumn: 3
        },
        ticketQuota: {
          adult: {
            percentage: 50,
            maxPerShow: 25
          },
          student: {
            percentage: 25,
            maxPerShow: 13
          },
          child: {
            percentage: 12.5,
            maxPerShow: 6
          },
          senior: {
            percentage: 12.5,
            maxPerShow: 6
          }
        }
      }
    ],
  },
  {
    id: "theater_south",
    name: "高雄虛擬",
    city: "高雄市",
    region: "south",
    address: "高雄市前鎮區中華五路789號8樓",
    phone: "07-2345-6789",
    ticketTypes: {
      adult: {
        name: "全票",
        price: 340
      },
      student: {
        name: "學生票",
        price: 300
      },
      child: {
        name: "兒童票",
        price: 270
      },
      senior: {
        name: "敬老票",
        price: 270
      }
    },
    halls: [
      { 
        id: "hall_1", 
        name: "1廳", 
        capacity: 40,
        unavailableSeats: ["A1", "A2", "A3", "A4"],
        seatLayout: {
          rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          seatsPerRow: 5,
          walkwayAfterColumn: 3
        },
        ticketQuota: {
          adult: {
            percentage: 50,
            maxPerShow: 20
          },
          student: {
            percentage: 25,
            maxPerShow: 10
          },
          child: {
            percentage: 12.5,
            maxPerShow: 5
          },
          senior: {
            percentage: 12.5,
            maxPerShow: 5
          }
        }
      },
      { 
        id: "hall_2", 
        name: "2廳", 
        capacity: 45,
        unavailableSeats: ["D1", "D2", "E1", "E2"],
        seatLayout: {
          rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
          seatsPerRow: 5,
          walkwayAfterColumn: 3
        },
        ticketQuota: {
          adult: {
            percentage: 50,
            maxPerShow: 23
          },
          student: {
            percentage: 25,
            maxPerShow: 11
          },
          child: {
            percentage: 12.5,
            maxPerShow: 6
          },
          senior: {
            percentage: 12.5,
            maxPerShow: 5
          }
        }
      },
      { 
        id: "hall_3", 
        name: "3廳", 
        capacity: 50,
        unavailableSeats: ["I1", "I2", "J1", "J2"],
        seatLayout: {
          rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
          seatsPerRow: 5,
          walkwayAfterColumn: 3
        },
        ticketQuota: {
          adult: {
            percentage: 50,
            maxPerShow: 25
          },
          student: {
            percentage: 25,
            maxPerShow: 13
          },
          child: {
            percentage: 12.5,
            maxPerShow: 6
          },
          senior: {
            percentage: 12.5,
            maxPerShow: 6
          }
        }
      }
    ],
  },
];
