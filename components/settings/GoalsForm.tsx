'use client';

import { Goals } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

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
        <div className="space-y-2">
          <Label htmlFor="waterGoal">Water Intake Goal (L)</Label>
          <Input
            id="waterGoal"
            type="number"
            value={goals.waterIntake ?? ''}
            onChange={(e) => onGoalsChange({ ...goals, waterIntake: e.target.value ? Number(e.target.value) : null })}
            placeholder="Enter water intake goal"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stepsGoal">Steps Goal</Label>
          <Input
            id="stepsGoal"
            type="number"
            value={goals.steps ?? ''}
            onChange={(e) => onGoalsChange({ ...goals, steps: e.target.value ? Number(e.target.value) : null })}
            placeholder="Enter steps goal"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sleepGoal">Sleep Goal (hours)</Label>
          <Input
            id="sleepGoal"
            type="number"
            value={goals.sleepHours ?? ''}
            onChange={(e) => onGoalsChange({ ...goals, sleepHours: e.target.value ? Number(e.target.value) : null })}
            placeholder="Enter sleep goal"
          />
        </div>

        <Button type="submit" className="w-full">Save Goals</Button>
      </form>
    </Card>
  );
}