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
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Continue Watching</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {watchHistory.slice(0, 10).map((item) => {
          const anime = getAnimeById(item.animeId);
          if (!anime) return null;

          const progressPercent = formatProgress(item.progress, item.duration);

          return (
            <div
              key={item.animeId}
              className="relative flex-shrink-0 w-48 group"
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
                      <Play className="h-5 w-5 text-primary-foreground fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-xs text-foreground font-medium truncate mb-1">
                      {anime.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground mb-1">
                      S{item.season} E{item.episode} • {formatTime(item.progress)} left
                    </p>
                    <Progress value={progressPercent} className="h-1" />
                  </div>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(item.animeId);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
