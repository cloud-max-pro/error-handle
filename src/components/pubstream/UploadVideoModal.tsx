import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Channel {
  id: string;
  name: string;
}

interface UploadVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channels: Channel[];
  onSuccess: () => void;
}

export const UploadVideoModal = ({ open, onOpenChange, channels, onSuccess }: UploadVideoModalProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [channelId, setChannelId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Auto-select saved channel
    const savedChannelId = localStorage.getItem("pubstream_channel_id");
    if (savedChannelId && channels.some(c => c.id === savedChannelId)) {
      setChannelId(savedChannelId);
    }
  }, [channels]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({ title: "Error", description: "Video title is required", variant: "destructive" });
      return;
    }
    if (!videoUrl.trim()) {
      toast({ title: "Error", description: "Video URL is required", variant: "destructive" });
      return;
    }
    if (!channelId) {
      toast({ title: "Error", description: "Please select a channel", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from("pub_videos")
      .insert({
        title: title.trim(),
        description: description.trim() || null,
        video_url: videoUrl.trim(),
        thumbnail_url: thumbnailUrl.trim() || null,
        channel_id: channelId,
      });

    if (error) {
      toast({ title: "Error", description: "Failed to upload video", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Video uploaded!" });
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      onSuccess();
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Video
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="channel">Channel *</Label>
            <Select value={channelId} onValueChange={setChannelId}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a channel" />
              </SelectTrigger>
              <SelectContent>
                {channels.length === 0 ? (
                  <SelectItem value="none" disabled>
                    Create a channel first
                  </SelectItem>
                ) : (
                  channels.map((channel) => (
                    <SelectItem key={channel.id} value={channel.id}>
                      {channel.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title">Video Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Amazing Video"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="video-url">Video URL *</Label>
            <Input
              id="video-url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Direct link to video file (MP4, WebM, etc.)
            </p>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell viewers about this video..."
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://example.com/thumbnail.jpg"
              className="mt-1"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting || channels.length === 0}>
              {submitting ? "Uploading..." : "Upload Video"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
