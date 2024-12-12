export interface FitnessMetrics {
  waterIntake: number;
  steps: number;
  sleepHours: number;
  exerciseCompleted: boolean[];
}

export interface FitnessGoals {
  waterIntake: number;
  steps: number;
  sleepHours: number;
  exerciseCount: number;
}

export interface DailyMetrics extends FitnessMetrics {
  date: string;
}

export interface SocialPost {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  metrics?: Partial<FitnessMetrics>;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  streak: number;
  totalPoints: number;
}

export const defaultGoals: FitnessGoals = {
  waterIntake: 2.5,
  steps: 10000,
  sleepHours: 8,
  exerciseCount: 3,
};