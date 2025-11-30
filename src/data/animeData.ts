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
  seasons?: Season[]; // For series
  genres: string[];
  year: number;
  rating: number;
  status: 'ongoing' | 'completed';
  isSpotlight?: boolean;
  spotlightRank?: number;
}

export const animeData: AnimeItem[] = [
  {
    id: 'one-piece',
    title: 'One Piece',
    type: 'series',
    description: 'Gold Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80',
    genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Shounen', 'Super Power'],
    year: 1999,
    rating: 8.7,
    status: 'ongoing',
    isSpotlight: true,
    spotlightRank: 1,
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1 - East Blue Saga',
        episodes: [
          {
            episodeNumber: 1,
            title: 'I\'m Luffy! The Man Who Will Become Pirate King!',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 2,
            title: 'The Great Swordsman Appears!',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 3,
            title: 'Morgan vs Luffy! Who\'s This Beautiful Young Girl?',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 4,
            title: 'Luffy\'s Past! The Red-Haired Shanks Appears!',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 5,
            title: 'Fear, Mysterious Power!',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            duration: '24:00',
          },
        ],
      },
      {
        seasonNumber: 2,
        title: 'Season 2 - Alabasta Saga',
        episodes: [
          {
            episodeNumber: 1,
            title: 'Enter the Desert Pirates!',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 2,
            title: 'Adventure in the Country of Sand!',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            duration: '24:00',
          },
          {
            episodeNumber: 3,
            title: 'The Heroes Reunion!',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
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
    genres: ['Action', 'Animation'],
    year: 2025,
    rating: 9.2,
    status: 'completed',
    isSpotlight: true,
    spotlightRank: 4,
  },
  {
    id: 'Doraemon the Movie: Nobita\'s Earth Symphony',
    title: 'Doraemon the Movie: Nobita\'s Earth Symphony',
    type: 'movie',
    description: 'Music exists in our daily lives for granted. But what would happen if music disappeared from the earth? This is a completely original story about Doraemon and his friends who are trying to save the earth from a crisis with the familiar theme of music!',
    image: 'https://images.justwatch.com/poster/321402779/s718/eiga-doraemon-nobita-no-chikyu-symphony.jpg',
    videoUrl: 'https://play.zephyrflick.top/video/d9ab9cc1bf456f1db82299d1226553e4',
    genres: ['Action', 'Advanture', 'Cartoon'],
    year: 2024,
    rating: 6.7,
    status: 'completed',
    isSpotlight: true,
    spotlightRank: 3,
  },
  {
    id: 'kaiju-no-8-season-2',
    title: 'Kaiju No. 8 Season 2',
    type: 'series',
    description: 'Second season of Kaijuu 8-gou. Kafka Hibino, a kaiju-corpse cleanup man, has finally become a Defense Force member at 32 years old. Now, he must face the challenges of battling kaiju while hiding his own transformation secret.',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&q=80',
    genres: ['Action', 'Fantasy', 'Sci-Fi'],
    year: 2025,
    rating: 8.5,
    status: 'ongoing',
    isSpotlight: true,
    spotlightRank: 2,
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
    genres: ['Action', 'Comedy', 'School', 'Shounen', 'Super Power'],
    year: 2025,
    rating: 8.8,
    status: 'ongoing',
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
    genres: ['Action', 'Demons', 'Historical', 'Shounen', 'Supernatural'],
    year: 2019,
    rating: 9.1,
    status: 'completed',
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
    genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Shounen', 'Super Power'],
    year: 2007,
    rating: 8.7,
    status: 'completed',
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
    genres: ['Action', 'Comedy', 'Parody', 'Sci-Fi', 'Seinen', 'Super Power', 'Supernatural'],
    year: 2025,
    rating: 8.9,
    status: 'ongoing',
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
    genres: ['Action', 'Comedy', 'Romance', 'Supernatural'],
    year: 2025,
    rating: 8.6,
    status: 'ongoing',
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
    genres: ['Action', 'Drama', 'Fantasy'],
    year: 2025,
    rating: 8.4,
    status: 'completed',
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
    genres: ['Action', 'Comedy'],
    year: 2025,
    rating: 8.7,
    status: 'ongoing',
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
];
