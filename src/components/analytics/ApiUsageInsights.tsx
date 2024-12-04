import React from 'react';
import { TrendingUp, Users, Clock, AlertTriangle, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UsageInsight {
  metric: string;
  value: number;
  trend: number;
  status: 'good' | 'warning' | 'critical';
  recommendation?: string;
}

interface ApiUsageInsightsProps {
  insights: UsageInsight[];
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export default function ApiUsageInsights({ insights, timeRange, onTimeRangeChange }: ApiUsageInsightsProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={24} />
          <h2 className="text-lg font-semibold">API Usage Insights</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <select
              value={timeRange}
              onChange={(e) => onTimeRangeChange(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {insights.map((insight) => (
          <div key={insight.metric} className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{insight.metric}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                insight.status === 'good'
                  ? 'bg-green-100 text-green-800'
                  : insight.status === 'warning'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {insight.trend > 0 ? '+' : ''}{insight.trend}%
              </span>
            </div>
            <p className="text-2xl font-bold mb-2">{insight.value.toLocaleString()}</p>
            {insight.recommendation && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <AlertTriangle size={14} className="text-yellow-500" />
                <p>{insight.recommendation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Recommendations</h3>
        <div className="space-y-3">
          {insights
            .filter(insight => insight.recommendation)
            .map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <AlertTriangle className="text-blue-500 mt-0.5" size={16} />
                <div>
                  <p className="font-medium text-blue-700">{insight.metric}</p>
                  <p className="text-sm text-blue-600">{insight.recommendation}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}