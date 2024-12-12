'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MetricInputProps {
  label: string;
  id: string;
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  type?: 'number' | 'text';
}

export function MetricInput({
  label,
  id,
  value,
  onChange,
  placeholder = 'Enter value',
  type = 'number',
}: MetricInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value ?? ''}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === '' ? null : type === 'number' ? Number(val) : val);
        }}
        onFocus={(e) => {
          if (value === 0 || value === null) {
            e.target.value = '';
          }
        }}
        placeholder={placeholder}
        className="transition-all duration-200"
      />
    </div>
  );
}