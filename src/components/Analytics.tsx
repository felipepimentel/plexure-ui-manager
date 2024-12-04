import React from 'react';
import MetricsBreakdown from './analytics/MetricsBreakdown';
import EndpointUsageStats from './analytics/EndpointUsageStats';
import UsageHeatmap from './analytics/UsageHeatmap';
import PerformanceInsights from './analytics/PerformanceInsights';

const mockEndpoints = [
  {
    path: '/api/v1/users',
    method: 'GET',
    requests: 15000,
    latency: 145,
    errorRate: 0.12,
    change: 5.2
  },
  {
    path: '/api/v1/products',
    method: 'POST',
    requests: 8500,
    latency: 235,
    errorRate: 0.45,
    change: -2.1
  }
];

const mockHeatmapData = Array.from({ length: 168 }, (_, i) => ({
  hour: i % 24,
  day: new Date(Date.now() - (Math.floor(i / 24) * 24 * 60 * 60 * 1000)).toISOString(),
  value: Math.floor(Math.random() * 1000)
}));

const mockInsights = [
  {
    type: 'performance',
    title: 'Response Time Improvement',
    description: 'Average response time decreased by 15% in the last 24 hours',
    impact: 'high',
    metric: { value: 145, change: -15, unit: 'ms' }
  },
  {
    type: 'warning',
    title: 'Increased Error Rate',
    description: 'Error rate for /api/products has increased',
    impact: 'medium',
    metric: { value: 2.5, change: 0.8, unit: '%' }
  }
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Analytics</h1>
          <p className="text-gray-500">Detailed insights into your API usage and performance</p>
        </div>
        <select className="border rounded-lg px-3 py-2">
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricsBreakdown
          title="Top Endpoints by Usage"
          data={[
            { name: '/api/users', value: 15000, change: 5.2 },
            { name: '/api/products', value: 8500, change: -2.1 },
            { name: '/api/orders', value: 6200, change: 3.8 }
          ]}
          unit="requests"
        />
        <EndpointUsageStats endpoints={mockEndpoints} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageHeatmap data={mockHeatmapData} metric="Requests" />
        <PerformanceInsights insights={mockInsights} />
      </div>
    </div>
  );
}