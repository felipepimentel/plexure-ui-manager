import React from 'react';
import { Clock, Calendar } from 'lucide-react';

interface HeatmapData {
  hour: number;
  day: string;
  value: number;
}

interface UsageHeatmapProps {
  data: HeatmapData[];
  metric: string;
}

export default function UsageHeatmap({ data, metric }: UsageHeatmapProps) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getColor = (value: number) => {
    // Normalize value between 0 and 1
    const normalized = value / Math.max(...data.map(d => d.value));
    return `rgba(99, 102, 241, ${normalized})`; // Using primary color (indigo)
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="text-gray-500" size={20} />
          <h2 className="text-lg font-semibold">{metric} Heatmap</h2>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <span className="text-sm text-gray-500">Last 7 days</span>
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-4">
        <div className="flex flex-col justify-around text-sm text-gray-500">
          {days.map(day => (
            <div key={day} className="h-8 flex items-center">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-24 gap-1">
          {data.map((item, index) => (
            <div
              key={index}
              className="h-8 rounded"
              style={{ backgroundColor: getColor(item.value) }}
              title={`${days[new Date(item.day).getDay()]} ${item.hour}:00 - ${item.value} ${metric}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded bg-indigo-100" />
          <div className="w-4 h-4 rounded bg-indigo-300" />
          <div className="w-4 h-4 rounded bg-indigo-500" />
          <div className="w-4 h-4 rounded bg-indigo-700" />
        </div>
        <span className="text-sm text-gray-500">Less to More {metric}</span>
      </div>
    </div>
  );
}