import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Tv, Film, Video, X } from "lucide-react";
import { AnimeItem } from "@/data/animeData";
import { Badge } from "@/components/ui/badge";
import { VideoPlayer } from "@/components/VideoPlayer";

interface AnimeCardProps {
  anime: AnimeItem;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (anime.trailerUrl) {
      setShowTrailer(true);
    }
  };

  return (
    <>
      <Link
        to={`/watch/${anime.id}`}
        className="group relative block rounded-md overflow-hidden bg-card transition-all duration-200 hover:ring-2 hover:ring-primary/50 animate-fade-in"
      >
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
          
          {/* Type badge */}
          <div className="absolute top-2 left-2">
            <Badge className="bg-background/80 text-foreground text-[10px] px-1.5 py-0.5 backdrop-blur-sm border-0">
              {anime.type === 'series' ? 'TV' : 'Movie'}
            </Badge>
          </div>

          {/* Trailer button */}
          {anime.trailerUrl && (
            <button
              onClick={handleTrailerClick}
              className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 backdrop-blur-sm cursor-pointer border-0">
                <Video className="h-3 w-3 mr-1" /> PV
              </Badge>
            </button>
          )}

          {/* Episodes/Seasons count */}
          {anime.seasons && anime.type === 'series' && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-primary/90 text-primary-foreground text-[10px] px-1.5 py-0.5 border-0">
                {anime.seasons.reduce((acc, s) => acc + s.episodes.length, 0)} Eps
              </Badge>
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-2 right-2">
            <Badge className="bg-background/80 text-primary text-[10px] px-1.5 py-0.5 backdrop-blur-sm border-0 font-semibold">
              ★ {anime.rating}
            </Badge>
          </div>

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/40">
            <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
              <Play className="h-5 w-5 text-primary-foreground fill-current ml-0.5" />
            </div>
          </div>
        </div>

        <div className="p-2.5">
          <h3 className="font-medium text-sm line-clamp-2 text-foreground/90 group-hover:text-primary transition-colors leading-tight">
            {anime.title}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {anime.year} • {anime.status === 'ongoing' ? 'Ongoing' : 'Completed'}
          </p>
        </div>
      </Link>

      {/* Trailer Modal */}
      {showTrailer && anime.trailerUrl && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4 text-foreground" />
            </button>
            
            <div className="bg-card rounded-lg overflow-hidden border border-border">
              <div className="p-3 border-b border-border">
                <h3 className="text-base font-semibold text-foreground">{anime.title} - Trailer</h3>
              </div>
              <div className="aspect-video">
                <VideoPlayer videoUrl={anime.trailerUrl} title={anime.title} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
