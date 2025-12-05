import { useState, useEffect, useRef } from "react";
import { Upload, Link as LinkIcon, FileVideo } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UploadVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const UploadVideoModal = ({ open, onOpenChange, onSuccess }: UploadVideoModalProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadType, setUploadType] = useState<"file" | "url">("file");
  const [userChannelId, setUserChannelId] = useState<string | null>(null);
  const [userChannelName, setUserChannelName] = useState<string | null>(null);

  useEffect(() => {
    const channelId = localStorage.getItem("pubstream_channel_id");
    const channelName = localStorage.getItem("pubstream_channel_name");
    setUserChannelId(channelId);
    setUserChannelName(channelName);
  }, [open]);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        toast({ title: "Error", description: "Video file must be less than 500MB", variant: "destructive" });
        return;
      }
      setVideoFile(file);
    }
  };

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "Error", description: "Thumbnail must be less than 5MB", variant: "destructive" });
        return;
      }
      setThumbnailFile(file);
    }
  };

  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userChannelId) {
      toast({ title: "Error", description: "Please create a channel first", variant: "destructive" });
      return;
    }

    if (!title.trim()) {
      toast({ title: "Error", description: "Video title is required", variant: "destructive" });
      return;
    }

    if (uploadType === "file" && !videoFile) {
      toast({ title: "Error", description: "Please select a video file", variant: "destructive" });
      return;
    }

    if (uploadType === "url" && !videoUrl.trim()) {
      toast({ title: "Error", description: "Video URL is required", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    setUploadProgress(10);

    try {
      let finalVideoUrl = videoUrl.trim();
      let finalThumbnailUrl = thumbnailUrl.trim() || null;

      if (uploadType === "file" && videoFile) {
        setUploadProgress(30);
        const uploadedUrl = await uploadFile(videoFile, "pub-videos");
        if (!uploadedUrl) {
          throw new Error("Failed to upload video");
        }
        finalVideoUrl = uploadedUrl;
        setUploadProgress(70);
      }

      if (thumbnailFile) {
        const uploadedThumbnailUrl = await uploadFile(thumbnailFile, "pub-thumbnails");
        if (uploadedThumbnailUrl) {
          finalThumbnailUrl = uploadedThumbnailUrl;
        }
      }

      setUploadProgress(85);

      const { error } = await supabase
        .from("pub_videos")
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          video_url: finalVideoUrl,
          thumbnail_url: finalThumbnailUrl,
          channel_id: userChannelId,
        });

      if (error) throw error;

      setUploadProgress(100);
      toast({ title: "Success", description: "Video uploaded successfully!" });
      
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setVideoFile(null);
      setThumbnailFile(null);
      setUploadProgress(0);
      
      onSuccess();
    } catch (error) {
      console.error("Upload error:", error);
      toast({ title: "Error", description: "Failed to upload video", variant: "destructive" });
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  if (!userChannelId) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[95vw] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Upload className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Upload Video
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6 sm:py-8">
            <p className="text-sm text-muted-foreground mb-4">You need to create a channel first before uploading videos.</p>
            <Button onClick={() => onOpenChange(false)} size="sm">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Upload className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Upload Video
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-muted rounded-lg">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Uploading to: <span className="font-semibold text-foreground">{userChannelName}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <Tabs value={uploadType} onValueChange={(v) => setUploadType(v as "file" | "url")}>
            <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10">
              <TabsTrigger value="file" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <FileVideo className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Upload</span> File
              </TabsTrigger>
              <TabsTrigger value="url" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <LinkIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Video</span> URL
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="space-y-3 sm:space-y-4 mt-3">
              <div>
                <Label className="text-xs sm:text-sm">Video File *</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  className="hidden"
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1.5 border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  {videoFile ? (
                    <div>
                      <FileVideo className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-primary mb-2" />
                      <p className="text-xs sm:text-sm font-medium text-foreground truncate px-2">{videoFile.name}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-xs sm:text-sm text-muted-foreground">Tap to select video</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">MP4, WebM, MOV (max 500MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="url" className="space-y-3 sm:space-y-4 mt-3">
              <div>
                <Label htmlFor="video-url" className="text-xs sm:text-sm">Video URL *</Label>
                <Input
                  id="video-url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://... or YouTube URL"
                  className="mt-1.5 h-9 sm:h-10 text-sm"
                />
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  Direct video link or YouTube URL
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div>
            <Label htmlFor="title" className="text-xs sm:text-sm">Video Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Amazing Video"
              className="mt-1.5 h-9 sm:h-10 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-xs sm:text-sm">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell viewers about this video..."
              className="mt-1.5 text-sm min-h-[60px] sm:min-h-[80px]"
              rows={2}
            />
          </div>

          <div>
            <Label className="text-xs sm:text-sm">Thumbnail</Label>
            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/*"
              onChange={handleThumbnailFileChange}
              className="hidden"
            />
            <div className="mt-1.5 flex flex-col sm:flex-row gap-2">
              <Input
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="Thumbnail URL (optional)"
                className="flex-1 h-9 sm:h-10 text-sm"
                disabled={!!thumbnailFile}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => thumbnailInputRef.current?.click()}
                className="h-9 sm:h-10 w-full sm:w-auto"
              >
                {thumbnailFile ? "Change" : "Upload"}
              </Button>
            </div>
            {thumbnailFile && (
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">
                Selected: {thumbnailFile.name}
              </p>
            )}
          </div>

          {submitting && uploadProgress > 0 && (
            <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              disabled={submitting}
              className="h-9 sm:h-10 text-sm"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={submitting}
              className="h-9 sm:h-10 text-sm"
            >
              {submitting ? `Uploading... ${uploadProgress}%` : "Upload Video"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};