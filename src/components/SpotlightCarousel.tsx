import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, ChevronLeft, ChevronRight, Star } from "lucide-react";
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
    }, 6000);
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
    <div className="relative h-[50vh] md:h-[60vh] overflow-hidden rounded-lg animate-fade-in">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/20 text-primary border border-primary/30 text-xs">
                #{current.spotlightRank} Spotlight
              </Badge>
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                {current.rating}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {current.title}
            </h1>
            
            <p className="text-sm md:text-base text-foreground/80 line-clamp-2 max-w-lg">
              {current.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {current.genres.slice(0, 4).map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs bg-secondary/80">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <Button asChild size="default" className="gap-2 bg-primary hover:bg-primary/90">
                <Link to={`/watch/${current.id}`}>
                  <Play className="h-4 w-4 fill-current" />
                  Watch Now
                </Link>
              </Button>
              
              <Button asChild size="default" variant="secondary" className="gap-2 bg-secondary/80 hover:bg-secondary">
                <Link to={`/watch/${current.id}`}>
                  Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors flex items-center justify-center"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors flex items-center justify-center"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {spotlightItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary w-6' : 'bg-foreground/30 w-1.5 hover:bg-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
