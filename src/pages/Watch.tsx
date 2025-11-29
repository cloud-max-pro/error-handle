import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Star, Calendar, Tv, Film } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { VideoPlayer } from "@/components/VideoPlayer";
import { AnimeCard } from "@/components/AnimeCard";
import { animeData } from "@/data/animeData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Watch = () => {
  const { id } = useParams();
  const anime = animeData.find((item) => item.id === id);

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

  const relatedAnime = animeData
    .filter((item) => item.id !== anime.id && item.genres.some((g) => anime.genres.includes(g)))
    .slice(0, 5);

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
              <VideoPlayer videoUrl={anime.videoUrl} title={anime.title} />

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {anime.title}
                    </h1>
                    {anime.currentEpisode && anime.type === 'series' && (
                      <p className="text-muted-foreground text-lg">
                        Episode {anime.currentEpisode}
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
                  {anime.episodes && anime.type === 'series' && (
                    <Badge variant="secondary">
                      {anime.episodes} Episodes
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

                <div className="bg-card rounded-lg p-6 border border-border">
                  <h2 className="text-xl font-semibold mb-3 text-foreground">Synopsis</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {anime.description}
                  </p>
                </div>

                {anime.type === 'series' && anime.currentEpisode && (
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Episodes</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {Array.from({ length: Math.min(anime.currentEpisode, 20) }, (_, i) => i + 1).map((ep) => (
                        <Button
                          key={ep}
                          variant={ep === anime.currentEpisode ? "default" : "secondary"}
                          className="w-full"
                        >
                          <Play className="h-3 w-3 mr-2" />
                          Ep {ep}
                        </Button>
                      ))}
                    </div>
                    {anime.currentEpisode > 20 && (
                      <Button variant="outline" className="w-full mt-3">
                        View All Episodes
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 border border-border">
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
