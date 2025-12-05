-- Allow anyone to delete channels (for channel owners)
CREATE POLICY "Anyone can delete channels"
ON public.channels
FOR DELETE
USING (true);

-- Allow anyone to delete videos (for channel owners)
CREATE POLICY "Anyone can delete videos"
ON public.pub_videos
FOR DELETE
USING (true);