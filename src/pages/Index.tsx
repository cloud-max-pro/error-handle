import { Navbar } from "@/components/Navbar";
import { SpotlightCarousel } from "@/components/SpotlightCarousel";
import { AnimeCard } from "@/components/AnimeCard";
import { animeData } from "@/data/animeData";

const Index = () => {
  const spotlightItems = animeData
    .filter((anime) => anime.isSpotlight)
    .sort((a, b) => (a.spotlightRank || 0) - (b.spotlightRank || 0));

  const popularToday = animeData.slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 space-y-12">
          <SpotlightCarousel spotlightItems={spotlightItems} />

          <section>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Popular Today</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {popularToday.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-foreground">All Anime</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {animeData.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          </section>
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
