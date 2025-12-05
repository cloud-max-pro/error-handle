-- Create storage bucket for pub-stream videos
INSERT INTO storage.buckets (id, name, public) VALUES ('pub-videos', 'pub-videos', true);

-- Allow anyone to upload videos
CREATE POLICY "Anyone can upload videos" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'pub-videos');

-- Allow anyone to view videos
CREATE POLICY "Anyone can view videos" ON storage.objects 
FOR SELECT USING (bucket_id = 'pub-videos');

-- Allow anyone to delete their videos
CREATE POLICY "Anyone can delete videos" ON storage.objects 
FOR DELETE USING (bucket_id = 'pub-videos');

-- Create storage bucket for pub-thumbnails
INSERT INTO storage.buckets (id, name, public) VALUES ('pub-thumbnails', 'pub-thumbnails', true);

-- Storage policies for thumbnails
CREATE POLICY "Anyone can upload thumbnails" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'pub-thumbnails');

CREATE POLICY "Anyone can view thumbnails" ON storage.objects 
FOR SELECT USING (bucket_id = 'pub-thumbnails');

CREATE POLICY "Anyone can delete thumbnails" ON storage.objects 
FOR DELETE USING (bucket_id = 'pub-thumbnails');