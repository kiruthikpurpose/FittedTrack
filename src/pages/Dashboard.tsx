import { useMemo } from 'react';
import { Droplets, Footprints, Moon } from 'lucide-react';
import MetricCard from '../components/metrics/MetricCard';
import ProgressBar from '../components/metrics/ProgressBar';
import ExerciseCheckList from '../components/metrics/ExerciseCheckList';
import { useFitness } from '../context/FitnessContext';
import { defaultGoals } from '../types/fitness';

export default function Dashboard() {
  const { dailyMetrics, userSettings } = useFitness();
  const today = new Date().toISOString().split('T')[0];
  const todayMetrics = dailyMetrics[today] || {
    waterIntake: 0,
    steps: 0,
    sleepHours: 0,
    exerciseCompleted: [false, false, false],
  };

  const goals = userSettings?.goals || defaultGoals;

  const exerciseCompletion = useMemo(() => {
    const completed = todayMetrics.exerciseCompleted.filter(Boolean).length;
    return (completed / goals.exerciseCount) * 100;
  }, [todayMetrics.exerciseCompleted, goals.exerciseCount]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard title="Water Intake">
          <div className="flex items-center gap-4 mb-4">
            <Droplets className="h-8 w-8 text-green-400" />
            <span className="text-2xl text-white">{todayMetrics.waterIntake}L</span>
          </div>
          <ProgressBar
            value={todayMetrics.waterIntake}
            max={goals.waterIntake}
            label="Daily Goal"
            unit="L"
          />
        </MetricCard>

        <MetricCard title="Steps">
          <div className="flex items-center gap-4 mb-4">
            <Footprints className="h-8 w-8 text-green-400" />
            <span className="text-2xl text-white">{todayMetrics.steps}</span>
          </div>
          <ProgressBar
            value={todayMetrics.steps}
            max={goals.steps}
            label="Daily Goal"
            unit=""
          />
        </MetricCard>

        <MetricCard title="Sleep">
          <div className="flex items-center gap-4 mb-4">
            <Moon className="h-8 w-8 text-green-400" />
            <span className="text-2xl text-white">{todayMetrics.sleepHours}h</span>
          </div>
          <ProgressBar
            value={todayMetrics.sleepHours}
            max={goals.sleepHours}
            label="Daily Goal"
            unit="h"
          />
        </MetricCard>

        <MetricCard title="Exercise">
          <ExerciseCheckList 
            completed={todayMetrics.exerciseCompleted}
            readonly
          />
          <div className="mt-4">
            <ProgressBar
              value={exerciseCompletion}
              max={100}
              label="Completion"
              unit="%"
            />
          </div>
        </MetricCard>
      </div>
    </div>
  );
}