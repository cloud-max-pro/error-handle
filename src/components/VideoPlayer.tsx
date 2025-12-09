import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

export const VideoPlayer = ({ videoUrl, title, onTimeUpdate }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onTimeUpdate) return;

    const handleTimeUpdate = () => {
      onTimeUpdate(video.currentTime, video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
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

  // Check if URL is a direct video file (mp4, webm, etc.)
  const isDirectVideoFile = /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i.test(embedUrl);

  // For direct video files, use native browser controls with time tracking
  if (isDirectVideoFile) {
    return (
      <div className="relative bg-black rounded-xl overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          src={embedUrl}
          className="w-full aspect-video"
          title={title}
          controls
          playsInline
        />
      </div>
    );
  }

  // For all other URLs (embeds, streaming sites), use iframe to show their native player
  return (
    <div className="relative bg-black rounded-xl overflow-hidden shadow-lg">
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
};