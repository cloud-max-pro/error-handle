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
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
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
    // Handle youtube.com/watch?v= format
    if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Handle youtu.be/ format
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  // Check if URL is from an embed service (needs iframe) or direct video file
  const isEmbedUrl = embedUrl.includes('youtube.com/embed') ||
                      embedUrl.includes('play.') || 
                      embedUrl.includes('embed') || 
                      embedUrl.includes('player') ||
                      !embedUrl.match(/\.(mp4|webm|ogg|mov)$/i);

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      {isEmbedUrl ? (
        <iframe
          src={embedUrl}
          className="w-full aspect-video"
          title={title}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ border: 'none' }}
        />
      ) : (
        <video
          ref={videoRef}
          src={embedUrl}
          className="w-full aspect-video"
          controls
          controlsList="nodownload"
          title={title}
        />
      )}
    </div>
  );
};
