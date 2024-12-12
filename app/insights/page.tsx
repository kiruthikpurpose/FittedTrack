'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { getWeeklyAverages, getStoredData } from '@/lib/storage';
import { DailyMetrics } from '@/lib/types';
import { WeeklyMetricsChart } from '@/components/charts/WeeklyMetricsChart';
import { MetricCard } from '@/components/metrics/MetricCard';

export default function Insights() {
  const [weeklyAverages, setWeeklyAverages] = useState({
    waterIntake: 0,
    steps: 0,
    sleepHours: 0,
    caloriesBurned: 0,
  });
  const [chartData, setChartData] = useState<DailyMetrics[]>([]);

  useEffect(() => {
    const averages = getWeeklyAverages();
    setWeeklyAverages(averages);

    const data = getStoredData();
    const sortedMetrics = [...data.dailyMetrics]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7);
    setChartData(sortedMetrics);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
        <p className="text-muted-foreground">View your weekly health metrics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={() => <span>💧</span>}
          iconColor="text-blue-500"
          title="Avg. Water Intake"
          value={`${weeklyAverages.waterIntake.toFixed(1)}L`}
        />
        <MetricCard
          icon={() => <span>👣</span>}
          iconColor="text-green-500"
          title="Avg. Steps"
          value={Math.round(weeklyAverages.steps).toLocaleString()}
        />
        <MetricCard
          icon={() => <span>😴</span>}
          iconColor="text-purple-500"
          title="Avg. Sleep"
          value={`${weeklyAverages.sleepHours.toFixed(1)}h`}
        />
        <MetricCard
          icon={() => <span>🔥</span>}
          iconColor="text-orange-500"
          title="Avg. Calories"
          value={Math.round(weeklyAverages.caloriesBurned)}
        />
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Weekly Trends</h3>
        <WeeklyMetricsChart data={chartData} />
      </Card>
    </div>
  );
}