-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create comments table
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anime_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read comments (public feature)
CREATE POLICY "Anyone can view comments"
ON public.comments
FOR SELECT
USING (true);

-- Allow anyone to insert comments (public feature)
CREATE POLICY "Anyone can create comments"
ON public.comments
FOR INSERT
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_comments_anime_id ON public.comments(anime_id);
CREATE INDEX idx_comments_created_at ON public.comments(created_at DESC);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;

-- Create trigger for updated_at
CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();