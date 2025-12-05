import { useState, useEffect } from "react";
import { Users, Trash2 } from "lucide-react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Channel {
  id: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  banner_url: string | null;
}

interface EditChannelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channel: Channel;
  onSuccess: () => void;
}

export const EditChannelModal = ({ open, onOpenChange, channel, onSuccess }: EditChannelModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (channel && open) {
      setName(channel.name);
      setDescription(channel.description || "");
      setAvatarUrl(channel.avatar_url || "");
      setBannerUrl(channel.banner_url || "");
    }
  }, [channel, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Error", description: "Channel name is required", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from("channels")
      .update({
        name: name.trim(),
        description: description.trim() || null,
        avatar_url: avatarUrl.trim() || null,
        banner_url: bannerUrl.trim() || null,
      })
      .eq("id", channel.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update channel", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Channel updated!" });
      
      // Update localStorage
      const channelsJson = localStorage.getItem("pubstream_channels");
      if (channelsJson) {
        const channels = JSON.parse(channelsJson) as Array<{ id: string; name: string }>;
        const updatedChannels = channels.map(c => 
          c.id === channel.id ? { ...c, name: name.trim() } : c
        );
        localStorage.setItem("pubstream_channels", JSON.stringify(updatedChannels));
      }
      
      onSuccess();
      onOpenChange(false);
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    
    // Delete all videos for this channel first
    await supabase
      .from("pub_videos")
      .delete()
      .eq("channel_id", channel.id);

    // Delete all subscriptions for this channel
    await supabase
      .from("pub_subscriptions")
      .delete()
      .eq("channel_id", channel.id);

    // Delete the channel
    const { error } = await supabase
      .from("channels")
      .delete()
      .eq("id", channel.id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete channel", variant: "destructive" });
      setDeleting(false);
      return;
    }

    // Remove from localStorage
    const channelsJson = localStorage.getItem("pubstream_channels");
    if (channelsJson) {
      const channels = JSON.parse(channelsJson) as Array<{ id: string; name: string }>;
      const updatedChannels = channels.filter(c => c.id !== channel.id);
      localStorage.setItem("pubstream_channels", JSON.stringify(updatedChannels));
      
      // Update legacy keys if needed
      if (updatedChannels.length > 0) {
        localStorage.setItem("pubstream_channel_id", updatedChannels[0].id);
        localStorage.setItem("pubstream_channel_name", updatedChannels[0].name);
      } else {
        localStorage.removeItem("pubstream_channel_id");
        localStorage.removeItem("pubstream_channel_name");
      }
    }

    toast({ title: "Success", description: "Channel deleted" });
    onOpenChange(false);
    navigate("/pub-stream");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Edit Channel
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-xs sm:text-sm">Channel Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Channel"
              className="mt-1 h-9 sm:h-10"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-xs sm:text-sm">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell viewers about your channel..."
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="avatar" className="text-xs sm:text-sm">Avatar URL</Label>
            <Input
              id="avatar"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="mt-1 h-9 sm:h-10"
            />
          </div>
          <div>
            <Label htmlFor="banner" className="text-xs sm:text-sm">Banner URL</Label>
            <Input
              id="banner"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              placeholder="https://example.com/banner.jpg"
              className="mt-1 h-9 sm:h-10"
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Channel
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[95vw] max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Channel?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your channel and all its videos. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} size="sm">
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} size="sm">
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};