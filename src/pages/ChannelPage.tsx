import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Users, Play, Calendar, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UploadVideoModal } from "@/components/pubstream/UploadVideoModal";

interface Channel {
  id: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  subscriber_count: number;
  created_at: string;
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
}

const ChannelPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [localUserName] = useState(() => localStorage.getItem("pubstream_username") || "");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Check if current channel belongs to user (support multiple channels)
    const channelsJson = localStorage.getItem("pubstream_channels");
    if (channelsJson && id) {
      const channels = JSON.parse(channelsJson) as Array<{ id: string; name: string }>;
      setIsOwner(channels.some(c => c.id === id));
    } else {
      // Legacy support
      const savedChannelId = localStorage.getItem("pubstream_channel_id");
      setIsOwner(savedChannelId === id);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchChannel();
      fetchVideos();
    }
  }, [id]);

  useEffect(() => {
    if (localUserName && channel) {
      checkSubscriptionStatus();
    }
  }, [localUserName, channel]);

  const fetchChannel = async () => {
    const { data, error } = await supabase
      .from("channels")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setChannel(data);
    }
    setLoading(false);
  };

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("pub_videos")
      .select("*")
      .eq("channel_id", id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVideos(data);
    }
  };

  const checkSubscriptionStatus = async () => {
    const { data } = await supabase
      .from("pub_subscriptions")
      .select("id")
      .eq("channel_id", id)
      .eq("user_name", localUserName)
      .single();

    setIsSubscribed(!!data);
  };

  const handleSubscribe = async () => {
    let userName = localUserName;
    
    if (!userName) {
      const name = prompt("Enter your name to subscribe:");
      if (!name) return;
      userName = name;
      localStorage.setItem("pubstream_username", name);
    }

    if (isSubscribed) {
      await supabase
        .from("pub_subscriptions")
        .delete()
        .eq("channel_id", id)
        .eq("user_name", userName);

      await supabase
        .from("channels")
        .update({ subscriber_count: Math.max(0, (channel?.subscriber_count || 1) - 1) })
        .eq("id", id);

      setIsSubscribed(false);
      setChannel((prev) => prev ? { ...prev, subscriber_count: Math.max(0, prev.subscriber_count - 1) } : null);
      toast({ title: "Unsubscribed" });
    } else {
      await supabase
        .from("pub_subscriptions")
        .insert({ channel_id: id, user_name: userName });

      await supabase
        .from("channels")
        .update({ subscriber_count: (channel?.subscriber_count || 0) + 1 })
        .eq("id", id);

      setIsSubscribed(true);
      setChannel((prev) => prev ? { ...prev, subscriber_count: prev.subscriber_count + 1 } : null);
      toast({ title: "Subscribed!" });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <h1 className="text-2xl font-bold text-foreground">Channel not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Banner */}
        <div 
          className="h-32 md:h-48 bg-gradient-to-r from-primary/30 to-primary/10"
          style={channel.banner_url ? { backgroundImage: `url(${channel.banner_url})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
        />

        {/* Channel Info */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-8 md:-mt-12 mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card border-4 border-background flex items-center justify-center overflow-hidden">
              {channel.avatar_url ? (
                <img src={channel.avatar_url} alt={channel.name} className="w-full h-full object-cover" />
              ) : (
                <Users className="h-12 w-12 md:h-16 md:w-16 text-primary" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{channel.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mt-1">
                <span>{formatViews(channel.subscriber_count)} subscribers</span>
                <span>•</span>
                <span>{videos.length} videos</span>
              </div>
            </div>
            <div className="flex gap-2">
              {isOwner && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsUploadOpen(true)}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
              )}
              {!isOwner && (
                <Button
                  variant={isSubscribed ? "outline" : "default"}
                  size="lg"
                  onClick={handleSubscribe}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              )}
            </div>
          </div>

          {channel.description && (
            <p className="text-muted-foreground mb-8 max-w-2xl">{channel.description}</p>
          )}

          {/* Videos */}
          <div className="pb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">Videos</h2>
            {videos.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-xl">
                <Play className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No videos uploaded yet</p>
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
                    <div className="text-xs text-muted-foreground">
                      {formatViews(video.views)} views • {formatDate(video.created_at)}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <UploadVideoModal
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onSuccess={() => {
          fetchVideos();
          setIsUploadOpen(false);
        }}
        preselectedChannelId={id}
      />
    </div>
  );
};

export default ChannelPage;
