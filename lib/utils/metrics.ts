import { DailyMetrics } from '@/lib/types';

export function calculateAverages(metrics: DailyMetrics[]) {
  if (metrics.length === 0) {
    return {
      waterIntake: 0,
      steps: 0,
      sleepHours: 0,
      caloriesBurned: 0,
    };
  }

  return {
    waterIntake: metrics.reduce((acc, curr) => acc + (curr.waterIntake || 0), 0) / metrics.length,
    steps: metrics.reduce((acc, curr) => acc + (curr.steps || 0), 0) / metrics.length,
    sleepHours: metrics.reduce((acc, curr) => acc + (curr.sleepHours || 0), 0) / metrics.length,
    caloriesBurned: metrics.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0) / metrics.length,
  };
}

export function getLastNDays(metrics: DailyMetrics[], days: number): DailyMetrics[] {
  return metrics
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, days);
}