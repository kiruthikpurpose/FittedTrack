import { useState } from 'react';
import { Calendar } from 'lucide-react';
import MetricCard from '../components/metrics/MetricCard';
import NumberInput from '../components/inputs/NumberInput';
import ExerciseCheckList from '../components/metrics/ExerciseCheckList';
import { useFitness } from '../context/FitnessContext';
import type { FitnessMetrics } from '../types/fitness';

const emptyMetrics: FitnessMetrics = {
  waterIntake: 0,
  steps: 0,
  sleepHours: 0,
  exerciseCompleted: [false, false, false],
};

export default function DailyInput() {
  const { dailyMetrics, updateDailyMetrics } = useFitness();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [metrics, setMetrics] = useState<FitnessMetrics>(
    dailyMetrics[selectedDate] || emptyMetrics
  );

  const handleMetricsChange = (newMetrics: FitnessMetrics) => {
    setMetrics(newMetrics);
    updateDailyMetrics(selectedDate, newMetrics);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setMetrics(dailyMetrics[date] || emptyMetrics);
  };

  const handleExerciseToggle = (index: number) => {
    const newExercises = [...metrics.exerciseCompleted];
    newExercises[index] = !newExercises[index];
    handleMetricsChange({ ...metrics, exerciseCompleted: newExercises });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Daily Input</h1>
        <div className="flex items-center gap-2 bg-navy-900 rounded-lg px-4 py-2">
          <Calendar className="h-5 w-5 text-green-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="bg-transparent text-white focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard title="Water & Steps">
          <div className="space-y-6">
            <NumberInput
              label="Water Intake"
              value={metrics.waterIntake}
              onChange={(value) => handleMetricsChange({ ...metrics, waterIntake: value })}
              min={0}
              max={5}
              step={0.1}
              unit="L"
              placeholder="Enter water intake"
            />
            <NumberInput
              label="Steps"
              value={metrics.steps}
              onChange={(value) => handleMetricsChange({ ...metrics, steps: value })}
              min={0}
              max={50000}
              step={100}
              placeholder="Enter steps taken"
            />
          </div>
        </MetricCard>

        <MetricCard title="Sleep">
          <NumberInput
            label="Sleep Hours"
            value={metrics.sleepHours}
            onChange={(value) => handleMetricsChange({ ...metrics, sleepHours: value })}
            min={0}
            max={24}
            step={0.5}
            unit="h"
            placeholder="Enter sleep hours"
          />
        </MetricCard>

        <MetricCard title="Exercise">
          <ExerciseCheckList
            completed={metrics.exerciseCompleted}
            onChange={handleExerciseToggle}
          />
        </MetricCard>
      </div>
    </div>
  );
}