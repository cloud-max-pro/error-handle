export interface Episode {
  episodeNumber: number;
  title: string;
  videoUrl: string;
  duration?: string;
  thumbnail?: string;
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface AnimeItem {
  id: string;
  title: string;
  type: 'movie' | 'series';
  description: string;
  image: string;
  videoUrl?: string; // For movies
  trailerUrl?: string; // Trailer URL for both movies and series
  seasons?: Season[]; // For series
  genres: string[];
  year: number;
  rating: number;
  status: 'ongoing' | 'completed';
  isSpotlight?: boolean;
  spotlightRank?: number;
  network?: 'crunchyroll' | 'netflix' | 'disney-plus' | 'hulu' | 'amazon-prime' | 'funimation' | 'hidive' | 'hbo-max' | 'apple-tv' | 'paramount-plus' | 'peacock' | 'adult-swim';
}

export const animeData: AnimeItem[] = [
  {
    id: 'tokyo-revengers',
    title: 'Tokyo Revengers',
    type: 'series',
    description: 'Takemichi Hanagaki is a freelancer that\'s reached the absolute pits of despair in his life. He finds out that the only girlfriend he ever had in his life that he dated in middle school, Hinata Tachibana, had been killed by the ruthless Tokyo Manji Gang. The day after hearing about her death, he\'s standing on the station platform and ends up being pushed over onto the tracks by a herd of people.',
    image: 'https://images.justwatch.com/poster/251128847/s718/tokyo-revengers.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=Fwyc8XhXVSA&feature=youtu.be',
    genres: ['Action', 'Drama', 'Supernatural', 'Delinquents', 'Time Travel'],
    year: 2021,
    rating: 8.5,
    status: 'ongoing',
    isSpotlight: true,
    spotlightRank: 1,
    network: 'crunchyroll',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            episodeNumber: 1,
            title: 'Reborn',
            videoUrl: 'https://play.zephyrflick.top/video/a3f390d88e4c41f2747bfa2f1b5f87db',
            duration: '24:00',
          },
          {
            episodeNumber: 2,
            title: 'Resist',
            videoUrl: 'https://play.zephyrflick.top/video/735b90b4568125ed6c3f678819b6e058',
            duration: '24:00',
          },
          {
            episodeNumber: 3,
            title: 'Resolve',
            videoUrl: 'https://play.zephyrflick.top/video/3295c76acbf4caaed33c36b1b5fc2cb1',
            duration: '24:00',
          },
          {
            episodeNumber: 4,
            title: 'Return',
            videoUrl: 'https://play.zephyrflick.top/video/fc490ca45c00b1249bbe3554a4fdf6fb',
            duration: '24:00',
          },
          {
            episodeNumber: 5,
            title: 'Releap',
            videoUrl: 'https://play.zephyrflick.top/video/14bfa6bb14875e45bba028a21ed38046',
            duration: '24:00',
          },
          {
            episodeNumber: 6,
            title: 'Regret',
            videoUrl: 'https://play.zephyrflick.top/video/e2c420d928d4bf8ce0ff2ec19b371514',
            duration: '24:00',
          },
           {
            episodeNumber: 7,
            title: 'Revive',
            videoUrl: 'https://play.zephyrflick.top/video/7cbbc409ec990f19c78c75bd1e06f215',
            duration: '24:00',
          },
          {
            episodeNumber: 8,
            title: 'Rechange',
            videoUrl: 'https://play.zephyrflick.top/video/32bb90e8976aab5298d5da10fe66f21d',
            duration: '24:00',
          },
          {
            episodeNumber: 9,
            title: 'Revolt',
            videoUrl: 'https://play.zephyrflick.top/video/d2ddea18f00665ce8623e36bd4e3c7c5',
            duration: '24:00',
          },
          {
            episodeNumber: 10,
            title: 'Rerise',
            videoUrl: 'https://play.zephyrflick.top/video/ad61ab143223efbc24c7d2583be69251',
            duration: '24:00',
          },
          {
            episodeNumber: 11,
            title: 'Respect',
            videoUrl: 'https://play.zephyrflick.top/video/d09bf41544a3365a46c9077ebb5e35c3',
            duration: '24:00',
          },
          {
            episodeNumber: 12,
            title: 'Revenge',
            videoUrl: 'https://play.zephyrflick.top/video/fbd7939d674997cdb4692d34de8633c4',
            duration: '24:00',
          },
          {
            episodeNumber: 13,
            title: 'Odds and Ends',
            videoUrl: 'https://play.zephyrflick.top/video/28dd2c7955ce926456240b2ff0100bde',
            duration: '24:00',
          },
          {
            episodeNumber: 14,
            title: 'Break up',
            videoUrl: 'https://play.zephyrflick.top/video/35f4a8d465e6e1edc05f3d8ab658c551',
            duration: '24:00',
          },
          {
            episodeNumber: 15,
            title: 'No Pain, no gain',
            videoUrl: 'https://play.zephyrflick.top/video/d1fe173d08e959397adf34b1d77e88d7',
            duration: '24:00',
          },
          {
            episodeNumber: 16,
            title: 'Once upon a time',
            videoUrl: 'https://play.zephyrflick.top/video/f033ab37c30201f73f142449d037028d',
            duration: '24:00',
          },
          {
            episodeNumber: 17,
            title: 'No way',
            videoUrl: 'https://play.zephyrflick.top/video/43ec517d68b6edd3015b3edc9a11367b',
            duration: '24:00',
          },
          {
            episodeNumber: 18,
            title: 'Open Fire',
            videoUrl: 'https://play.zephyrflick.top/video/9778d5d219c5080b9a6a17bef029331c',
            duration: '24:00',
          },
          {
            episodeNumber: 19,
            title: 'Turn around',
            videoUrl: 'https://play.zephyrflick.top/video/fe9fc289c3ff0af142b6d3bead98a923',
            duration: '24:00',
          },
          {
            episodeNumber: 20,
            title: 'Dead or Alive',
            videoUrl: 'https://play.zephyrflick.top/video/68d30a9594728bc39aa24be94b319d21',
            duration: '24:00',
          },
          {
            episodeNumber: 21,
            title: 'One for all',
            videoUrl: 'https://play.zephyrflick.top/video/3ef815416f775098fe977004015c6193',
            duration: '24:00',
          },
          {
            episodeNumber: 22,
            title: 'One and only',
            videoUrl: 'https://play.zephyrflick.top/video/93db85ed909c13838ff95ccfa94cebd9',
            duration: '24:00',
          },
          {
            episodeNumber: 23,
            title: 'End of war',
            videoUrl: 'https://play.zephyrflick.top/video/c7e1249ffc03eb9ded908c236bd1996d',
            duration: '24:00',
          },
          {
            episodeNumber: 24,
            title: 'A Cry baby',
            videoUrl: 'https://play.zephyrflick.top/video/2a38a4a9316c49e5a833517c45d31070',
            duration: '24:00',
          },
        ],
      },
    ],
  },
  {
    id: 'demon-slayer-infinity-castle',
    title: 'Demon Slayer: Kimetsu no Yaiba Infinity Castle',
    type: 'movie',
    description: 'Anime movie trilogy adaptation of the Infinity Castle Arc. The ultimate battle between the Demon Slayers and the demons begins in the mysterious Infinity Castle.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj67Q-EI_pxpPTjuwns0DY2lNmegjXAdl7GQ&s',
    videoUrl: 'https://play.zephyrflick.top/video/948750a01b42decb760277c873238254',
    trailerUrl: 'https://youtu.be/0pdC1l6M8rU',
    genres: ['Action', 'Animation'],
    year: 2025,
    rating: 9.2,
    status: 'completed',
    isSpotlight: true,
    spotlightRank: 4,
    network: 'netflix',
  },
  {
    id: 'Doraemon the Movie: Nobita\'s Earth Symphony',
    title: 'Doraemon the Movie: Nobita\'s Earth Symphony',
    type: 'movie',
    description: 'Music exists in our daily lives for granted. But what would happen if music disappeared from the earth? This is a completely original story about Doraemon and his friends who are trying to save the earth from a crisis with the familiar theme of music!',
    image: 'https://images.justwatch.com/poster/321402779/s718/eiga-doraemon-nobita-no-chikyu-symphony.jpg',
    videoUrl: 'https://play.zephyrflick.top/video/d9ab9cc1bf456f1db82299d1226553e4',
    trailerUrl: 'https://youtu.be/qy0wiUiKKg8',
    genres: ['Action', 'Advanture', 'Cartoon'],
    year: 2024,
    rating: 6.7,
    status: 'completed',
    isSpotlight: true,
    spotlightRank: 3,
    network: 'disney-plus',
  },
  {
    id: 'Chainsaw-Man-the-Movie-Reze-Arc',
    title: 'Chainsaw Man the Movie: Reze Arc',
    type: 'movie',
    description: 'In a brutal war between devils, hunters, and secret enemies, a mysterious girl named Reze has stepped into Denji\'s world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules.',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Chainsaw_Man_Reze_Arc_movie_poster.jpg/250px-Chainsaw_Man_Reze_Arc_movie_poster.jpg',
    videoUrl: 'https://play.zephyrflick.top/video/34ea5c9e07d48f1e4d515832c477f821',
    trailerUrl: 'https://youtu.be/HUlu-nbmFjU',
    genres: ['Action', 'Drama', 'Gore'],
    year: 2025,
    rating: 8.5,
    status: 'completed',
    isSpotlight: true,
    spotlightRank: 5,
    network: 'crunchyroll',
  },
  {
    id: 'Mononoke the Movie: Chapter II - The Ashes of Rage',
    title: 'Mononoke the Movie: Chapter II - The Ashes of Rage',
    type: 'movie',
    description: 'The Medicine Seller returns as the Edo harem faces a new crisis, with family feuds, inner turmoil and fiery envy igniting the birth of a raging spirit.',
    image: 'https://m.media-amazon.com/images/M/MV5BNzY1Y2E5OWUtYjA0Ni00YmQ0LWFlNWItODhjMTM2ZDk5ZmFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    videoUrl: 'https://play.zephyrflick.top/video/6b4a9e228208a5008088d8ad6e1b3dd7',
    trailerUrl: 'https://www.youtube.com/watch?v=pdSrwpW2Yvk',
    genres: ['Psychological', 'Mystery', 'Adult Cast'],
    year: 2025,
    rating: 7.1,
    status: 'completed',
    isSpotlight: true,
    spotlightRank: 6,
    network: 'netflix',
  },
  {
    id: 'stand-by-me-doraemon-2',
    title: 'Stand by Me Doraemon 2',
    type: 'movie',
    description: 'Nobita travels to the future to show his beloved grandma his bride, but adult Nobita has fled his own wedding.',
    image: 'https://image.tmdb.org/t/p/w185/vBv8iOFPLnXmtELUjcFc7OKHsR4.jpg',
    videoUrl: 'https://play.zephyrflick.top/video/50abc3e730e36b387ca8e02c26dc0a22',
    trailerUrl: 'https://www.youtube.com/watch?v=A0wg3Zkxq1c',
    genres: ['Cartoon', 'Advanture', 'Sci-Fi'],
    year: 2020,
    rating: 7.5,
    status: 'completed',
    isSpotlight: true,
    spotlightRank: 7,
    network: 'netflix',
  },
  {
    id: 'kaiju-no-8-season-2',
    title: 'Kaiju No. 8 Season 2',
    type: 'series',
    description: 'Second season of Kaijuu 8-gou. Kafka Hibino, a kaiju-corpse cleanup man, has finally become a Defense Force member at 32 years old. Now, he must face the challenges of battling kaiju while hiding his own transformation secret.',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&q=80',
    trailerUrl: 'https://play.zephyrflick.top/video/5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    genres: ['Action', 'Fantasy', 'Sci-Fi'],
    year: 2025,
    rating: 8.5,
    status: 'ongoing',
    isSpotlight: true,
    spotlightRank: 2,
    network: 'crunchyroll',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            episodeNumber: 1,
            title: 'The Monster Makes its Move',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 2,
            title: 'How to Identify a Monster',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 3,
            title: 'Revenge Match',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            duration: '24:00',
          },
        ],
      },
      {
        seasonNumber: 2,
        title: 'Season 2',
        episodes: [
          {
            episodeNumber: 1,
            title: 'A New Threat Emerges',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 2,
            title: 'The Battle Intensifies',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            duration: '24:00',
          },
        ],
      },
    ],
  },
  {
    id: 'my-hero-academia-final',
    title: 'My Hero Academia Final Season',
    type: 'series',
    description: 'The final season of My Hero Academia. The ultimate showdown between heroes and villains reaches its climax as Deku and his classmates face their greatest challenge yet.',
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80',
    trailerUrl: 'https://play.zephyrflick.top/video/6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u',
    genres: ['Action', 'Comedy', 'School', 'Shounen', 'Super Power'],
    year: 2025,
    rating: 8.8,
    status: 'ongoing',
    network: 'crunchyroll',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Final Season Part 1',
        episodes: [
          {
            episodeNumber: 1,
            title: 'The Final Act Begins',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 2,
            title: 'Hero Rising',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            duration: '24:00',
          },
        ],
      },
    ],
  },
  {
    id: 'demon-slayer-2019',
    title: 'Demon Slayer: Kimetsu no Yaiba (2019)',
    type: 'series',
    description: 'Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou Kamado\'s shoulders. Though living impoverished on a remote mountain, the Kamado family are able to enjoy a relatively peaceful and happy life.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80',
    trailerUrl: 'https://play.zephyrflick.top/video/7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v',
    genres: ['Action', 'Demons', 'Historical', 'Shounen', 'Supernatural'],
    year: 2019,
    rating: 9.1,
    status: 'completed',
    network: 'netflix',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            episodeNumber: 1,
            title: 'Cruelty',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 2,
            title: 'Trainer Sakonji Urokodaki',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            duration: '24:00',
          },
        ],
      },
    ],
  },
  {
    id: 'naruto-shippuden',
    title: 'Naruto: Shippuuden',
    type: 'series',
    description: 'It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80',
    trailerUrl: 'https://play.zephyrflick.top/video/8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w',
    genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Shounen', 'Super Power'],
    year: 2007,
    rating: 8.7,
    status: 'completed',
    network: 'crunchyroll',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Kazekage Rescue Arc',
        episodes: [
          {
            episodeNumber: 1,
            title: 'Homecoming',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 2,
            title: 'The Akatsuki Makes Its Move',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            duration: '24:00',
          },
        ],
      },
    ],
  },
  {
    id: 'one-punch-man-season-3',
    title: 'One Punch Man Season 3',
    type: 'series',
    description: 'The third season of One Punch Man. Saitama, a hero who can defeat any opponent with a single punch, continues his journey to find a worthy opponent.',
    image: 'https://images.unsplash.com/photo-1620641622339-fac1a2e2e6f6?w=800&q=80',
    trailerUrl: 'https://play.zephyrflick.top/video/9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x',
    genres: ['Action', 'Comedy', 'Parody', 'Sci-Fi', 'Seinen', 'Super Power', 'Supernatural'],
    year: 2025,
    rating: 8.9,
    status: 'ongoing',
    network: 'hulu',
    seasons: [
      {
        seasonNumber: 3,
        title: 'Season 3',
        episodes: [
          {
            episodeNumber: 1,
            title: 'The Return of the Hero',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 2,
            title: 'New Threats',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            duration: '24:00',
          },
        ],
      },
    ],
  },
  {
    id: 'dan-da-dan-season-2',
    title: 'Dan Da Dan Season 2',
    type: 'series',
    description: 'Second season of the supernatural action comedy. The bizarre adventures continue as our heroes battle aliens and ghosts while navigating high school life.',
    image: 'https://images.unsplash.com/photo-1626278664285-f796b9ee7806?w=800&q=80',
    trailerUrl: 'https://play.zephyrflick.top/video/0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y',
    genres: ['Action', 'Comedy', 'Romance', 'Supernatural'],
    year: 2025,
    rating: 8.6,
    status: 'ongoing',
    network: 'netflix',
    seasons: [
      {
        seasonNumber: 2,
        title: 'Season 2',
        episodes: [
          {
            episodeNumber: 1,
            title: 'Strange Encounters',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            duration: '24:00',
          },
        ],
      },
    ],
  },
  {
    id: 'gachlakuta',
    title: 'Gachiakuta',
    type: 'series',
    description: 'In a world where people are banished to the abyss, a young man fights to clear his name and survive in the harsh wasteland.',
    image: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=800&q=80',
    trailerUrl: 'https://play.zephyrflick.top/video/1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    genres: ['Action', 'Drama', 'Fantasy'],
    year: 2025,
    rating: 8.4,
    status: 'completed',
    network: 'funimation',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            episodeNumber: 1,
            title: 'Banished',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            duration: '24:00',
          },
        ],
      },
    ],
  },
  {
    id: 'sakamoto-days-part-2',
    title: 'Sakamoto Days Part 2',
    type: 'series',
    description: 'The legendary hitman Sakamoto continues his peaceful life as a shop owner, but his past refuses to stay buried as new threats emerge.',
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&q=80',
    trailerUrl: 'https://play.zephyrflick.top/video/2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a',
    genres: ['Action', 'Comedy'],
    year: 2025,
    rating: 8.7,
    status: 'ongoing',
    network: 'crunchyroll',
    seasons: [
      {
        seasonNumber: 2,
        title: 'Part 2',
        episodes: [
          {
            episodeNumber: 1,
            title: 'The Past Returns',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            duration: '24:00',
          },
        ],
      },
    ],
  },
  {
    id: 'lord-of-mysteries',
    title: 'Lord of Mysteries',
    type: 'series',
    description: 'In a world where steam power reigns supreme and mysticism lurks in shadows, Klein Moretti awakens with memories of Earth. Drawn into a web of ancient gods, secret organizations, and forbidden knowledge, he must navigate the treacherous path of Beyonder sequences while uncovering the truth behind his transmigration.',
    image: 'https://m.media-amazon.com/images/M/MV5BYjhlMDIwYmQtMDBhYS00MDE1LTlmY2MtNjY4NjExNDc1MDFkXkEyXkFqcGc@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=a8p-l75icsA',
    genres: ['Mystery', 'Fantasy', 'Supernatural', 'Action', 'Drama'],
    year: 2024,
    rating: 9.0,
    status: 'ongoing',
    isSpotlight: true,
    spotlightRank: 8,
    network: 'crunchyroll',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1 - The Seer',
        episodes: [
          { episodeNumber: 1, title: 'Transmigration', videoUrl: 'https://play.zephyrflick.top/video/f1deaee7fb4927ad7e67675b4f411d2e', duration: '24:00' },
          { episodeNumber: 2, title: 'The Seer Pathway', videoUrl: 'https://play.zephyrflick.top/video/6efd23ca96571c0b369cf7286650e9b8', duration: '24:00' },
          { episodeNumber: 3, title: 'Nighthawks', videoUrl: 'https://play.zephyrflick.top/video/97194d08565841c08a6d1ce3c82da0b3', duration: '24:00' },
          { episodeNumber: 4, title: 'The Tarot Club', videoUrl: 'https://play.zephyrflick.top/video/ad48ef812e1189e7c488a956e7a3676c', duration: '24:00' },
          { episodeNumber: 5, title: 'Mr. Fool', videoUrl: 'https://play.zephyrflick.top/video/d4d0144bbd63942f6b936d4e9eff1676', duration: '24:00' },
          { episodeNumber: 6, title: 'Acting Method', videoUrl: 'https://play.zephyrflick.top/video/b952fb76427d6ab439fbd2b78f691ba5', duration: '24:00' },
          { episodeNumber: 7, title: 'The Justice', videoUrl: 'https://play.zephyrflick.top/video/8e200fc779d0a8e7eaba42e877f0a5c0', duration: '24:00' },
          { episodeNumber: 8, title: 'Crimson Moon', videoUrl: 'https://play.zephyrflick.top/video/14edc6ebfdae2e23bbed83d67f50e983', duration: '24:00' },
          { episodeNumber: 9, title: 'The Hanged Man', videoUrl: 'https://play.zephyrflick.top/video/ccf496c9b493d05362e3b602d69775c0', duration: '24:00' },
          { episodeNumber: 10, title: 'Sequence 8', videoUrl: 'https://play.zephyrflick.top/video/bb7b76330e286eb5f158ff2fd3d82d5d', duration: '24:00' },
          { episodeNumber: 11, title: 'The Sun', videoUrl: 'https://play.zephyrflick.top/video/1e4503555f3509d72f0ae55f8c3880d0', duration: '24:00' },
          { episodeNumber: 12, title: 'Clown', videoUrl: 'https://play.zephyrflick.top/video/6d090e8d4f2d61498fe04b05cc2ba6eb', duration: '24:00' },
          { episodeNumber: 13, title: 'Light', videoUrl: 'https://play.zephyrflick.top/video/5fce283940707ef04a5994b82d076bbb', duration: '24:00' },
        ],
      },
    ],
  },
];
