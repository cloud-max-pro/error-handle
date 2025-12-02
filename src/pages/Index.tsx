import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SpotlightCarousel } from "@/components/SpotlightCarousel";
import { AnimeCard } from "@/components/AnimeCard";
import { FilterSidebar, FilterState } from "@/components/FilterSidebar";
import { animeData } from "@/data/animeData";
import { Button } from "@/components/ui/button";

const Index = () => {
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

    // Ordering
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 space-y-12">
          <SpotlightCarousel spotlightItems={spotlightItems} />

          <div className="flex gap-6">
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar onFilterChange={setFilters} />
            </div>

            <div className="flex-1 space-y-12">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-foreground">Popular Series</h2>
                  <div className="flex gap-2">
                    <Button
                      variant={activeTab === 'weekly' ? 'default' : 'secondary'}
                      size="sm"
                      onClick={() => setActiveTab('weekly')}
                    >
                      Weekly
                    </Button>
                    <Button
                      variant={activeTab === 'monthly' ? 'default' : 'secondary'}
                      size="sm"
                      onClick={() => setActiveTab('monthly')}
                    >
                      Monthly
                    </Button>
                    <Button
                      variant={activeTab === 'all' ? 'default' : 'secondary'}
                      size="sm"
                      onClick={() => setActiveTab('all')}
                    >
                      All
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                  {popularToday.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  All Anime {filters.genre !== 'all' && `- ${filters.genre.charAt(0).toUpperCase() + filters.genre.slice(1)}`}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredAnime.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime} />
                  ))}
                </div>
              </section>
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

export default Index;
