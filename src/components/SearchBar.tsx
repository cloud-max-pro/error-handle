import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Play, Film } from "lucide-react";
import { Input } from "@/components/ui/input";
import { animeData, AnimeItem } from "@/data/animeData";
import { supabase } from "@/integrations/supabase/client";

interface PubVideo {
  id: string;
  title: string;
  thumbnail_url: string | null;
  views: number;
  channel_name: string;
}

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [animeResults, setAnimeResults] = useState<AnimeItem[]>([]);
  const [pubVideoResults, setPubVideoResults] = useState<PubVideo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setAnimeResults([]);
      setPubVideoResults([]);
      setIsOpen(false);
      return;
    }

    // Search anime data
    const filteredAnime = animeData.filter((anime) =>
      anime.title.toLowerCase().includes(query.toLowerCase()) ||
      anime.genres.some((genre) => genre.toLowerCase().includes(query.toLowerCase())) ||
      anime.network?.toLowerCase().includes(query.toLowerCase())
    );
    setAnimeResults(filteredAnime);

    // Search PubStream videos
    const searchPubVideos = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("pub_videos")
        .select(`
          id,
          title,
          thumbnail_url,
          views,
          channels(name)
        `)
        .ilike("title", `%${query}%`)
        .limit(5);

      if (data) {
        setPubVideoResults(
          data.map((v: any) => ({
            id: v.id,
            title: v.title,
            thumbnail_url: v.thumbnail_url,
            views: v.views || 0,
            channel_name: v.channels?.name || "Unknown"
          }))
        );
      }
      setLoading(false);
    };

    searchPubVideos();
    setIsOpen(true);
  }, [query]);

  const handleSelectAnime = (animeId: string) => {
    navigate(`/watch/${animeId}`);
    setQuery("");
    setIsOpen(false);
  };

  const handleSelectPubVideo = (videoId: string) => {
    navigate(`/pub-stream/watch/${videoId}`);
    setQuery("");
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
  };

  const hasResults = animeResults.length > 0 || pubVideoResults.length > 0;

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search anime, videos..."
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

      {isOpen && hasResults && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-md shadow-lg max-h-[70vh] overflow-y-auto z-50 animate-fade-in">
            {/* PubStream Videos */}
            {pubVideoResults.length > 0 && (
              <div>
                <div className="px-3 py-2 bg-muted/50 border-b border-border flex items-center gap-2">
                  <Play className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">Pub Stream Videos</span>
                </div>
                {pubVideoResults.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleSelectPubVideo(video.id)}
                    className="w-full flex items-center gap-3 p-2.5 hover:bg-secondary/50 transition-colors text-left border-b border-border/50"
                  >
                    <div className="w-16 h-10 bg-muted rounded overflow-hidden flex-shrink-0">
                      {video.thumbnail_url ? (
                        <img
                          src={video.thumbnail_url}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1 text-foreground">
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        {video.channel_name} • {video.views} views
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Anime Results */}
            {animeResults.length > 0 && (
              <div>
                <div className="px-3 py-2 bg-muted/50 border-b border-border flex items-center gap-2">
                  <Film className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">Anime</span>
                </div>
                {animeResults.slice(0, 5).map((anime) => (
                  <button
                    key={anime.id}
                    onClick={() => handleSelectAnime(anime.id)}
                    className="w-full flex items-center gap-3 p-2.5 hover:bg-secondary/50 transition-colors text-left border-b border-border/50 last:border-0"
                  >
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-10 h-14 object-cover rounded flex-shrink-0"
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
            )}
          </div>
        </>
      )}

      {isOpen && !hasResults && query && !loading && (
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