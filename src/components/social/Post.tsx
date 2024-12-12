import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import type { SocialPost as SocialPostType } from '../../types/fitness';
import { format } from 'date-fns';

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

  const formatMetric = (value: number, unit: string) => {
    return `${value}${unit}`;
  };

  return (
    <div className="bg-navy-900 rounded-xl p-6 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.avatar}
            alt={post.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-white">{post.username}</h3>
            <p className="text-sm text-gray-400">
              {format(new Date(post.createdAt), 'MMM d, yyyy • h:mm a')}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </div>

      <p className="text-white">{post.content}</p>

      {post.metrics && (
        <div className="grid grid-cols-2 gap-4 bg-navy-800 rounded-lg p-4">
          {post.metrics.waterIntake !== undefined && (
            <div>
              <p className="text-gray-400">Water Intake</p>
              <p className="text-green-400 font-semibold">
                {formatMetric(post.metrics.waterIntake, 'L')}
              </p>
            </div>
          )}
          {post.metrics.steps !== undefined && (
            <div>
              <p className="text-gray-400">Steps</p>
              <p className="text-green-400 font-semibold">
                {formatMetric(post.metrics.steps, '')}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-6">
        <button
          onClick={() => !isLiked && onLike(post.id)}
          className={`flex items-center gap-2 transition-colors ${
            isLiked ? 'text-green-400 cursor-default' : 'text-gray-400 hover:text-green-400'
          }`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{post.likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-gray-400 hover:text-green-400"
        >
          <MessageCircle size={20} />
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-400 hover:text-green-400">
          <Share2 size={20} />
        </button>
      </div>

      {showComments && (
        <div className="space-y-4">
          <form onSubmit={handleSubmitComment} className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-navy-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className="px-4 py-2 bg-green-400 text-navy-900 rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </form>

          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="bg-navy-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-white">{comment.username}</span>
                  <span className="text-sm text-gray-400">
                    {format(new Date(comment.createdAt), 'MMM d, h:mm a')}
                  </span>
                </div>
                <p className="text-gray-300">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}