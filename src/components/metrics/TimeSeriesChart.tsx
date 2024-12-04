import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimeSeriesChartProps {
  data: any[];
  dataKey: string;
  name: string;
  color?: string;
  height?: number;
  yAxisFormatter?: (value: number) => string;
}

export default function TimeSeriesChart({
  data,
  dataKey,
  name,
  color = '#3B82F6',
  height = 300,
  yAxisFormatter = (value) => value.toString()
}: TimeSeriesChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="timestamp" 
            stroke="#9CA3AF"
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
          />
          <YAxis 
            stroke="#9CA3AF"
            tickFormatter={yAxisFormatter}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '0.75rem',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number) => [yAxisFormatter(value), name]}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}