'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMetricsForDate, updateMetricsForDate } from '@/lib/storage';
import { toast } from 'sonner';
import { DailyMetrics } from '@/lib/types';

export default function DailyInput() {
  const [date, setDate] = useState<Date>(new Date());
  const [metrics, setMetrics] = useState<DailyMetrics>({
    date: format(new Date(), 'yyyy-MM-dd'),
    waterIntake: 0,
    steps: 0,
    sleepHours: 0,
    caloriesBurned: 0,
  });

  useEffect(() => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const dateMetrics = getMetricsForDate(formattedDate);
    if (dateMetrics) {
      setMetrics(dateMetrics);
    } else {
      setMetrics({
        date: formattedDate,
        waterIntake: 0,
        steps: 0,
        sleepHours: 0,
        caloriesBurned: 0,
      });
    }
  }, [date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMetricsForDate(metrics);
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-4">
              <Label>Water Intake (Liters)</Label>
              <Slider
                value={[metrics.waterIntake]}
                onValueChange={([value]) => setMetrics({ ...metrics, waterIntake: value })}
                max={5}
                step={0.1}
                className="mb-2"
              />
              <span className="text-sm text-muted-foreground">{metrics.waterIntake}L</span>
            </div>

            <div className="space-y-4">
              <Label htmlFor="steps">Steps Taken</Label>
              <Input
                id="steps"
                type="number"
                value={metrics.steps}
                onChange={(e) => setMetrics({ ...metrics, steps: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-4">
              <Label>Sleep Hours</Label>
              <Select
                value={metrics.sleepHours.toString()}
                onValueChange={(value) => setMetrics({ ...metrics, sleepHours: parseInt(value) })}
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

            <div className="space-y-4">
              <Label htmlFor="calories">Calories Burned</Label>
              <Input
                id="calories"
                type="number"
                value={metrics.caloriesBurned}
                onChange={(e) =>
                  setMetrics({ ...metrics, caloriesBurned: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>
        </Card>

        <Button type="submit" className="w-full">
          Save Metrics for {format(date, 'PPP')}
        </Button>
      </form>
    </div>
  );
}