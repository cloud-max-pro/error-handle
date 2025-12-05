
-- Create channels table
CREATE TABLE public.channels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  subscriber_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pub_videos table
CREATE TABLE public.pub_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID REFERENCES public.channels(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  views INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pub_likes table
CREATE TABLE public.pub_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES public.pub_videos(id) ON DELETE CASCADE NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(video_id, user_name)
);

-- Create pub_comments table
CREATE TABLE public.pub_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES public.pub_videos(id) ON DELETE CASCADE NOT NULL,
  user_name TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pub_subscriptions table
CREATE TABLE public.pub_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID REFERENCES public.channels(id) ON DELETE CASCADE NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(channel_id, user_name)
);

-- Enable RLS on all tables
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pub_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pub_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pub_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pub_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for channels
CREATE POLICY "Anyone can view channels" ON public.channels FOR SELECT USING (true);
CREATE POLICY "Anyone can create channels" ON public.channels FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update channels" ON public.channels FOR UPDATE USING (true);

-- RLS Policies for pub_videos
CREATE POLICY "Anyone can view videos" ON public.pub_videos FOR SELECT USING (true);
CREATE POLICY "Anyone can upload videos" ON public.pub_videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update videos" ON public.pub_videos FOR UPDATE USING (true);

-- RLS Policies for pub_likes
CREATE POLICY "Anyone can view likes" ON public.pub_likes FOR SELECT USING (true);
CREATE POLICY "Anyone can like videos" ON public.pub_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can remove likes" ON public.pub_likes FOR DELETE USING (true);

-- RLS Policies for pub_comments
CREATE POLICY "Anyone can view comments" ON public.pub_comments FOR SELECT USING (true);
CREATE POLICY "Anyone can comment" ON public.pub_comments FOR INSERT WITH CHECK (true);

-- RLS Policies for pub_subscriptions
CREATE POLICY "Anyone can view subscriptions" ON public.pub_subscriptions FOR SELECT USING (true);
CREATE POLICY "Anyone can subscribe" ON public.pub_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can unsubscribe" ON public.pub_subscriptions FOR DELETE USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_channels_updated_at BEFORE UPDATE ON public.channels FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pub_videos_updated_at BEFORE UPDATE ON public.pub_videos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pub_comments_updated_at BEFORE UPDATE ON public.pub_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for pub_comments
ALTER PUBLICATION supabase_realtime ADD TABLE public.pub_comments;
