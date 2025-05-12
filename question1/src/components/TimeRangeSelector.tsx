
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeRangeSelectorProps {
  selectedMinutes: number;
  onChange: (minutes: number) => void;
}

const timeRanges = [
  { label: '5m', minutes: 5 },
  { label: '15m', minutes: 15 },
  { label: '30m', minutes: 30 },
  { label: '1h', minutes: 60 },
];

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ selectedMinutes, onChange }) => {
  return (
    <div className="flex space-x-2 mb-4">
      {timeRanges.map((range) => (
        <Button
          key={range.minutes}
          variant={selectedMinutes === range.minutes ? "default" : "outline"}
          size="sm"
          className={cn(
            selectedMinutes === range.minutes ? "bg-primary text-primary-foreground" : "",
            "transition-colors"
          )}
          onClick={() => onChange(range.minutes)}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
