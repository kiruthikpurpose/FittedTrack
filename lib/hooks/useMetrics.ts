'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { DailyMetrics } from '@/lib/types';
import { getMetricsForDate } from '@/lib/storage';

export function useMetrics(date: Date) {
  const [metrics, setMetrics] = useState<DailyMetrics>({
    date: format(date, 'yyyy-MM-dd'),
    waterIntake: null,
    steps: null,
    sleepHours: null,
    caloriesBurned: null,
  });

  useEffect(() => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const dateMetrics = getMetricsForDate(formattedDate);
    if (dateMetrics) {
      setMetrics(dateMetrics);
    } else {
      setMetrics({
        date: formattedDate,
        waterIntake: null,
        steps: null,
        sleepHours: null,
        caloriesBurned: null,
      });
    }
  }, [date]);

  return [metrics, setMetrics] as const;
}