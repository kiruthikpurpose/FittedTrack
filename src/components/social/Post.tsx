import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import type { SocialPost as SocialPostType } from '../../types/fitness';

interface PostProps {
  post: SocialPostType;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

export default function Post({ post, onLike, onComment }: PostProps) {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { likedPosts } = useFitness();

  const isLiked = likedPosts.has(post.id);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <div className="bg-navy-900 rounded-xl p-6 space-y-4 animate-fade-in">
      {/* ... rest of the component remains the same ... */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-2 ${
            isLiked ? 'text-green-400' : 'text-gray-400 hover:text-green-400'
          }`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{post.likes}</span>
        </button>
        {/* ... rest of the component remains the same ... */}
      </div>
    </div>
  );
}