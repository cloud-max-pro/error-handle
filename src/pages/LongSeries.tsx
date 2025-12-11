import { useState } from "react";
import { longSeriesData, LongSeriesItem } from "@/data/longsData";
import { Navbar } from "@/components/Navbar";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Play, X, Star, Calendar, Film, ArrowLeft } from "lucide-react";

export default function LongSeries() {
  const [selectedSeries, setSelectedSeries] = useState<LongSeriesItem | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const handleWatch = (series: LongSeriesItem) => {
    setSelectedSeries(series);
    setShowTrailer(false);
  };

  const handleTrailer = (series: LongSeriesItem) => {
    setSelectedSeries(series);
    setShowTrailer(true);
  };

  const handleClose = () => {
    setSelectedSeries(null);
    setShowTrailer(false);
  };

  // Full page video view
  if (selectedSeries) {
    const videoUrl = showTrailer && selectedSeries.trailerUrl 
      ? selectedSeries.trailerUrl 
      : selectedSeries.videoUrl;

    return (
      <div className="min-h-screen bg-background">
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={handleClose}
              className="gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Long Series
            </Button>
            <h1 className="text-lg font-semibold truncate max-w-md">
              {selectedSeries.title} {showTrailer && "(Trailer)"}
            </h1>
            <div className="flex gap-2">
              {selectedSeries.trailerUrl && (
                <Button
                  variant={showTrailer ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowTrailer(true)}
                >
                  Trailer
                </Button>
              )}
              <Button
                variant={!showTrailer ? "default" : "outline"}
                size="sm"
                onClick={() => setShowTrailer(false)}
              >
                Watch
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-16">
          <div className="w-full h-[calc(100vh-4rem)]">
            <VideoPlayer
              videoUrl={videoUrl}
              title={selectedSeries.title}
            />
          </div>
          
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-2">{selectedSeries.title}</h2>
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {selectedSeries.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {selectedSeries.year}
                </span>
                <span className="flex items-center gap-1">
                  <Film className="h-4 w-4" />
                  {selectedSeries.episodes}+ Episodes
                </span>
              </div>
              <p className="text-muted-foreground">{selectedSeries.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedSeries.genres.map((genre) => (
                  <span 
                    key={genre}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Long Series</h1>
            <p className="text-muted-foreground">
              Epic anime series with 100+ episodes for the ultimate binge watch
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {longSeriesData.map((series) => (
              <div
                key={series.id}
                className="group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="aspect-[2/3] relative overflow-hidden">
                  <img
                    src={series.image}
                    alt={series.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover overlay with buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      onClick={() => handleWatch(series)}
                      className="gap-1"
                    >
                      <Play className="h-4 w-4" />
                      Watch
                    </Button>
                    {series.trailerUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTrailer(series)}
                        className="bg-background/50"
                      >
                        Trailer
                      </Button>
                    )}
                  </div>

                  {/* Episode count badge */}
                  <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    {series.episodes}+ EP
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                    {series.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {series.rating}
                    </span>
                    <span>{series.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
