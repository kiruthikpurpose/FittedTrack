interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
}

export default function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  unit,
  placeholder
}: NumberInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value || ''}
          onChange={(e) => {
            const val = e.target.value === '' ? 0 : Number(e.target.value);
            onChange(val);
          }}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className="w-full bg-navy-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-gray-500"
        />
        {unit && <span className="text-gray-300">{unit}</span>}
      </div>
    </div>
  );
}