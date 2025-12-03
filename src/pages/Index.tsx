import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { SpotlightCarousel } from "@/components/SpotlightCarousel";
import { AnimeCard } from "@/components/AnimeCard";
import { FilterSidebar, FilterState } from "@/components/FilterSidebar";
import { ContinueWatching } from "@/components/ContinueWatching";
import { animeData } from "@/data/animeData";
import { Button } from "@/components/ui/button";
import { TrendingUp, Sparkles, Compass, Clock, Star } from "lucide-react";
import { useWatchProgress } from "@/hooks/useWatchProgress";

const Index = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");
  const { watchHistory, removeProgress } = useWatchProgress();
  
  const [filters, setFilters] = useState<FilterState>({
    genre: 'all',
    season: 'all',
    studio: 'all',
    status: 'all',
    type: 'all',
    orderBy: 'default',
  });
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all'>('weekly');

  const spotlightItems = animeData
    .filter((anime) => anime.isSpotlight)
    .sort((a, b) => (a.spotlightRank || 0) - (b.spotlightRank || 0));

  const applyFilters = (data: typeof animeData) => {
    let filtered = [...data];

    if (filters.genre !== 'all') {
      filtered = filtered.filter((anime) =>
        anime.genres.some((g) => g.toLowerCase() === filters.genre)
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter((anime) => anime.status === filters.status);
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter((anime) => 
        filters.type === 'tv' ? anime.type === 'series' : anime.type === 'movie'
      );
    }

    if (filters.orderBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.orderBy === 'latest') {
      filtered.sort((a, b) => b.year - a.year);
    } else if (filters.orderBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  };

  const popularToday = applyFilters(animeData).slice(0, 10);
  const filteredAnime = applyFilters(animeData);

  const viewData = useMemo(() => {
    switch (view) {
      case "browse":
        return { title: "Browse All", icon: Compass, data: [...animeData].sort((a, b) => a.title.localeCompare(b.title)) };
      case "recent":
        return { title: "Recently Added", icon: Clock, data: [...animeData].sort((a, b) => b.year - a.year) };
      case "top-rated":
        return { title: "Top Rated", icon: Star, data: [...animeData].sort((a, b) => b.rating - a.rating) };
      default:
        return null;
    }
  }, [view]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-14">
        <div className="container mx-auto px-4 py-6 space-y-8">
          {!view && <SpotlightCarousel spotlightItems={spotlightItems} />}

          <div className="flex gap-6">
            <div className="hidden lg:block w-56 flex-shrink-0">
              <FilterSidebar onFilterChange={setFilters} />
            </div>

            <div className="flex-1 space-y-8">
              {/* Continue Watching Section */}
              {!view && (
                <ContinueWatching 
                  watchHistory={watchHistory} 
                  onRemove={removeProgress} 
                />
              )}

              {/* View-specific content */}
              {viewData ? (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <viewData.icon className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">{viewData.title}</h2>
                    <span className="text-xs text-muted-foreground">({viewData.data.length})</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                    {viewData.data.map((anime) => (
                      <AnimeCard key={anime.id} anime={anime} />
                    ))}
                  </div>
                </section>
              ) : (
                <>
                  {/* Trending Section */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold text-foreground">Trending</h2>
                      </div>
                      <div className="flex gap-1 bg-secondary/50 rounded-md p-0.5">
                        {(['weekly', 'monthly', 'all'] as const).map((tab) => (
                          <Button
                            key={tab}
                            variant={activeTab === tab ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTab(tab)}
                            className={`h-7 px-3 text-xs capitalize ${
                              activeTab === tab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {tab === 'all' ? 'All Time' : tab}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                      {popularToday.map((anime) => (
                        <AnimeCard key={anime.id} anime={anime} />
                      ))}
                    </div>
                  </section>

                  {/* All Anime Section */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-bold text-foreground">
                        {filters.genre !== 'all' 
                          ? `${filters.genre.charAt(0).toUpperCase() + filters.genre.slice(1)} Anime`
                          : 'All Anime'
                        }
                      </h2>
                      <span className="text-xs text-muted-foreground">({filteredAnime.length})</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                      {filteredAnime.map((anime) => (
                        <AnimeCard key={anime.id} anime={anime} />
                      ))}
                    </div>
                  </section>
                </>
              )}
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

export default Index;
