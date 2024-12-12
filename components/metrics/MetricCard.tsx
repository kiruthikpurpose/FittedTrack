import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ProgressRing } from '@/components/ui/progress-ring';

interface MetricCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  value: string | number;
  progress?: number;
  useRing?: boolean;
  goal?: string;
}

export function MetricCard({
  icon: Icon,
  iconColor,
  title,
  value,
  progress,
  useRing = false,
  goal,
}: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <Icon className={`h-8 w-8 ${iconColor}`} />
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      {progress !== undefined && !useRing && (
        <>
          <Progress value={progress} className="mt-4" />
          {goal && (
            <p className="mt-2 text-sm text-muted-foreground">Goal: {goal}</p>
          )}
        </>
      )}
      {progress !== undefined && useRing && (
        <div className="mt-4 flex justify-center">
          <ProgressRing progress={progress} className="mt-4">
            <span className="text-lg font-semibold">{Math.round(progress)}%</span>
          </ProgressRing>
        </div>
      )}
    </Card>
  );
}