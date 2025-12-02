import { useState } from "react";
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

const Watch = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const anime = animeData.find((item) => item.id === id);
  
  const [selectedSeason, setSelectedSeason] = useState(
    searchParams.get('season') ? parseInt(searchParams.get('season')!) : 1
  );
  const [selectedEpisode, setSelectedEpisode] = useState(
    searchParams.get('episode') ? parseInt(searchParams.get('episode')!) : 1
  );
  const [isWatchingTrailer, setIsWatchingTrailer] = useState(false);

  if (!anime) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Anime Not Found</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get current video URL
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
    setSearchParams({ season: selectedSeason.toString(), episode: episodeNum.toString() });
  };

  const relatedAnime = animeData
    .filter((item) => item.id !== anime.id && item.genres.some((g) => anime.genres.includes(g)))
    .slice(0, 5);

  const currentSeason = anime.seasons?.find(s => s.seasonNumber === selectedSeason);
  const totalEpisodes = currentSeason?.episodes.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <Button asChild variant="ghost" className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-3">
                {anime.trailerUrl && (
                  <div className="flex gap-2">
                    <Button
                      variant={isWatchingTrailer ? "secondary" : "default"}
                      size="sm"
                      onClick={() => setIsWatchingTrailer(false)}
                      className="gap-2"
                    >
                      <Video className="h-4 w-4" />
                      {anime.type === 'movie' ? 'Watch Movie' : 'Watch Series'}
                    </Button>
                    <Button
                      variant={isWatchingTrailer ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setIsWatchingTrailer(true)}
                      className="gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Watch Trailer
                    </Button>
                  </div>
                )}
                <VideoPlayer 
                  videoUrl={currentVideoUrl} 
                  title={currentEpisodeTitle}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {anime.title}
                    </h1>
                    {anime.type === 'series' && (
                      <p className="text-muted-foreground text-lg">
                        {currentEpisodeTitle}
                      </p>
                    )}
                  </div>
                  <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current" />
                    {anime.rating}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {anime.type === 'series' ? (
                      <><Tv className="h-3 w-3" /> TV Series</>
                    ) : (
                      <><Film className="h-3 w-3" /> Movie</>
                    )}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {anime.year}
                  </Badge>
                  <Badge variant="secondary">
                    {anime.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                  </Badge>
                  {anime.type === 'series' && totalEpisodes > 0 && (
                    <Badge variant="secondary">
                      {totalEpisodes} Episodes in Season {selectedSeason}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <Badge key={genre} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>

                <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                  <h2 className="text-xl font-semibold mb-3 text-foreground">Synopsis</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {anime.description}
                  </p>
                </div>

                {anime.type === 'series' && anime.seasons && anime.seasons.length > 0 && (
                  <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-foreground">Episodes</h2>
                      {anime.seasons.length > 1 && (
                        <Select value={selectedSeason.toString()} onValueChange={handleSeasonChange}>
                          <SelectTrigger className="w-48">
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
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {currentSeason?.episodes.map((ep) => (
                        <Button
                          key={ep.episodeNumber}
                          variant={ep.episodeNumber === selectedEpisode ? "default" : "secondary"}
                          className="w-full flex flex-col items-start h-auto py-3"
                          onClick={() => handleEpisodeClick(ep.episodeNumber)}
                        >
                          <span className="font-semibold text-sm">Ep {ep.episodeNumber}</span>
                          <span className="text-xs line-clamp-1 text-left w-full">{ep.title}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <Comments animeId={anime.id} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Related Anime</h3>
                <div className="space-y-4">
                  {relatedAnime.map((item) => (
                    <Link
                      key={item.id}
                      to={`/watch/${item.id}`}
                      className="flex gap-3 group hover:bg-secondary/50 p-2 rounded-lg transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {item.type === 'series' ? 'TV' : 'Movie'}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-primary" />
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

      <footer className="bg-secondary border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Gear5TV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Watch;
