interface ExerciseCheckListProps {
  completed: boolean[];
  onChange?: (index: number) => void;
  readonly?: boolean;
}

export default function ExerciseCheckList({ completed, onChange, readonly }: ExerciseCheckListProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {completed.map((isComplete, index) => (
        <button
          key={index}
          onClick={() => onChange?.(index)}
          disabled={readonly}
          className={`
            p-2 rounded-lg text-center transition-colors
            ${isComplete 
              ? 'bg-green-400 text-navy-900' 
              : 'bg-navy-800 text-gray-300 hover:bg-navy-700'}
            ${readonly ? 'cursor-default' : 'cursor-pointer'}
          `}
        >
          Exercise {index + 1}
        </button>
      ))}
    </div>
  );
}