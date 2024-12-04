import React from 'react';
import { Activity, TrendingUp, Users, Clock } from 'lucide-react';
import ApiUsageMetrics from '../analytics/ApiUsageMetrics';
import PredictiveAnalytics from '../analytics/PredictiveAnalytics';

const mockUsageData = Array.from({ length: 24 }, (_, i) => ({
  timestamp: `${i}:00`,
  requests: Math.floor(Math.random() * 1000) + 500,
  uniqueUsers: Math.floor(Math.random() * 100) + 50,
  avgLatency: Math.floor(Math.random() * 100) + 50
}));

const mockPredictiveData = {
  historicalData: Array.from({ length: 12 }, (_, i) => ({
    timestamp: `${i}:00`,
    actual: Math.floor(Math.random() * 1000) + 500,
    predicted: null
  })),
  predictions: Array.from({ length: 12 }, (_, i) => ({
    timestamp: `${i + 12}:00`,
    actual: null,
    predicted: Math.floor(Math.random() * 1000) + 500
  }))
};

export default function ApiMetricsCenter() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">API Metrics Center</h1>
          <p className="text-gray-500">Real-time analytics and performance insights</p>
        </div>
        <div className="flex gap-4">
          <select className="border rounded-lg px-3 py-2">
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ApiUsageMetrics data={mockUsageData} />
        <PredictiveAnalytics 
          historicalData={mockPredictiveData.historicalData}
          predictions={mockPredictiveData.predictions}
        />
      </div>
    </div>
  );
}