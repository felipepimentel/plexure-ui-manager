import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Clock, AlertTriangle, Users } from 'lucide-react';
import type { ApiAnalytics } from '../../types/api';

interface ApiAnalyticsProps {
  analytics: ApiAnalytics;
}

export default function ApiAnalytics({ analytics }: ApiAnalyticsProps) {
  const performanceData = Object.entries(analytics.performance.byEndpoint).map(([endpoint, data]) => ({
    endpoint,
    avg: data.avg,
    p95: data.p95,
    p99: data.p99
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Activity className="text-gray-500" size={24} />
            <span className="text-sm font-medium text-green-600">
              +{((analytics.usage.total / 1000) - 1) * 100}%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Total Requests</h3>
          <p className="text-2xl font-bold mt-2">{analytics.usage.total.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-gray-500" size={24} />
            <span className="text-sm font-medium text-green-600">
              -{((analytics.performance.avgResponseTime / 100) - 1) * 100}%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Avg Response Time</h3>
          <p className="text-2xl font-bold mt-2">{analytics.performance.avgResponseTime}ms</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="text-gray-500" size={24} />
            <span className="text-sm font-medium text-red-600">
              +{(analytics.errors.rate * 100).toFixed(2)}%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Error Rate</h3>
          <p className="text-2xl font-bold mt-2">{(analytics.errors.rate * 100).toFixed(2)}%</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-gray-500" size={24} />
            <span className="text-sm font-medium text-green-600">
              +{analytics.consumers.new} new
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Active Consumers</h3>
          <p className="text-2xl font-bold mt-2">{analytics.consumers.active}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Response Time Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="endpoint" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avg" name="Average" stroke="#3B82F6" />
                <Line type="monotone" dataKey="p95" name="95th Percentile" stroke="#F59E0B" />
                <Line type="monotone" dataKey="p99" name="99th Percentile" stroke="#EF4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Top Consumers</h2>
          <div className="space-y-4">
            {analytics.consumers.top.map((consumer) => (
              <div key={consumer.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{consumer.name}</p>
                  <p className="text-sm text-gray-500">
                    {consumer.requests.toLocaleString()} requests
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Avg Latency: {consumer.avgLatency}ms
                  </p>
                  <p className="text-sm text-gray-500">
                    Error Rate: {((consumer.errors / consumer.requests) * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}