import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Play, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { CreateChannelModal } from "@/components/pubstream/CreateChannelModal";
import { UploadVideoModal } from "@/components/pubstream/UploadVideoModal";
import { supabase } from "@/integrations/supabase/client";

interface Channel {
  id: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  subscriber_count: number;
}

interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  views: number;
  likes_count: number;
  created_at: string;
  channel_id: string;
  channels: Channel;
}

const PubStream = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showUploadVideo, setShowUploadVideo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
    fetchChannels();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("pub_videos")
      .select(`*, channels(*)`)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVideos(data as Video[]);
    }
    setLoading(false);
  };

  const fetchChannels = async () => {
    const { data, error } = await supabase
      .from("channels")
      .select("*")
      .order("subscriber_count", { ascending: false })
      .limit(10);

    if (!error && data) {
      setChannels(data);
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Pub Stream</h1>
              <p className="text-muted-foreground mt-1">Share your videos with the world</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowCreateChannel(true)}
                variant="outline"
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                Create Channel
              </Button>
              <Button 
                onClick={() => setShowUploadVideo(true)}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                Upload Video
              </Button>
            </div>
          </div>

          {/* Popular Channels */}
          {channels.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-foreground mb-4">Popular Channels</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {channels.map((channel) => (
                  <Link 
                    key={channel.id} 
                    to={`/pub-stream/channel/${channel.id}`}
                    className="flex-shrink-0 flex flex-col items-center gap-2 p-4 bg-card rounded-xl hover:bg-card/80 transition-colors min-w-[120px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                      {channel.avatar_url ? (
                        <img src={channel.avatar_url} alt={channel.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground text-center line-clamp-1">{channel.name}</span>
                    <span className="text-xs text-muted-foreground">{formatViews(channel.subscriber_count)} subs</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Videos Grid */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Latest Videos</h2>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted rounded-xl mb-3" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-16">
                <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No videos yet</h3>
                <p className="text-muted-foreground mb-6">Be the first to upload a video!</p>
                <Button onClick={() => setShowUploadVideo(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Video
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videos.map((video) => (
                  <Link 
                    key={video.id} 
                    to={`/pub-stream/watch/${video.id}`}
                    className="group"
                  >
                    <div className="aspect-video bg-muted rounded-xl overflow-hidden mb-3 relative">
                      {video.thumbnail_url ? (
                        <img 
                          src={video.thumbnail_url} 
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary">
                          <Play className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <h3 className="font-medium text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Link 
                        to={`/pub-stream/channel/${video.channel_id}`}
                        className="hover:text-foreground"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {video.channels?.name}
                      </Link>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatViews(video.views)} views • {formatDate(video.created_at)}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <CreateChannelModal 
        open={showCreateChannel} 
        onOpenChange={setShowCreateChannel}
        onSuccess={() => {
          fetchChannels();
          setShowCreateChannel(false);
        }}
      />

      <UploadVideoModal 
        open={showUploadVideo} 
        onOpenChange={setShowUploadVideo}
        onSuccess={() => {
          fetchVideos();
          setShowUploadVideo(false);
        }}
      />
    </div>
  );
};

export default PubStream;
