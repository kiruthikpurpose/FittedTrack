'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ProgressRing } from '@/components/ui/progress-ring';
import { getStoredData, getTodayMetrics } from '@/lib/storage';
import { DailyMetrics, Goals } from '@/lib/types';
import { Droplets, Footprints, Moon, Flame } from 'lucide-react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DailyMetrics | null>(null);
  const [goals, setGoals] = useState<Goals | null>(null);

  useEffect(() => {
    const data = getStoredData();
    setGoals(data.goals);
    setMetrics(getTodayMetrics() || {
      date: new Date().toISOString().split('T')[0],
      waterIntake: 0,
      steps: 0,
      sleepHours: 0,
      caloriesBurned: 0,
    });
  }, []);

  if (!metrics || !goals) return null;

  const waterProgress = (metrics.waterIntake / goals.waterIntake) * 100;
  const stepsProgress = (metrics.steps / goals.steps) * 100;
  const sleepProgress = (metrics.sleepHours / goals.sleepHours) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Track your daily health metrics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Droplets className="h-8 w-8 text-blue-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Water Intake</p>
              <p className="text-2xl font-bold">{metrics.waterIntake}L</p>
            </div>
          </div>
          <Progress value={waterProgress} className="mt-4" />
          <p className="mt-2 text-sm text-muted-foreground">Goal: {goals.waterIntake}L</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Footprints className="h-8 w-8 text-green-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Steps</p>
              <p className="text-2xl font-bold">{metrics.steps.toLocaleString()}</p>
            </div>
          </div>
          <Progress value={stepsProgress} className="mt-4" />
          <p className="mt-2 text-sm text-muted-foreground">Goal: {goals.steps.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Moon className="h-8 w-8 text-purple-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Sleep</p>
              <p className="text-2xl font-bold">{metrics.sleepHours}h</p>
            </div>
          </div>
          <ProgressRing progress={sleepProgress} className="mt-4">
            <span className="text-lg font-semibold">{Math.round(sleepProgress)}%</span>
          </ProgressRing>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Flame className="h-8 w-8 text-orange-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Calories Burned</p>
              <p className="text-2xl font-bold">{metrics.caloriesBurned}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}