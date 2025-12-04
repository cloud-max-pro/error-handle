import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { animeData, AnimeItem } from "@/data/animeData";
import { Badge } from "@/components/ui/badge";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filtered = animeData.filter((anime) =>
      anime.title.toLowerCase().includes(query.toLowerCase()) ||
      anime.genres.some((genre) => genre.toLowerCase().includes(query.toLowerCase())) ||
      anime.network?.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setIsOpen(true);
  }, [query]);

  const handleSelect = (animeId: string) => {
    navigate(`/watch/${animeId}`);
    setQuery("");
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search anime, movies..."
          className="pl-9 pr-9 h-9 bg-secondary/50 border-border/50 focus:bg-secondary focus:border-primary/50 transition-colors text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-md shadow-lg max-h-80 overflow-y-auto z-50 animate-fade-in">
            {results.slice(0, 8).map((anime) => (
              <button
                key={anime.id}
                onClick={() => handleSelect(anime.id)}
                className="w-full flex items-center gap-3 p-2.5 hover:bg-secondary/50 transition-colors text-left border-b border-border/50 last:border-0"
              >
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-10 h-14 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-1 text-foreground">
                    {anime.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-muted-foreground">
                      {anime.type === 'series' ? 'TV' : 'Movie'} • {anime.year}
                    </span>
                    <span className="text-[11px] text-primary">★ {anime.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {isOpen && results.length === 0 && query && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-md shadow-lg p-4 z-50 animate-fade-in">
            <p className="text-center text-sm text-muted-foreground">No results for "{query}"</p>
          </div>
        </>
      )}
    </div>
  );
};
