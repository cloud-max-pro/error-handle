import { Link } from "react-router-dom";
import { Play, X, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { WatchProgress } from "@/hooks/useWatchProgress";
import { animeData } from "@/data/animeData";

interface ContinueWatchingProps {
  watchHistory: WatchProgress[];
  onRemove: (animeId: string) => void;
}

export const ContinueWatching = ({ watchHistory, onRemove }: ContinueWatchingProps) => {
  if (watchHistory.length === 0) return null;

  const getAnimeById = (id: string) => animeData.find((a) => a.id === id);

  const formatProgress = (progress: number, duration: number) => {
    const percent = duration > 0 ? (progress / duration) * 100 : 0;
    return Math.min(Math.round(percent), 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="mb-6 md:mb-8">
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
        <h2 className="text-lg md:text-xl font-bold text-foreground">Continue Watching</h2>
      </div>
      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent -mx-4 px-4 md:mx-0 md:px-0">
        {watchHistory.slice(0, 10).map((item) => {
          const anime = getAnimeById(item.animeId);
          if (!anime) return null;

          const progressPercent = formatProgress(item.progress, item.duration);

          return (
            <div
              key={item.animeId}
              className="relative flex-shrink-0 w-36 sm:w-44 md:w-48 group"
            >
              <Link to={`/watch/${item.animeId}?season=${item.season}&episode=${item.episode}`}>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-card">
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-primary rounded-full p-2">
                      <Play className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 md:p-2">
                    <p className="text-[10px] md:text-xs text-foreground font-medium truncate mb-0.5 md:mb-1">
                      {anime.title}
                    </p>
                    <p className="text-[9px] md:text-[10px] text-muted-foreground mb-0.5 md:mb-1">
                      S{item.season} E{item.episode} • {formatTime(item.progress)} left
                    </p>
                    <Progress value={progressPercent} className="h-0.5 md:h-1" />
                  </div>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-5 w-5 md:h-6 md:w-6 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(item.animeId);
                }}
              >
                <X className="h-2.5 w-2.5 md:h-3 md:w-3" />
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
