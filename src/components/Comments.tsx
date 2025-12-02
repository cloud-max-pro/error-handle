import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

interface Comment {
  id: string;
  anime_id: string;
  user_name: string;
  comment_text: string;
  created_at: string;
}

interface CommentsProps {
  animeId: string;
}

export const Comments = ({ animeId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch initial comments
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('anime_id', animeId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data || []);
      }
    };

    fetchComments();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('comments-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `anime_id=eq.${animeId}`,
        },
        (payload) => {
          setComments((current) => [payload.new as Comment, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [animeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim() || !commentText.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your name and comment',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from('comments')
      .insert({
        anime_id: animeId,
        user_name: userName.trim(),
        comment_text: commentText.trim(),
      });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to post comment. Please try again.',
        variant: 'destructive',
      });
      console.error('Error posting comment:', error);
    } else {
      toast({
        title: 'Success',
        description: 'Comment posted successfully!',
      });
      setCommentText('');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Comments</h2>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-secondary/50 p-6 rounded-lg">
        <div>
          <Input
            placeholder="Your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-background"
          />
        </div>
        <div>
          <Textarea
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="bg-background min-h-[100px]"
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-secondary/50 p-4 rounded-lg space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  {comment.user_name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(comment.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p className="text-foreground whitespace-pre-wrap">
                {comment.comment_text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};