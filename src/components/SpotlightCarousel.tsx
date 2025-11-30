import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimeItem } from "@/data/animeData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SpotlightCarouselProps {
  spotlightItems: AnimeItem[];
}

export const SpotlightCarousel = ({ spotlightItems }: SpotlightCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [spotlightItems.length]);

  const current = spotlightItems[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + spotlightItems.length) % spotlightItems.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % spotlightItems.length);
  };

  if (!current) return null;

  return (
    <div className="relative h-[70vh] overflow-hidden rounded-lg animate-fade-in shadow-lg">
      <div className="absolute inset-0">
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-4">
            <Badge className="bg-spotlight text-spotlight-foreground">
              #{current.spotlightRank} SPOTLIGHT
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              {current.title}
            </h1>
            
            <p className="text-lg text-foreground/90 line-clamp-3">
              {current.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {current.genres.slice(0, 3).map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link to={`/watch/${current.id}`}>
                  <Play className="h-5 w-5 fill-current" />
                  Watch Now
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <Link to={`/watch/${current.id}`}>
                  <Info className="h-5 w-5" />
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-sm hover:bg-secondary transition-colors flex items-center justify-center shadow-lg"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-sm hover:bg-secondary transition-colors flex items-center justify-center shadow-lg"
      >
        <ChevronRight className="h-6 w-6 text-foreground" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {spotlightItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary w-8' : 'bg-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
