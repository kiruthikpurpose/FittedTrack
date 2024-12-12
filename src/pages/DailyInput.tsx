import { useState, useEffect } from 'react';
import { Calendar, Save, RotateCcw } from 'lucide-react';
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
  const { dailyMetrics, updateDailyMetrics, userSettings } = useFitness();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [metrics, setMetrics] = useState<FitnessMetrics>(
    dailyMetrics[selectedDate] || emptyMetrics
  );
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setMetrics(dailyMetrics[selectedDate] || emptyMetrics);
    setHasChanges(false);
  }, [selectedDate, dailyMetrics]);

  const handleMetricsChange = (newMetrics: FitnessMetrics) => {
    setMetrics(newMetrics);
    setHasChanges(true);
  };

  const handleSave = () => {
    updateDailyMetrics(selectedDate, metrics);
    setHasChanges(false);
  };

  const handleReset = () => {
    setMetrics(dailyMetrics[selectedDate] || emptyMetrics);
    setHasChanges(false);
  };

  const handleDateChange = (date: string) => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Do you want to discard them?')) {
        setSelectedDate(date);
      }
    } else {
      setSelectedDate(date);
    }
  };

  const handleExerciseToggle = (index: number) => {
    const newExercises = [...metrics.exerciseCompleted];
    newExercises[index] = !newExercises[index];
    handleMetricsChange({ ...metrics, exerciseCompleted: newExercises });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Daily Input</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-navy-900 rounded-lg px-4 py-2">
            <Calendar className="h-5 w-5 text-green-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="bg-transparent text-white focus:outline-none"
            />
          </div>
          {hasChanges && (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-400 text-navy-900 rounded-lg hover:bg-green-500"
              >
                <Save size={20} />
                Save
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-700"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>
          )}
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
              max={10}
              step={0.1}
              unit="L"
              placeholder="Enter water intake"
            />
            <NumberInput
              label="Steps"
              value={metrics.steps}
              onChange={(value) => handleMetricsChange({ ...metrics, steps: value })}
              min={0}
              max={100000}
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
          <div className="space-y-4">
            <p className="text-sm text-gray-400">Mark completed exercises</p>
            <ExerciseCheckList
              completed={metrics.exerciseCompleted}
              onChange={handleExerciseToggle}
            />
          </div>
        </MetricCard>
      </div>
    </div>
  );
}