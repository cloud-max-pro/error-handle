import { Link } from "react-router-dom";
import { Play, Tv, Film } from "lucide-react";
import { AnimeItem } from "@/data/animeData";
import { Badge } from "@/components/ui/badge";

interface AnimeCardProps {
  anime: AnimeItem;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
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
  );
};
