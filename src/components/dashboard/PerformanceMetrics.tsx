import React from 'react';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricData {
  timestamp: string;
  value: number;
}

interface PerformanceMetricsProps {
  title: string;
  currentValue: number;
  previousValue: number;
  data: MetricData[];
  unit: string;
  thresholdValue?: number;
}

export default function PerformanceMetrics({
  title,
  currentValue,
  previousValue,
  data,
  unit,
  thresholdValue
}: PerformanceMetricsProps) {
  const percentageChange = ((currentValue - previousValue) / previousValue) * 100;
  const isPositive = percentageChange > 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="text-gray-500" size={24} />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {isPositive ? (
            <ArrowUpRight className="text-green-500" size={20} />
          ) : (
            <ArrowDownRight className="text-red-500" size={20} />
          )}
          <span className={`text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {Math.abs(percentageChange).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold">
          {currentValue.toLocaleString()} {unit}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          vs {previousValue.toLocaleString()} {unit} previous period
        </p>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="timestamp"
              stroke="#9CA3AF"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '0.75rem',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
            />
            {thresholdValue && (
              <Line
                type="monotone"
                data={[
                  { timestamp: data[0].timestamp, value: thresholdValue },
                  { timestamp: data[data.length - 1].timestamp, value: thresholdValue }
                ]}
                stroke="#EF4444"
                strokeDasharray="3 3"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}