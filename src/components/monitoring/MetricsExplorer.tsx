import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Filter, Download, Calendar, RefreshCw, Maximize2 } from 'lucide-react';

interface MetricData {
  timestamp: string;
  value: number;
  baseline?: number;
  threshold?: number;
}

interface MetricsExplorerProps {
  title: string;
  description: string;
  data: MetricData[];
  unit: string;
  thresholds?: {
    warning: number;
    critical: number;
  };
}

export default function MetricsExplorer({
  title,
  description,
  data,
  unit,
  thresholds
}: MetricsExplorerProps) {
  const [timeRange, setTimeRange] = useState('24h');
  const [aggregation, setAggregation] = useState('1m');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const latestValue = data[data.length - 1]?.value;
  const previousValue = data[data.length - 2]?.value;
  const percentageChange = previousValue 
    ? ((latestValue - previousValue) / previousValue) * 100 
    : 0;

  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm ${
      isFullscreen ? 'fixed inset-0 z-50' : ''
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <select
              value={aggregation}
              onChange={(e) => setAggregation(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="1m">1 Minute</option>
              <option value="5m">5 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="1d">1 Day</option>
            </select>
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Maximize2 size={16} className="text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Download size={16} className="text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <RefreshCw size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Current Value</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{latestValue}</span>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Change</p>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${
              percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(2)}%
            </span>
          </div>
        </div>
        {thresholds && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Thresholds</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">Warning</span>
                <span className="text-yellow-600">{thresholds.warning} {unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Critical</span>
                <span className="text-red-600">{thresholds.critical} {unit}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <YAxis unit={unit} />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleString()}
              formatter={(value: number) => [`${value} ${unit}`, 'Value']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
            {thresholds && (
              <>
                <Line
                  type="monotone"
                  dataKey={() => thresholds.warning}
                  stroke="#F59E0B"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey={() => thresholds.critical}
                  stroke="#EF4444"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}