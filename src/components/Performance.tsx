import React, { useState } from 'react';
import { Zap, Clock, Activity, AlertTriangle, Filter, Download } from 'lucide-react';
import MetricsBreakdown from './analytics/MetricsBreakdown';
import PerformanceInsights from './analytics/PerformanceInsights';
import TimeSeriesChart from './metrics/TimeSeriesChart';
import MetricCard from './metrics/MetricCard';

const mockTimeSeriesData = Array.from({ length: 24 }, (_, i) => ({
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  value: Math.floor(Math.random() * 100) + 50
}));

const mockPerformanceMetrics = [
  {
    title: 'Response Time',
    value: '145ms',
    change: -5.2,
    icon: Clock,
    inverseColors: true
  },
  {
    title: 'Throughput',
    value: '1.2K/s',
    change: 12.5,
    icon: Activity
  },
  {
    title: 'Error Rate',
    value: '0.12%',
    change: -2.3,
    icon: AlertTriangle,
    inverseColors: true
  }
];

export default function Performance() {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('response_time');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Performance Monitoring</h1>
          <p className="text-gray-500">Monitor and analyze API performance metrics</p>
        </div>
        <div className="flex items-center gap-4">
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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {mockPerformanceMetrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
            inverseColors={metric.inverseColors}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Response Time Trends</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Filter size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
          <TimeSeriesChart
            data={mockTimeSeriesData}
            dataKey="value"
            name="Response Time"
            unit="ms"
            color="#6366F1"
          />
        </div>

        <MetricsBreakdown
          title="Endpoint Performance"
          data={[
            { name: '/api/users', value: 145, change: -5.2 },
            { name: '/api/products', value: 235, change: 2.1 },
            { name: '/api/orders', value: 189, change: -1.8 }
          ]}
          unit="ms"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Performance Distribution</h2>
          <div className="space-y-4">
            {[
              { label: 'p50', value: 145, total: 300 },
              { label: 'p90', value: 225, total: 300 },
              { label: 'p95', value: 275, total: 300 },
              { label: 'p99', value: 295, total: 300 }
            ].map((percentile) => (
              <div key={percentile.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    {percentile.label.toUpperCase()}: {percentile.value}ms
                  </span>
                  <span className="text-gray-500">
                    {((percentile.value / percentile.total) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(percentile.value / percentile.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <PerformanceInsights
          insights={[
            {
              type: 'performance',
              title: 'Response Time Improvement',
              description: 'Average response time decreased by 15% in the last 24 hours',
              impact: 'high',
              metric: { value: 145, change: -15, unit: 'ms' }
            },
            {
              type: 'warning',
              title: 'High Latency Detected',
              description: 'The /api/products endpoint is showing increased latency',
              impact: 'medium',
              metric: { value: 235, change: 12.5, unit: 'ms' }
            },
            {
              type: 'optimization',
              title: 'Cache Hit Rate',
              description: 'Cache hit rate has improved after recent optimizations',
              impact: 'medium',
              metric: { value: 85, change: 5.2, unit: '%' }
            }
          ]}
        />
      </div>
    </div>
  );
}