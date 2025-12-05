import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ThumbsUp, Share2, Users, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useToast } from "@/hooks/use-toast";
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

interface Comment {
  id: string;
  user_name: string;
  comment_text: string;
  created_at: string;
}

const PubStreamWatch = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [video, setVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localUserName, setLocalUserName] = useState(() => 
    localStorage.getItem("pubstream_username") || ""
  );

  useEffect(() => {
    if (id) {
      fetchVideo();
      fetchComments();
      incrementViews();
    }
  }, [id]);

  useEffect(() => {
    if (localUserName && video) {
      checkLikeStatus();
      checkSubscriptionStatus();
    }
  }, [localUserName, video]);

  useEffect(() => {
    if (!id) return;

    const channel = supabase
      .channel(`pub_comments_${id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "pub_comments", filter: `video_id=eq.${id}` },
        (payload) => {
          setComments((prev) => [payload.new as Comment, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const fetchVideo = async () => {
    const { data, error } = await supabase
      .from("pub_videos")
      .select(`*, channels(*)`)
      .eq("id", id)
      .single();

    if (!error && data) {
      setVideo(data as Video);
    }
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("pub_comments")
      .select("*")
      .eq("video_id", id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setComments(data);
    }
  };

  const incrementViews = async () => {
    const { data } = await supabase
      .from("pub_videos")
      .select("views")
      .eq("id", id)
      .single();
    
    if (data) {
      await supabase
        .from("pub_videos")
        .update({ views: (data.views || 0) + 1 })
        .eq("id", id);
    }
  };

  const checkLikeStatus = async () => {
    const { data } = await supabase
      .from("pub_likes")
      .select("id")
      .eq("video_id", id)
      .eq("user_name", localUserName)
      .single();

    setIsLiked(!!data);
  };

  const checkSubscriptionStatus = async () => {
    if (!video?.channel_id) return;

    const { data } = await supabase
      .from("pub_subscriptions")
      .select("id")
      .eq("channel_id", video.channel_id)
      .eq("user_name", localUserName)
      .single();

    setIsSubscribed(!!data);
  };

  const handleLike = async () => {
    if (!localUserName) {
      const name = prompt("Enter your name to like:");
      if (!name) return;
      setLocalUserName(name);
      localStorage.setItem("pubstream_username", name);
    }

    const currentUserName = localUserName || localStorage.getItem("pubstream_username");
    if (!currentUserName) return;

    if (isLiked) {
      await supabase
        .from("pub_likes")
        .delete()
        .eq("video_id", id)
        .eq("user_name", currentUserName);

      await supabase
        .from("pub_videos")
        .update({ likes_count: Math.max(0, (video?.likes_count || 1) - 1) })
        .eq("id", id);

      setIsLiked(false);
      setVideo((prev) => prev ? { ...prev, likes_count: Math.max(0, prev.likes_count - 1) } : null);
    } else {
      await supabase
        .from("pub_likes")
        .insert({ video_id: id, user_name: currentUserName });

      await supabase
        .from("pub_videos")
        .update({ likes_count: (video?.likes_count || 0) + 1 })
        .eq("id", id);

      setIsLiked(true);
      setVideo((prev) => prev ? { ...prev, likes_count: prev.likes_count + 1 } : null);
    }
  };

  const handleSubscribe = async () => {
    if (!video?.channel_id) return;

    if (!localUserName) {
      const name = prompt("Enter your name to subscribe:");
      if (!name) return;
      setLocalUserName(name);
      localStorage.setItem("pubstream_username", name);
    }

    const currentUserName = localUserName || localStorage.getItem("pubstream_username");
    if (!currentUserName) return;

    if (isSubscribed) {
      await supabase
        .from("pub_subscriptions")
        .delete()
        .eq("channel_id", video.channel_id)
        .eq("user_name", currentUserName);

      await supabase
        .from("channels")
        .update({ subscriber_count: Math.max(0, (video.channels?.subscriber_count || 1) - 1) })
        .eq("id", video.channel_id);

      setIsSubscribed(false);
      toast({ title: "Unsubscribed" });
    } else {
      await supabase
        .from("pub_subscriptions")
        .insert({ channel_id: video.channel_id, user_name: currentUserName });

      await supabase
        .from("channels")
        .update({ subscriber_count: (video.channels?.subscriber_count || 0) + 1 })
        .eq("id", video.channel_id);

      setIsSubscribed(true);
      toast({ title: "Subscribed!" });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!", description: "Share it with your friends" });
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !commentText.trim()) return;

    setSubmitting(true);
    const { error } = await supabase
      .from("pub_comments")
      .insert({
        video_id: id,
        user_name: userName.trim(),
        comment_text: commentText.trim(),
      });

    if (error) {
      toast({ title: "Error", description: "Failed to post comment", variant: "destructive" });
    } else {
      setCommentText("");
      localStorage.setItem("pubstream_username", userName);
      setLocalUserName(userName);
    }
    setSubmitting(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
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

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <h1 className="text-2xl font-bold text-foreground">Video not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Video Player - White Theme */}
          <div className="mb-6">
            <VideoPlayer 
              videoUrl={video.video_url} 
              title={video.title}
            />
          </div>

          {/* Video Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">{video.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span>{formatViews(video.views)} views</span>
              <span>•</span>
              <span>{formatDate(video.created_at)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-border">
            <Button
              variant={isLiked ? "default" : "outline"}
              className="gap-2"
              onClick={handleLike}
            >
              <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {formatViews(video.likes_count)}
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Channel Info */}
          <div className="flex items-center justify-between p-4 bg-card rounded-xl mb-6">
            <Link 
              to={`/pub-stream/channel/${video.channel_id}`}
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                {video.channels?.avatar_url ? (
                  <img src={video.channels.avatar_url} alt={video.channels.name} className="w-full h-full object-cover" />
                ) : (
                  <Users className="h-6 w-6 text-primary" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {video.channels?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatViews(video.channels?.subscriber_count || 0)} subscribers
                </p>
              </div>
            </Link>
            <Button
              variant={isSubscribed ? "outline" : "default"}
              onClick={handleSubscribe}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </div>

          {/* Description */}
          {video.description && (
            <div className="p-4 bg-card rounded-xl mb-6">
              <p className="text-foreground whitespace-pre-wrap">{video.description}</p>
            </div>
          )}

          {/* Comments */}
          <div className="bg-card rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {comments.length} Comments
            </h3>

            <form onSubmit={handleComment} className="mb-6">
              <div className="flex gap-3 mb-3">
                <Input
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-3">
                <Input
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={submitting || !userName.trim() || !commentText.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No comments yet. Be the first!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-primary">
                        {comment.user_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground text-sm">{comment.user_name}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
                      </div>
                      <p className="text-foreground text-sm mt-1">{comment.comment_text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PubStreamWatch;
