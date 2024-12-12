'use client';

import { memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { DailyMetrics } from '@/lib/types';

interface WeeklyMetricsChartProps {
  data: DailyMetrics[];
}

export const WeeklyMetricsChart = memo(function WeeklyMetricsChart({ data }: WeeklyMetricsChartProps) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(date) => format(new Date(date), 'PPP')}
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
  );
});