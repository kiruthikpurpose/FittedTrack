import { useState } from 'react';
import { Target } from 'lucide-react';
import type { UserSettings } from '../../types/user';
import NumberInput from '../inputs/NumberInput';

interface GoalsSectionProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettings) => void;
}

export default function GoalsSection({ settings, onUpdate }: GoalsSectionProps) {
  const [goals, setGoals] = useState(settings.goals);

  const handleSave = () => {
    onUpdate({ ...settings, goals });
  };

  return (
    <div className="bg-navy-900 rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Target className="h-6 w-6 text-green-400" />
        <h2 className="text-xl font-semibold text-white">Daily Goals</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NumberInput
          label="Water Intake Goal (L)"
          value={goals.waterIntake}
          onChange={(value) => setGoals({ ...goals, waterIntake: value })}
          min={0}
          max={5}
          step={0.1}
          unit="L"
        />
        <NumberInput
          label="Steps Goal"
          value={goals.steps}
          onChange={(value) => setGoals({ ...goals, steps: value })}
          min={0}
          max={50000}
          step={500}
        />
        <NumberInput
          label="Sleep Hours Goal"
          value={goals.sleepHours}
          onChange={(value) => setGoals({ ...goals, sleepHours: value })}
          min={0}
          max={12}
          step={0.5}
          unit="h"
        />
        <NumberInput
          label="Daily Exercise Goal"
          value={goals.exerciseCount}
          onChange={(value) => setGoals({ ...goals, exerciseCount: value })}
          min={1}
          max={5}
          step={1}
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full px-4 py-2 bg-green-400 text-navy-900 rounded-lg hover:bg-green-500"
      >
        Save Goals
      </button>
    </div>
  );
}