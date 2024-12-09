'use client';

import { HealthData, DailyMetrics, UserProfile, Goals } from './types';

const STORAGE_KEY = 'fitted_track_data';

const defaultGoals: Goals = {
  waterIntake: 3,
  steps: 10000,
  sleepHours: 8,
};

const defaultProfile: UserProfile = {
  name: '',
  age: 0,
  height: 0,
  weight: 0,
  gender: 'other',
};

export function getStoredData(): HealthData {
  if (typeof window === 'undefined') return { profile: defaultProfile, goals: defaultGoals, dailyMetrics: [] };
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const initialData: HealthData = {
      profile: defaultProfile,
      goals: defaultGoals,
      dailyMetrics: [],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  
  return JSON.parse(stored);
}

export function saveData(data: HealthData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getMetricsForDate(date: string): DailyMetrics | undefined {
  const data = getStoredData();
  return data.dailyMetrics.find(metric => metric.date === date);
}

export function updateMetricsForDate(metrics: DailyMetrics) {
  const data = getStoredData();
  const index = data.dailyMetrics.findIndex(m => m.date === metrics.date);

  if (index === -1) {
    data.dailyMetrics.push(metrics);
  } else {
    data.dailyMetrics[index] = metrics;
  }

  // Sort metrics by date
  data.dailyMetrics.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  saveData(data);
}

export function getTodayMetrics(): DailyMetrics | undefined {
  const today = new Date().toISOString().split('T')[0];
  return getMetricsForDate(today);
}

export function updateTodayMetrics(metrics: Partial<DailyMetrics>) {
  const today = new Date().toISOString().split('T')[0];
  const currentMetrics = getTodayMetrics() || {
    date: today,
    waterIntake: 0,
    steps: 0,
    sleepHours: 0,
    caloriesBurned: 0,
  };

  updateMetricsForDate({
    ...currentMetrics,
    ...metrics,
  });
}

export function updateProfile(profile: UserProfile) {
  const data = getStoredData();
  data.profile = profile;
  saveData(data);
}

export function updateGoals(goals: Goals) {
  const data = getStoredData();
  data.goals = goals;
  saveData(data);
}

export function calculateBMI(height: number, weight: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function exportData(): string {
  const data = getStoredData();
  return JSON.stringify(data, null, 2);
}

export function getWeeklyAverages(): {
  waterIntake: number;
  steps: number;
  sleepHours: number;
  caloriesBurned: number;
} {
  const data = getStoredData();
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const weekMetrics = data.dailyMetrics.filter(metric => {
    const metricDate = new Date(metric.date);
    return metricDate >= lastWeek && metricDate <= today;
  });

  if (weekMetrics.length === 0) {
    return {
      waterIntake: 0,
      steps: 0,
      sleepHours: 0,
      caloriesBurned: 0,
    };
  }

  return {
    waterIntake: weekMetrics.reduce((acc, curr) => acc + curr.waterIntake, 0) / weekMetrics.length,
    steps: weekMetrics.reduce((acc, curr) => acc + curr.steps, 0) / weekMetrics.length,
    sleepHours: weekMetrics.reduce((acc, curr) => acc + curr.sleepHours, 0) / weekMetrics.length,
    caloriesBurned: weekMetrics.reduce((acc, curr) => acc + curr.caloriesBurned, 0) / weekMetrics.length,
  };
}