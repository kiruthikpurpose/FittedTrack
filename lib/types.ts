export interface UserProfile {
  name: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  gender: 'male' | 'female' | 'other';
  photoUrl?: string;
}

export interface DailyMetrics {
  date: string;
  waterIntake: number | null;
  steps: number | null;
  sleepHours: number | null;
  caloriesBurned: number | null;
}

export interface Goals {
  waterIntake: number | null;
  steps: number | null;
  sleepHours: number | null;
}

export interface HealthData {
  profile: UserProfile;
  goals: Goals;
  dailyMetrics: DailyMetrics[];
}