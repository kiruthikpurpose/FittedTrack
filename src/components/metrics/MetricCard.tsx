import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  children: ReactNode;
}

export default function MetricCard({ title, children }: MetricCardProps) {
  return (
    <div className="bg-navy-900 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}