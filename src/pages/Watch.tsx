import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Play, Star, Calendar, Tv, Film, Video } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { VideoPlayer } from "@/components/VideoPlayer";
import { AnimeCard } from "@/components/AnimeCard";
import { Comments } from "@/components/Comments";
import { animeData } from "@/data/animeData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useWatchProgress } from "@/hooks/useWatchProgress";

const Watch = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const anime = animeData.find((item) => item.id === id);
  const { saveProgress } = useWatchProgress();
  
  const [selectedSeason, setSelectedSeason] = useState(
    searchParams.get('season') ? parseInt(searchParams.get('season')!) : 1
  );
  const [selectedEpisode, setSelectedEpisode] = useState(
    searchParams.get('episode') ? parseInt(searchParams.get('episode')!) : 1
  );
  const [isWatchingTrailer, setIsWatchingTrailer] = useState(false);

  const handleTimeUpdate = useCallback((currentTime: number, duration: number) => {
    if (id && !isWatchingTrailer && duration > 0) {
      saveProgress({
        animeId: id,
        season: selectedSeason,
        episode: selectedEpisode,
        progress: currentTime,
        duration: duration,
      });
    }
  }, [id, selectedSeason, selectedEpisode, isWatchingTrailer, saveProgress]);

  if (!anime) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-foreground">Anime Not Found</h1>
          <Link to="/">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  let currentVideoUrl = '';
  let currentEpisodeTitle = '';
  
  if (isWatchingTrailer && anime.trailerUrl) {
    currentVideoUrl = anime.trailerUrl;
    currentEpisodeTitle = `${anime.title} - Trailer`;
  } else if (anime.type === 'movie') {
    currentVideoUrl = anime.videoUrl || '';
    currentEpisodeTitle = anime.title;
  } else if (anime.seasons) {
    const season = anime.seasons.find(s => s.seasonNumber === selectedSeason);
    if (season) {
      const episode = season.episodes.find(e => e.episodeNumber === selectedEpisode);
      if (episode) {
        currentVideoUrl = episode.videoUrl;
        currentEpisodeTitle = `S${selectedSeason} E${selectedEpisode}: ${episode.title}`;
      }
    }
  }

  const handleSeasonChange = (season: string) => {
    const seasonNum = parseInt(season);
    setSelectedSeason(seasonNum);
    setSelectedEpisode(1);
    setSearchParams({ season: season, episode: '1' });
  };

  const handleEpisodeClick = (episodeNum: number) => {
    setSelectedEpisode(episodeNum);
    setIsWatchingTrailer(false);
    setSearchParams({ season: selectedSeason.toString(), episode: episodeNum.toString() });
  };

  const relatedAnime = animeData
    .filter((item) => item.id !== anime.id && item.genres.some((g) => anime.genres.includes(g)))
    .slice(0, 6);

  const currentSeason = anime.seasons?.find(s => s.seasonNumber === selectedSeason);
  const totalEpisodes = currentSeason?.episodes.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-14">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Back Button */}
          <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground h-8">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-4">
              {/* Video Toggle */}
              {anime.trailerUrl && (
                <div className="flex gap-2">
                  <Button
                    variant={isWatchingTrailer ? "secondary" : "default"}
                    size="sm"
                    onClick={() => setIsWatchingTrailer(false)}
                    className="gap-2 h-8 text-xs"
                  >
                    <Video className="h-3.5 w-3.5" />
                    {anime.type === 'movie' ? 'Movie' : 'Episode'}
                  </Button>
                  <Button
                    variant={isWatchingTrailer ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setIsWatchingTrailer(true)}
                    className="gap-2 h-8 text-xs"
                  >
                    <Play className="h-3.5 w-3.5" />
                    Trailer
                  </Button>
                </div>
              )}

              {/* Video Player */}
              <div className="rounded-lg overflow-hidden bg-card border border-border/50">
                <VideoPlayer 
                  videoUrl={currentVideoUrl} 
                  title={currentEpisodeTitle}
                  onTimeUpdate={handleTimeUpdate}
                />
              </div>

              {/* Title & Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      {anime.title}
                    </h1>
                    {anime.type === 'series' && !isWatchingTrailer && (
                      <p className="text-sm text-primary mt-1">
                        {currentEpisodeTitle}
                      </p>
                    )}
                  </div>
                  <Badge className="bg-primary/10 text-primary border border-primary/20 flex items-center gap-1 shrink-0">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {anime.rating}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs flex items-center gap-1">
                    {anime.type === 'series' ? <Tv className="h-3 w-3" /> : <Film className="h-3 w-3" />}
                    {anime.type === 'series' ? 'TV Series' : 'Movie'}
                  </Badge>
                  <Badge variant="secondary" className="text-xs flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {anime.year}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {anime.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {anime.genres.map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs bg-secondary/30">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Synopsis */}
              <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                <h2 className="text-sm font-semibold mb-2 text-foreground">Synopsis</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {anime.description}
                </p>
              </div>

              {/* Episodes */}
              {anime.type === 'series' && anime.seasons && anime.seasons.length > 0 && (
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-foreground">
                      Episodes ({totalEpisodes})
                    </h2>
                    {anime.seasons.length > 1 && (
                      <Select value={selectedSeason.toString()} onValueChange={handleSeasonChange}>
                        <SelectTrigger className="w-36 h-8 text-xs bg-secondary/50 border-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {anime.seasons.map((season) => (
                            <SelectItem key={season.seasonNumber} value={season.seasonNumber.toString()}>
                              {season.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  
                  <ScrollArea className="w-full">
                    <div className="flex gap-2 pb-2">
                      {currentSeason?.episodes.map((ep) => (
                        <Button
                          key={ep.episodeNumber}
                          variant={ep.episodeNumber === selectedEpisode && !isWatchingTrailer ? "default" : "secondary"}
                          className={`shrink-0 h-9 px-4 text-xs ${
                            ep.episodeNumber === selectedEpisode && !isWatchingTrailer
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary/50 hover:bg-secondary'
                          }`}
                          onClick={() => handleEpisodeClick(ep.episodeNumber)}
                        >
                          Ep {ep.episodeNumber}
                        </Button>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              )}

              {/* Comments */}
              <Comments animeId={anime.id} />
            </div>

            {/* Sidebar - Related Anime */}
            <div className="space-y-4">
              <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                <h3 className="text-sm font-semibold mb-3 text-foreground">Related</h3>
                <div className="space-y-3">
                  {relatedAnime.map((item) => (
                    <Link
                      key={item.id}
                      to={`/watch/${item.id}`}
                      className="flex gap-3 group hover:bg-secondary/30 p-2 -mx-2 rounded-md transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-22 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-muted-foreground">
                            {item.type === 'series' ? 'TV' : 'Movie'}
                          </span>
                          <span className="text-[11px] text-primary flex items-center gap-0.5">
                            <Star className="h-3 w-3 fill-current" />
                            {item.rating}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-card/50 border-t border-border/50 mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">&copy; 2025 Gear5TV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Watch;
