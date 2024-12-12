export interface UserProfile {
  id: string;
  name: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  avatar: string;
}

export interface UserSettings {
  goals: {
    waterIntake: number;
    steps: number;
    sleepHours: number;
    exerciseCount: number;
  };
  notifications: boolean;
  theme: 'dark' | 'light';
}

export const calculateBMI = (height: number, weight: number): number => {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};