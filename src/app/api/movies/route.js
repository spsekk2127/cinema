import { NextResponse } from "next/server";

export async function GET() {
  const moviesData = [
    {
      id: "movie_001",
      title: "奇異博士2：失控多重宇宙",
      posterUrl: "/images/movie_image_01.jpg",
      rating: "8.5",
      duration: "126分鐘",
      releaseDate: "2024-03-15",
      genre: ["動作", "奇幻", "冒險"],
      description:
        "奇異博士施展禁忌咒語，打開多重宇宙的大門，卻因此威脅到人類生存，必須面對來自多重宇宙的強大對手。",
      director: "山姆·雷米",
      cast: ["班尼迪克·康柏拜區", "伊莉莎白·歐森"],
    },
    {
      id: "movie_002",
      title: "蜘蛛人：穿越新宇宙",
      posterUrl: "/images/movie_image_02.jpg",
      rating: "9.0",
      duration: "140分鐘",
      releaseDate: "2024-03-20",
      genre: ["動畫", "動作", "冒險"],
      description:
        "邁爾斯·莫拉雷斯在多重宇宙中展開全新冒險，與其他宇宙的蜘蛛人聯手對抗更強大的威脅。",
      director: "杜沃金·韋伯",
      cast: ["沙梅克·摩爾", "海莉·斯坦菲爾德"],
    },
    {
      id: "movie_003",
      title: "玩具總動員5",
      posterUrl: "/images/movie_image_03.jpg",
      rating: "8.8",
      duration: "115分鐘",
      releaseDate: "2024-03-25",
      genre: ["動畫", "冒險", "喜劇"],
      description:
        "胡迪和巴斯光年帶領玩具們展開全新冒險，探索友情和成長的意義。",
      director: "皮特·道格特",
      cast: ["湯姆·漢克斯", "提姆·艾倫"],
    },
    {
      id: "movie_004",
      title: "蜘蛛人：返校日",
      posterUrl: "/images/movie_image_04.jpg",
      rating: "8.7",
      duration: "133分鐘",
      releaseDate: "2024-03-30",
      genre: ["動作", "冒險", "科幻"],
      description:
        "在鋼鐵人的指導下，彼得·帕克努力平衡高中生活與超級英雄的雙重身份，同時還要面對禿鷹等強大反派的威脅。",
      director: "喬恩·華茲",
      cast: ["湯姆·霍蘭德", "麥可·基頓", "羅伯特·唐尼·奇"],
    },
    {
      id: "movie_005",
      title: "魔物獵人",
      posterUrl: "/images/movie_image_05.jpg",
      rating: "8.6",
      duration: "133分鐘",
      releaseDate: "2024-04-05",
      genre: ["奇幻", "動作", "冒險"],
      description:
        "一群精英獵人在充滿危險的世界中追捕巨大魔物，守護他們的家園。",
      director: "保羅·安德森",
      cast: ["米拉·喬娃維琪", "托尼·嘉"],
    },
  ];

  return NextResponse.json(moviesData);
}
