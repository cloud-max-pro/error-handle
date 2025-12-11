export interface LongSeriesItem {
  id: string;
  title: string;
  description: string;
  image: string;
  videoUrl: string;
  trailerUrl?: string;
  genres: string[];
  year: number;
  rating: number;
  episodes: number;
}

export const longSeriesData: LongSeriesItem[] = [
  {
    id: 'one-piece',
    title: 'One Piece',
    description: 'Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as "One Piece." A young boy, Monkey D. Luffy, inspired by his childhood hero "Red-Haired" Shanks, sets out on a journey to become the King of the Pirates.',
    image: 'https://image.tmdb.org/t/p/w500/e3NBGiAifW9Xt8xD5tpARskjccO.jpg',
    videoUrl: 'https://2anime.xyz/embed/one-piece-episode-1',
    trailerUrl: 'https://www.youtube.com/watch?v=MCb13lbVGE0',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    year: 1999,
    rating: 8.9,
    episodes: 1100,
  },
  {
    id: 'naruto',
    title: 'Naruto',
    description: 'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village\'s leader and strongest ninja.',
    image: 'https://image.tmdb.org/t/p/w500/vauCEnR7CiyBDzRCeElKkCaXIYu.jpg',
    videoUrl: 'https://2anime.xyz/embed/naruto-episode-1',
    trailerUrl: 'https://www.youtube.com/watch?v=QczGoCmX-pI',
    genres: ['Action', 'Adventure', 'Martial Arts'],
    year: 2002,
    rating: 8.4,
    episodes: 220,
  },
  {
    id: 'naruto-shippuden',
    title: 'Naruto Shippuden',
    description: 'Naruto Uzumaki returns after two and a half years of training with Jiraiya. He sets out on a mission to rescue his friend Sasuke and faces the powerful Akatsuki organization.',
    image: 'https://image.tmdb.org/t/p/w500/hKkY4Uxl8LSR6dPvlrHU3tXP0f.jpg',
    videoUrl: 'https://2anime.xyz/embed/naruto-shippuden-episode-1',
    trailerUrl: 'https://www.youtube.com/watch?v=1dy2zPPrKj0',
    genres: ['Action', 'Adventure', 'Martial Arts'],
    year: 2007,
    rating: 8.7,
    episodes: 500,
  },
  {
    id: 'bleach',
    title: 'Bleach',
    description: 'High school student Ichigo Kurosaki, who has the ability to see ghosts, gains soul reaper powers from Rukia Kuchiki and uses them to protect the living and the dead from evil spirits called Hollows.',
    image: 'https://image.tmdb.org/t/p/w500/2EewmxXe72ogD0EaWM8gqa0ccIw.jpg',
    videoUrl: 'https://2anime.xyz/embed/bleach-episode-1',
    trailerUrl: 'https://www.youtube.com/watch?v=F4DaFLAyQgc',
    genres: ['Action', 'Adventure', 'Supernatural'],
    year: 2004,
    rating: 8.2,
    episodes: 366,
  },
  {
    id: 'dragon-ball-z',
    title: 'Dragon Ball Z',
    description: 'After learning that he is from another planet, a warrior named Goku and his friends are prompted to defend it from an onslaught of extraterrestrial enemies.',
    image: 'https://image.tmdb.org/t/p/w500/6VKOfL6ihwTiB6prgwpbqFpLEAu.jpg',
    videoUrl: 'https://2anime.xyz/embed/dragon-ball-z-episode-1',
    trailerUrl: 'https://www.youtube.com/watch?v=sS_67XXUyGs',
    genres: ['Action', 'Adventure', 'Martial Arts', 'Fantasy'],
    year: 1989,
    rating: 8.8,
    episodes: 291,
  },
  {
    id: 'fairy-tail',
    title: 'Fairy Tail',
    description: 'Lucy, an aspiring Celestial Wizard, joins the Fairy Tail guild and teams up with Natsu, a dragon slayer, to find her missing father while taking on magical quests.',
    image: 'https://image.tmdb.org/t/p/w500/1T8otPC2cN0dxhFNmTF0SXwzRjV.jpg',
    videoUrl: 'https://2anime.xyz/embed/fairy-tail-episode-1',
    trailerUrl: 'https://www.youtube.com/watch?v=wD7q0xpJTSY',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    year: 2009,
    rating: 8.0,
    episodes: 328,
  },
  {
    id: 'detective-conan',
    title: 'Detective Conan',
    description: 'Shinichi Kudo, a high school detective, is transformed into a child after being poisoned. He now solves mysteries while searching for the organization that did this to him.',
    image: 'https://image.tmdb.org/t/p/w500/uMsEnr9zO1nHCYJrFGvCOuqOMGR.jpg',
    videoUrl: 'https://2anime.xyz/embed/detective-conan-episode-1',
    trailerUrl: 'https://www.youtube.com/watch?v=sNLBEOlFIHA',
    genres: ['Mystery', 'Comedy', 'Detective'],
    year: 1996,
    rating: 8.5,
    episodes: 1100,
  },
  {
    id: 'black-clover',
    title: 'Black Clover',
    description: 'Asta and Yuno were abandoned at the same church on the same day. While Yuno has great magical power, Asta has none but plans to become the Wizard King anyway.',
    image: 'https://image.tmdb.org/t/p/w500/dBxxtfhC4vYrxB2fLsSxOTY2dQc.jpg',
    videoUrl: 'https://2anime.xyz/embed/black-clover-episode-1',
    trailerUrl: 'https://www.youtube.com/watch?v=YpI3v6lKLtI',
    genres: ['Action', 'Comedy', 'Fantasy', 'Magic'],
    year: 2017,
    rating: 8.3,
    episodes: 170,
  },
];
