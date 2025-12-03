import { useState, useEffect } from "react";

export interface WatchProgress {
  animeId: string;
  season: number;
  episode: number;
  progress: number;
  duration: number;
  timestamp: number;
}

const STORAGE_KEY = "gear5tv-watch-progress";

export const useWatchProgress = () => {
  const [watchHistory, setWatchHistory] = useState<WatchProgress[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setWatchHistory(JSON.parse(stored));
    }
  }, []);

  const saveProgress = (progress: Omit<WatchProgress, "timestamp">) => {
    const newProgress: WatchProgress = {
      ...progress,
      timestamp: Date.now(),
    };

    setWatchHistory((prev) => {
      const filtered = prev.filter((p) => p.animeId !== progress.animeId);
      const updated = [newProgress, ...filtered].slice(0, 20);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getProgress = (animeId: string): WatchProgress | undefined => {
    return watchHistory.find((p) => p.animeId === animeId);
  };

  const removeProgress = (animeId: string) => {
    setWatchHistory((prev) => {
      const updated = prev.filter((p) => p.animeId !== animeId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { watchHistory, saveProgress, getProgress, removeProgress };
};
