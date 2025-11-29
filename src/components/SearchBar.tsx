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
      anime.genres.some((genre) => genre.toLowerCase().includes(query.toLowerCase()))
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
    <div className="relative flex-1 max-w-xl mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search anime..."
          className="pl-10 pr-10 bg-secondary border-border"
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
          <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 animate-fade-in">
            {results.map((anime) => (
              <button
                key={anime.id}
                onClick={() => handleSelect(anime.id)}
                className="w-full flex items-center gap-3 p-3 hover:bg-secondary transition-colors text-left"
              >
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm line-clamp-1 text-foreground">
                    {anime.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {anime.type === 'series' ? 'TV' : 'Movie'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {anime.year}
                    </span>
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
          <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-lg shadow-lg p-4 z-50 animate-fade-in">
            <p className="text-center text-muted-foreground">No results found for "{query}"</p>
          </div>
        </>
      )}
    </div>
  );
};
