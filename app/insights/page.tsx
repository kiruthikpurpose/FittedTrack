'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { getWeeklyAverages, getStoredData } from '@/lib/storage';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DailyMetrics } from '@/lib/types';

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
        <Card className="p-6">
          <h3 className="font-semibold">Avg. Water Intake</h3>
          <p className="text-3xl font-bold mt-2">
            {weeklyAverages.waterIntake.toFixed(1)}L
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">Avg. Steps</h3>
          <p className="text-3xl font-bold mt-2">
            {Math.round(weeklyAverages.steps).toLocaleString()}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">Avg. Sleep</h3>
          <p className="text-3xl font-bold mt-2">
            {weeklyAverages.sleepHours.toFixed(1)}h
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">Avg. Calories</h3>
          <p className="text-3xl font-bold mt-2">
            {Math.round(weeklyAverages.caloriesBurned)}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Weekly Trends</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="waterIntake"
                stroke="hsl(var(--chart-1))"
                name="Water (L)"
              />
              <Line
                type="monotone"
                dataKey="steps"
                stroke="hsl(var(--chart-2))"
                name="Steps"
              />
              <Line
                type="monotone"
                dataKey="sleepHours"
                stroke="hsl(var(--chart-3))"
                name="Sleep (h)"
              />
              <Line
                type="monotone"
                dataKey="caloriesBurned"
                stroke="hsl(var(--chart-4))"
                name="Calories"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}