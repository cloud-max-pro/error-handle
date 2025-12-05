import { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  theme?: "dark" | "light";
}

export const VideoPlayer = ({ videoUrl, title, onTimeUpdate, theme = "light" }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onTimeUpdate) {
        onTimeUpdate(video.currentTime, video.duration);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [onTimeUpdate]);

  if (!videoUrl) {
    return (
      <div className="w-full aspect-video bg-secondary rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No video available</p>
      </div>
    );
  }

  // Convert YouTube URLs to embed format
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    }
    
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    }
    
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  // Check if URL needs iframe (YouTube, Vimeo, etc.)
  const isEmbedUrl = embedUrl.includes('youtube.com/embed') ||
                      embedUrl.includes('vimeo.com') ||
                      embedUrl.includes('player.');

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const bgClass = theme === "light" ? "bg-white" : "bg-black";
  const controlsBg = theme === "light" ? "bg-gray-100/95" : "bg-black/80";
  const textClass = theme === "light" ? "text-gray-800" : "text-white";
  const sliderTrack = theme === "light" ? "bg-gray-300" : "bg-white/30";

  // For embed URLs, use iframe
  if (isEmbedUrl) {
    return (
      <div className={`relative ${bgClass} rounded-xl overflow-hidden shadow-lg`}>
        <iframe
          src={embedUrl}
          className="w-full aspect-video"
          title={title}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ border: 'none' }}
        />
      </div>
    );
  }

  // For direct video files, use custom player with white theme
  return (
    <div 
      ref={containerRef}
      className={`relative ${bgClass} rounded-xl overflow-hidden shadow-lg group`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={embedUrl}
        className="w-full aspect-video cursor-pointer"
        onClick={togglePlay}
        title={title}
        playsInline
      />
      
      {/* Custom Controls Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 ${controlsBg} backdrop-blur-sm p-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-2">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 ${(currentTime / duration) * 100}%, ${theme === 'light' ? '#d1d5db' : 'rgba(255,255,255,0.3)'} ${(currentTime / duration) * 100}%)`
            }}
          />
        </div>
        
        {/* Control Buttons */}
        <div className={`flex items-center justify-between ${textClass}`}>
          <div className="flex items-center gap-2">
            <button onClick={() => skip(-10)} className="p-1 hover:opacity-70 transition-opacity">
              <SkipBack className="h-5 w-5" />
            </button>
            <button onClick={togglePlay} className="p-2 hover:opacity-70 transition-opacity">
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            <button onClick={() => skip(10)} className="p-1 hover:opacity-70 transition-opacity">
              <SkipForward className="h-5 w-5" />
            </button>
            <span className="text-sm ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button onClick={toggleMute} className="p-1 hover:opacity-70 transition-opacity">
                {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, ${theme === 'light' ? '#d1d5db' : 'rgba(255,255,255,0.3)'} ${(isMuted ? 0 : volume) * 100}%)`
                }}
              />
            </div>
            <button onClick={toggleFullscreen} className="p-1 hover:opacity-70 transition-opacity">
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Center Play Button when paused */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className={`${theme === 'light' ? 'bg-blue-500' : 'bg-white/20'} backdrop-blur-sm rounded-full p-4`}>
            <Play className={`h-12 w-12 ${theme === 'light' ? 'text-white' : 'text-white'}`} />
          </div>
        </div>
      )}
    </div>
  );
};