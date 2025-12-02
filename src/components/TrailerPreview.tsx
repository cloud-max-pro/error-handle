import { useState } from "react";
import { Play, X } from "lucide-react";
import { animeData } from "@/data/animeData";
import { Badge } from "@/components/ui/badge";
import { VideoPlayer } from "@/components/VideoPlayer";

export const TrailerPreview = () => {
  const [selectedTrailer, setSelectedTrailer] = useState<{ title: string; url: string } | null>(null);

  // Get anime with trailers, sorted by year (latest first)
  const latestTrailers = animeData
    .filter((anime) => anime.trailerUrl)
    .sort((a, b) => b.year - a.year)
    .slice(0, 6);

  return (
    <>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">Latest Trailers</h2>
          <Badge variant="secondary" className="text-sm">
            {latestTrailers.length} New Trailers
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestTrailers.map((anime) => (
            <div
              key={anime.id}
              className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-lg"
              onClick={() => setSelectedTrailer({ title: anime.title, url: anime.trailerUrl! })}
            >
              <img
                src={anime.image}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <Play className="h-8 w-8 text-primary-foreground fill-current ml-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                <h3 className="text-foreground font-semibold line-clamp-1">
                  {anime.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {anime.type === 'series' ? 'Series' : 'Movie'}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {anime.year}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    ⭐ {anime.rating}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trailer Modal */}
      {selectedTrailer && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setSelectedTrailer(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors shadow-lg"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>
            
            <div className="bg-card rounded-lg overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">{selectedTrailer.title} - Trailer</h3>
              </div>
              <div className="aspect-video">
                <VideoPlayer videoUrl={selectedTrailer.url} title={selectedTrailer.title} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
