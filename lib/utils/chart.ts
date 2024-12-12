import { format } from 'date-fns';
import { DailyMetrics } from '@/lib/types';

export function formatChartDate(date: string): string {
  return format(new Date(date), 'MMM d');
}

export function formatTooltipDate(date: string): string {
  return format(new Date(date), 'PPP');
}

export function prepareChartData(metrics: DailyMetrics[]): DailyMetrics[] {
  return [...metrics]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7);
}