import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, Activity } from 'lucide-react';

interface MetricsData {
  timestamp: string;
  value: number;
  predicted: number;
  threshold: number;
}

interface ApiMetricsAnalyzerProps {
  title: string;
  data: MetricsData[];
  unit: string;
  thresholdLabel: string;
}

export default function ApiMetricsAnalyzer({ title, data, unit, thresholdLabel }: ApiMetricsAnalyzerProps) {
  const latestValue = data[data.length - 1]?.value;
  const previousValue = data[data.length - 2]?.value;
  const percentageChange = previousValue 
    ? ((latestValue - previousValue) / previousValue) * 100 
    : 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="text-blue-500" size={24} />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className={percentageChange >= 0 ? 'text-green-500' : 'text-red-500'} size={16} />
          <span className={`text-sm font-medium ${
            percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis unit={unit} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              name="Actual"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#10B981" 
              name="Predicted"
              strokeDasharray="5 5"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="threshold" 
              stroke="#EF4444" 
              name={thresholdLabel}
              strokeDasharray="3 3"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700">Current Value</h3>
          <p className="text-2xl font-bold text-blue-900 mt-2">
            {latestValue.toFixed(1)}{unit}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-sm font-medium text-green-700">Predicted Next</h3>
          <p className="text-2xl font-bold text-green-900 mt-2">
            {data[data.length - 1]?.predicted.toFixed(1)}{unit}
          </p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-sm font-medium text-red-700">{thresholdLabel}</h3>
          <p className="text-2xl font-bold text-red-900 mt-2">
            {data[data.length - 1]?.threshold.toFixed(1)}{unit}
          </p>
        </div>
      </div>
    </div>
  );
}