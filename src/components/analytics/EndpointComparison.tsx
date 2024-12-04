import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface EndpointMetric {
  endpoint: string;
  requests: number;
  latency: number;
  errorRate: number;
  change: number;
}

interface EndpointComparisonProps {
  endpoints: EndpointMetric[];
  sortBy: 'requests' | 'latency' | 'errorRate';
  onSortChange: (metric: 'requests' | 'latency' | 'errorRate') => void;
}

export default function EndpointComparison({ endpoints, sortBy, onSortChange }: EndpointComparisonProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Activity className="text-purple-500" size={24} />
          <h2 className="text-lg font-semibold">Endpoint Performance Comparison</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onSortChange('requests')}
            className={`px-3 py-1 rounded-lg text-sm ${
              sortBy === 'requests'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Requests
          </button>
          <button
            onClick={() => onSortChange('latency')}
            className={`px-3 py-1 rounded-lg text-sm ${
              sortBy === 'latency'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Latency
          </button>
          <button
            onClick={() => onSortChange('errorRate')}
            className={`px-3 py-1 rounded-lg text-sm ${
              sortBy === 'errorRate'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Error Rate
          </button>
        </div>
      </div>

      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={endpoints}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="endpoint" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey={sortBy}
              fill="#8B5CF6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {endpoints.map((endpoint) => (
          <div key={endpoint.endpoint} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{endpoint.endpoint}</p>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span>{endpoint.requests.toLocaleString()} requests</span>
                <span>{endpoint.latency}ms avg</span>
                <span>{endpoint.errorRate}% errors</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {endpoint.change > 0 ? (
                <ArrowUpRight className="text-green-500" size={16} />
              ) : (
                <ArrowDownRight className="text-red-500" size={16} />
              )}
              <span className={`text-sm font-medium ${
                endpoint.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {Math.abs(endpoint.change)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}