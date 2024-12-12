import { useState } from 'react';
import Post from '../components/social/Post';
import Leaderboard from '../components/social/Leaderboard';
import { useFitness } from '../context/FitnessContext';
import type { SocialPost, LeaderboardEntry } from '../types/fitness';

// Mock data - replace with real data later
const mockPosts: SocialPost[] = [
  {
    id: '1',
    userId: '1',
    username: 'Sarah_Fitness',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'Crushed my workout today! 💪 Hit all my targets and feeling great! Check out my stats below.',
    metrics: {
      waterIntake: 2.5,
      steps: 12000,
    },
    likes: 24,
    comments: [
      {
        id: '1',
        userId: '2',
        username: 'John_Health',
        content: 'Amazing progress! Keep it up! 🎉',
        createdAt: '2024-02-20T10:30:00Z',
      },
    ],
    createdAt: '2024-02-20T09:00:00Z',
  },
  {
    id: '2',
    userId: '2',
    username: 'Mike_Runner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    content: 'New personal best on my morning run! 🏃‍♂️ The weather was perfect today.',
    metrics: {
      steps: 15000,
    },
    likes: 18,
    comments: [],
    createdAt: '2024-02-20T08:15:00Z',
  },
  {
    id: '3',
    userId: '3',
    username: 'Emma_Wellness',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    content: 'Starting my day with a refreshing yoga session and staying hydrated! 🧘‍♀️💧',
    metrics: {
      waterIntake: 1.5,
    },
    likes: 31,
    comments: [
      {
        id: '2',
        userId: '4',
        username: 'Yoga_Master',
        content: 'Great way to start the day! Which poses did you focus on?',
        createdAt: '2024-02-20T11:45:00Z',
      },
    ],
    createdAt: '2024-02-20T07:30:00Z',
  },
];

const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: '1',
    username: 'Sarah_Fitness',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    streak: 15,
    totalPoints: 1250,
  },
  {
    userId: '2',
    username: 'Mike_Runner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    streak: 12,
    totalPoints: 980,
  },
  {
    userId: '3',
    username: 'Emma_Wellness',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    streak: 10,
    totalPoints: 850,
  },
];

export default function Community() {
  const [posts, setPosts] = useState(mockPosts);
  const { togglePostLike, likedPosts } = useFitness();

  const handleLike = (postId: string) => {
    if (!likedPosts.has(postId)) {
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      ));
      togglePostLike(postId);
    }
  };

  const handleComment = (postId: string, content: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now().toString(),
                userId: 'current-user',
                username: 'You',
                content,
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : post
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Community</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {posts.map(post => (
            <Post
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <Leaderboard entries={mockLeaderboard} />
        </div>
      </div>
    </div>
  );
}