interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export const VideoPlayer = ({ videoUrl, title }: VideoPlayerProps) => {
  if (!videoUrl) {
    return (
      <div className="w-full aspect-video bg-secondary rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No video available</p>
      </div>
    );
  }

  // Check if URL is from an embed service (needs iframe) or direct video file
  const isEmbedUrl = videoUrl.includes('play.') || 
                      videoUrl.includes('embed') || 
                      videoUrl.includes('player') ||
                      !videoUrl.match(/\.(mp4|webm|ogg|mov)$/i);

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      {isEmbedUrl ? (
        <iframe
          src={videoUrl}
          className="w-full aspect-video"
          title={title}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ border: 'none' }}
        />
      ) : (
        <video
          src={videoUrl}
          className="w-full aspect-video"
          controls
          controlsList="nodownload"
          title={title}
        />
      )}
    </div>
  );
};
