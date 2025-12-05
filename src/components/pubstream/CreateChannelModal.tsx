import { useState } from "react";
import { Users } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CreateChannelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const CreateChannelModal = ({ open, onOpenChange, onSuccess }: CreateChannelModalProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Error", description: "Channel name is required", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase
      .from("channels")
      .insert({
        name: name.trim(),
        description: description.trim() || null,
        avatar_url: avatarUrl.trim() || null,
        banner_url: bannerUrl.trim() || null,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: "Failed to create channel", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Channel created!" });
      // Store channel in array for multiple channel support
      const existingChannels = JSON.parse(localStorage.getItem("pubstream_channels") || "[]");
      existingChannels.push({ id: data.id, name: data.name });
      localStorage.setItem("pubstream_channels", JSON.stringify(existingChannels));
      // Keep legacy keys for backwards compatibility
      localStorage.setItem("pubstream_channel_id", data.id);
      localStorage.setItem("pubstream_channel_name", data.name);
      setName("");
      setDescription("");
      setAvatarUrl("");
      setBannerUrl("");
      onSuccess();
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Create Channel
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Channel Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Channel"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
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
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="banner">Banner URL</Label>
            <Input
              id="banner"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              placeholder="https://example.com/banner.jpg"
              className="mt-1"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create Channel"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
