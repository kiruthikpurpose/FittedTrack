import { useState, useMemo } from 'react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { Download, Calendar, TrendingUp, Award } from 'lucide-react';
import MetricCard from '../components/metrics/MetricCard';
import MetricChart from '../components/charts/MetricChart';
import { useFitness } from '../context/FitnessContext';
import { jsPDF } from 'jspdf';

export default function Insights() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const { dailyMetrics } = useFitness();

  const dateRanges = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
  };

  const metricsData = useMemo(() => {
    const days = dateRanges[timeRange];
    const endDate = endOfDay(new Date());
    const startDate = startOfDay(subDays(endDate, days - 1));
    
    const data = [];
    for (let i = 0; i < days; i++) {
      const date = format(subDays(endDate, i), 'yyyy-MM-dd');
      const metrics = dailyMetrics[date] || {
        waterIntake: 0,
        steps: 0,
        sleepHours: 0,
        exerciseCompleted: [false, false, false],
      };
      data.unshift({
        date,
        ...metrics,
      });
    }
    return data;
  }, [timeRange, dailyMetrics]);

  const averages = useMemo(() => ({
    water: metricsData.reduce((acc, d) => acc + d.waterIntake, 0) / metricsData.length,
    steps: Math.floor(metricsData.reduce((acc, d) => acc + d.steps, 0) / metricsData.length),
    sleep: metricsData.reduce((acc, d) => acc + d.sleepHours, 0) / metricsData.length,
    exercise: metricsData.reduce((acc, d) => 
      acc + (d.exerciseCompleted.filter(Boolean).length / d.exerciseCompleted.length), 0
    ) / metricsData.length * 100,
  }), [metricsData]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(20, 41, 66);
    doc.text('FittedTrack Insights Report', 20, 20);
    
    // Subheader
    doc.setFontSize(12);
    doc.setTextColor(107, 114, 128);
    doc.text(`Generated on ${format(new Date(), 'PPP')}`, 20, 30);
    doc.text(`Report Period: Last ${timeRange}`, 20, 35);
    
    // Averages Section
    doc.setFontSize(16);
    doc.setTextColor(20, 41, 66);
    doc.text('Period Averages', 20, 50);
    
    doc.setFontSize(12);
    doc.setTextColor(107, 114, 128);
    doc.text(`Water Intake: ${averages.water.toFixed(1)}L per day`, 30, 60);
    doc.text(`Daily Steps: ${averages.steps.toLocaleString()} steps`, 30, 70);
    doc.text(`Sleep Duration: ${averages.sleep.toFixed(1)} hours`, 30, 80);
    doc.text(`Exercise Completion: ${averages.exercise.toFixed(1)}%`, 30, 90);
    
    doc.save('fittedtrack-insights.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Insights</h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-navy-800 rounded-lg px-4 py-2">
            <Calendar className="h-5 w-5 text-green-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-400 text-navy-900 rounded-lg hover:bg-green-500"
          >
            <Download size={20} />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-navy-900 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h3 className="text-white font-semibold">Avg. Water</h3>
          </div>
          <p className="text-2xl font-bold text-white">{averages.water.toFixed(1)}L</p>
          <p className="text-sm text-gray-400">per day</p>
        </div>

        <div className="bg-navy-900 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h3 className="text-white font-semibold">Avg. Steps</h3>
          </div>
          <p className="text-2xl font-bold text-white">{averages.steps.toLocaleString()}</p>
          <p className="text-sm text-gray-400">per day</p>
        </div>

        <div className="bg-navy-900 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h3 className="text-white font-semibold">Avg. Sleep</h3>
          </div>
          <p className="text-2xl font-bold text-white">{averages.sleep.toFixed(1)}h</p>
          <p className="text-sm text-gray-400">per night</p>
        </div>

        <div className="bg-navy-900 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-5 w-5 text-green-400" />
            <h3 className="text-white font-semibold">Exercise</h3>
          </div>
          <p className="text-2xl font-bold text-white">{averages.exercise.toFixed(1)}%</p>
          <p className="text-sm text-gray-400">completion rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricCard title="Water Intake Trend">
          <MetricChart
            data={metricsData.map(d => d.waterIntake)}
            labels={metricsData.map(d => format(new Date(d.date), 'MMM d'))}
            label="Water Intake (L)"
            color="#4ade80"
          />
        </MetricCard>

        <MetricCard title="Steps Trend">
          <MetricChart
            data={metricsData.map(d => d.steps)}
            labels={metricsData.map(d => format(new Date(d.date), 'MMM d'))}
            label="Steps"
            color="#4ade80"
          />
        </MetricCard>

        <MetricCard title="Sleep Hours Trend">
          <MetricChart
            data={metricsData.map(d => d.sleepHours)}
            labels={metricsData.map(d => format(new Date(d.date), 'MMM d'))}
            label="Sleep Hours"
            color="#4ade80"
          />
        </MetricCard>

        <MetricCard title="Exercise Completion Trend">
          <MetricChart
            data={metricsData.map(d => 
              (d.exerciseCompleted.filter(Boolean).length / d.exerciseCompleted.length) * 100
            )}
            labels={metricsData.map(d => format(new Date(d.date), 'MMM d'))}
            label="Completion %"
            color="#4ade80"
          />
        </MetricCard>
      </div>
    </div>
  );
}