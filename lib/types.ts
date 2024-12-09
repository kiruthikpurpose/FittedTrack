export interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female' | 'other';
}

export interface DailyMetrics {
  date: string;
  waterIntake: number;
  steps: number;
  sleepHours: number;
  caloriesBurned: number;
}

export interface Goals {
  waterIntake: number;
  steps: number;
  sleepHours: number;
}

export interface HealthData {
  profile: UserProfile;
  goals: Goals;
  dailyMetrics: DailyMetrics[];
}