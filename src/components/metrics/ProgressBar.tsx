interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  unit: string;
}

export default function ProgressBar({ value, max, label, unit }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-sm text-green-400">{value}{unit} / {max}{unit}</span>
      </div>
      <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-400 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}