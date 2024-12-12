import { useMemo } from 'react';
import { Droplets, Footprints, Moon, Trophy, Target, TrendingUp } from 'lucide-react';
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

  const streakCount = useMemo(() => {
    let count = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const metrics = dailyMetrics[dateStr];
      
      if (!metrics || !metrics.exerciseCompleted.some(Boolean)) break;
      count++;
    }
    
    return count;
  }, [dailyMetrics]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center gap-3 bg-navy-900 rounded-lg p-3">
          <Trophy className="h-5 w-5 text-green-400" />
          <span className="text-white">{streakCount} Day Streak!</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Daily Progress">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Target className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Overall Progress</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round(
                    ((todayMetrics.waterIntake / goals.waterIntake +
                      todayMetrics.steps / goals.steps +
                      todayMetrics.sleepHours / goals.sleepHours +
                      exerciseCompletion / 100) /
                      4) *
                      100
                  )}%
                </p>
              </div>
            </div>
            <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 transition-all duration-300"
                style={{
                  width: `${Math.round(
                    ((todayMetrics.waterIntake / goals.waterIntake +
                      todayMetrics.steps / goals.steps +
                      todayMetrics.sleepHours / goals.sleepHours +
                      exerciseCompletion / 100) /
                      4) *
                      100
                  )}%`,
                }}
              />
            </div>
          </div>
        </MetricCard>

        <MetricCard title="Water Intake">
          <div className="flex items-center gap-4 mb-4">
            <Droplets className="h-8 w-8 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">Today's Intake</p>
              <span className="text-2xl text-white">{todayMetrics.waterIntake}L</span>
            </div>
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
            <div>
              <p className="text-sm text-gray-400">Today's Steps</p>
              <span className="text-2xl text-white">{todayMetrics.steps.toLocaleString()}</span>
            </div>
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
            <div>
              <p className="text-sm text-gray-400">Last Night</p>
              <span className="text-2xl text-white">{todayMetrics.sleepHours}h</span>
            </div>
          </div>
          <ProgressBar
            value={todayMetrics.sleepHours}
            max={goals.sleepHours}
            label="Daily Goal"
            unit="h"
          />
        </MetricCard>

        <MetricCard title="Exercise Plan">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Today's Progress</p>
                <span className="text-2xl text-white">
                  {todayMetrics.exerciseCompleted.filter(Boolean).length} / {goals.exerciseCount}
                </span>
              </div>
            </div>
            <ExerciseCheckList 
              completed={todayMetrics.exerciseCompleted}
              readonly
            />
          </div>
        </MetricCard>
      </div>
    </div>
  );
}