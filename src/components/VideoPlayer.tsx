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

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        src={videoUrl}
        className="w-full aspect-video"
        controls
        controlsList="nodownload"
        title={title}
      />
    </div>
  );
};
