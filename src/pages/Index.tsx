import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { SpotlightCarousel } from "@/components/SpotlightCarousel";
import { AnimeCard } from "@/components/AnimeCard";
import { FilterSidebar, FilterState } from "@/components/FilterSidebar";
import { ContinueWatching } from "@/components/ContinueWatching";
import { animeData } from "@/data/animeData";
import { Button } from "@/components/ui/button";
import { TrendingUp, Sparkles, Compass, Star, Tv, ArrowLeft } from "lucide-react";
import { useWatchProgress } from "@/hooks/useWatchProgress";

const networks = [
  { id: "crunchyroll", name: "Crunchyroll", color: "#F47521", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Crunchyroll_Logo.png/800px-Crunchyroll_Logo.png" },
  { id: "netflix", name: "Netflix", color: "#E50914", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" },
  { id: "disney-plus", name: "Disney+", color: "#113CCF", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1920px-Disney%2B_logo.svg.png" },
  { id: "hulu", name: "Hulu", color: "#1CE783", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hulu_Logo.svg/1920px-Hulu_Logo.svg.png" },
  { id: "amazon-prime", name: "Prime Video", color: "#00A8E1", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/1920px-Amazon_Prime_Video_logo.svg.png" },
  { id: "funimation", name: "Funimation", color: "#5B0BB5", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Funimation_2016.svg/1920px-Funimation_2016.svg.png" },
  { id: "hidive", name: "HIDIVE", color: "#00BAFF", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/HIDIVE_logo.svg/1920px-HIDIVE_logo.svg.png" },
  { id: "hbo-max", name: "Max", color: "#741DFF", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Max_logo.svg/1920px-Max_logo.svg.png" },
  { id: "apple-tv", name: "Apple TV+", color: "#000000", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Apple_TV_Plus_Logo.svg/1920px-Apple_TV_Plus_Logo.svg.png" },
  { id: "paramount-plus", name: "Paramount+", color: "#0064FF", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Paramount_Plus.svg/1920px-Paramount_Plus.svg.png" },
  { id: "peacock", name: "Peacock", color: "#000000", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/NBCUniversal_Peacock_Logo.svg/1920px-NBCUniversal_Peacock_Logo.svg.png" },
  { id: "adult-swim", name: "Adult Swim", color: "#000000", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Adult_Swim_2003_logo.svg/1920px-Adult_Swim_2003_logo.svg.png" },
];

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const view = searchParams.get("view");
  const networkId = searchParams.get("network");
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
      case "top-rated":
        return { title: "Top Rated", icon: Star, data: [...animeData].sort((a, b) => b.rating - a.rating) };
      default:
        return null;
    }
  }, [view]);

  const isNetworksView = view === "networks";
  const selectedNetwork = networkId ? networks.find(n => n.id === networkId) : null;
  const networkAnime = networkId ? animeData.filter(anime => anime.network === networkId) : [];

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

              {/* Network Anime View */}
              {selectedNetwork ? (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("/?view=networks")}
                      className="h-8 px-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div 
                      className="h-8 px-3 rounded flex items-center justify-center font-bold text-white text-sm"
                      style={{ backgroundColor: selectedNetwork.color === "#FFFFFF" ? "#333" : selectedNetwork.color }}
                    >
                      {selectedNetwork.name}
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Anime</h2>
                    <span className="text-xs text-muted-foreground">({networkAnime.length})</span>
                  </div>
                  {networkAnime.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                      {networkAnime.map((anime) => (
                        <AnimeCard key={anime.id} anime={anime} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Tv className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No anime available from {selectedNetwork.name} yet.</p>
                    </div>
                  )}
                </section>
              ) : isNetworksView ? (
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <Tv className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">Streaming Networks</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                    {networks.map((network) => {
                      const count = animeData.filter(a => a.network === network.id).length;
                      return (
                        <div
                          key={network.id}
                          onClick={() => navigate(`/?network=${network.id}`)}
                          className="group relative bg-card hover:bg-card/80 border border-border/50 rounded-lg p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:scale-105 hover:border-primary/50"
                          style={{ boxShadow: `0 0 0 0 ${network.color}`, transition: 'box-shadow 0.3s' }}
                          onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 4px 20px ${network.color}40`}
                          onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0 0 ${network.color}`}
                        >
                          <div className="h-12 w-full flex items-center justify-center rounded-lg p-2">
                            <img 
                              src={network.logo} 
                              alt={network.name}
                              className="h-full max-w-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML = `<span class="font-bold text-white text-lg">${network.name}</span>`;
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {network.name}
                          </span>
                          {count > 0 && (
                            <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                              {count}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : viewData ? (
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
