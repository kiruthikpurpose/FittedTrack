'use client';

import { Goals } from '@/lib/types';
import { MetricInput } from '@/components/metrics/MetricInput';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GoalsFormProps {
  goals: Goals;
  onSubmit: (goals: Goals) => void;
  onGoalsChange: (goals: Goals) => void;
}

export function GoalsForm({ goals, onSubmit, onGoalsChange }: GoalsFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(goals);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Daily Goals</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <MetricInput
          label="Water Intake Goal (L)"
          id="waterGoal"
          value={goals.waterIntake}
          onChange={(value) => onGoalsChange({ ...goals, waterIntake: value })}
          placeholder="Enter water intake goal"
        />

        <MetricInput
          label="Steps Goal"
          id="stepsGoal"
          value={goals.steps}
          onChange={(value) => onGoalsChange({ ...goals, steps: value })}
          placeholder="Enter steps goal"
        />

        <MetricInput
          label="Sleep Goal (hours)"
          id="sleepGoal"
          value={goals.sleepHours}
          onChange={(value) => onGoalsChange({ ...goals, sleepHours: value })}
          placeholder="Enter sleep goal"
        />

        <Button type="submit" className="w-full">Save Goals</Button>
      </form>
    </Card>
  );
}