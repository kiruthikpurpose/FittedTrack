'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { updateMetricsForDate } from '@/lib/storage';
import { toast } from 'sonner';
import { DateSelector } from '@/components/metrics/DateSelector';
import { MetricInput } from '@/components/metrics/MetricInput';
import { useMetrics } from '@/lib/hooks/useMetrics';

export default function DailyInput() {
  const [date, setDate] = useState<Date>(new Date());
  const [metrics, setMetrics] = useMetrics(date);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validMetrics = {
      ...metrics,
      waterIntake: metrics.waterIntake ?? 0,
      steps: metrics.steps ?? 0,
      sleepHours: metrics.sleepHours ?? 0,
      caloriesBurned: metrics.caloriesBurned ?? 0,
    };
    updateMetricsForDate(validMetrics);
    toast.success('Metrics updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Input</h1>
        <p className="text-muted-foreground">Update your health metrics for any date</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <DateSelector date={date} onDateChange={setDate} />
            </div>

            <div className="space-y-4">
              <Label>Water Intake (Liters)</Label>
              <Slider
                value={[metrics.waterIntake ?? 0]}
                onValueChange={([value]) => setMetrics({ ...metrics, waterIntake: value })}
                max={5}
                step={0.1}
                className="mb-2"
              />
              <span className="text-sm text-muted-foreground">
                {metrics.waterIntake?.toFixed(1) ?? '0.0'}L
              </span>
            </div>

            <MetricInput
              label="Steps Taken"
              id="steps"
              value={metrics.steps}
              onChange={(value) => setMetrics({ ...metrics, steps: value })}
              placeholder="Enter steps"
            />

            <div className="space-y-2">
              <Label>Sleep Hours</Label>
              <Select
                value={metrics.sleepHours?.toString() ?? ''}
                onValueChange={(value) => 
                  setMetrics({ ...metrics, sleepHours: value ? parseInt(value) : null })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sleep hours" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 13 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i} hours
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <MetricInput
              label="Calories Burned"
              id="calories"
              value={metrics.caloriesBurned}
              onChange={(value) => setMetrics({ ...metrics, caloriesBurned: value })}
              placeholder="Enter calories"
            />
          </div>
        </Card>

        <Button type="submit" className="w-full">
          Save Metrics for {format(date, 'PPP')}
        </Button>
      </form>
    </div>
  );
}