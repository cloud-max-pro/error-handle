import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Tv, Film, Video, X } from "lucide-react";
import { AnimeItem } from "@/data/animeData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
        className="group relative block rounded-lg overflow-hidden bg-card transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] animate-fade-in"
      >
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm">
              {anime.type === 'series' ? (
                <><Tv className="h-3 w-3 mr-1" /> TV</>
              ) : (
                <><Film className="h-3 w-3 mr-1" /> Movie</>
              )}
            </Badge>
          </div>

          {anime.trailerUrl && (
            <button
              onClick={handleTrailerClick}
              className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm cursor-pointer">
                <Video className="h-3 w-3 mr-1" /> Trailer
              </Badge>
            </button>
          )}

          {anime.seasons && anime.type === 'series' && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-primary text-primary-foreground">
                {anime.seasons.length} Season{anime.seasons.length > 1 ? 's' : ''}
              </Badge>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-primary backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Play className="h-8 w-8 text-primary-foreground fill-current ml-1" />
            </div>
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {anime.title}
          </h3>
        </div>
      </Link>

      {/* Trailer Modal */}
      {showTrailer && anime.trailerUrl && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors shadow-lg"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>
            
            <div className="bg-card rounded-lg overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">{anime.title} - Trailer</h3>
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
