import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { Download } from 'lucide-react';
import MetricCard from '../components/metrics/MetricCard';
import MetricChart from '../components/charts/MetricChart';
import { jsPDF } from 'jspdf';

// Mock data - replace with real data later
const generateMockData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: format(subDays(new Date(), i), 'yyyy-MM-dd'),
    waterIntake: Math.random() * 3 + 1,
    steps: Math.floor(Math.random() * 5000) + 5000,
    sleepHours: Math.random() * 4 + 5,
    exerciseCompleted: [
      Math.random() > 0.5,
      Math.random() > 0.5,
      Math.random() > 0.5,
    ],
  })).reverse();
};

const mockData = generateMockData(7);

export default function Insights() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Fitness Insights Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on ${format(new Date(), 'PPP')}`, 20, 30);
    
    // Add metrics summary
    doc.text('Weekly Summary:', 20, 50);
    const averages = {
      water: mockData.reduce((acc, d) => acc + d.waterIntake, 0) / mockData.length,
      steps: Math.floor(mockData.reduce((acc, d) => acc + d.steps, 0) / mockData.length),
      sleep: mockData.reduce((acc, d) => acc + d.sleepHours, 0) / mockData.length,
    };
    
    doc.text(`Average Water Intake: ${averages.water.toFixed(1)}L`, 30, 60);
    doc.text(`Average Steps: ${averages.steps}`, 30, 70);
    doc.text(`Average Sleep: ${averages.sleep.toFixed(1)} hours`, 30, 80);
    
    doc.save('fitness-insights.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Insights</h1>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
            className="bg-navy-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-400 text-navy-900 rounded-lg hover:bg-green-500"
          >
            <Download size={20} />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricCard title="Water Intake Trend">
          <MetricChart
            data={mockData.map(d => d.waterIntake)}
            labels={mockData.map(d => format(new Date(d.date), 'MMM d'))}
            label="Water Intake (L)"
            color="#4ade80"
          />
        </MetricCard>

        <MetricCard title="Steps Trend">
          <MetricChart
            data={mockData.map(d => d.steps)}
            labels={mockData.map(d => format(new Date(d.date), 'MMM d'))}
            label="Steps"
            color="#4ade80"
          />
        </MetricCard>

        <MetricCard title="Sleep Hours Trend">
          <MetricChart
            data={mockData.map(d => d.sleepHours)}
            labels={mockData.map(d => format(new Date(d.date), 'MMM d'))}
            label="Sleep Hours"
            color="#4ade80"
          />
        </MetricCard>

        <MetricCard title="Exercise Completion Trend">
          <MetricChart
            data={mockData.map(d => 
              (d.exerciseCompleted.filter(Boolean).length / d.exerciseCompleted.length) * 100
            )}
            labels={mockData.map(d => format(new Date(d.date), 'MMM d'))}
            label="Completion %"
            color="#4ade80"
          />
        </MetricCard>
      </div>
    </div>
  );
}