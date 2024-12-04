import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock } from 'lucide-react';

interface ApiUsageMetricsProps {
  data: {
    timestamp: string;
    requests: number;
    uniqueUsers: number;
    avgLatency: number;
  }[];
}

export default function ApiUsageMetrics({ data }: ApiUsageMetricsProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={24} />
          <h2 className="text-lg font-semibold">API Usage Metrics</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-blue-500" />
            <h3 className="text-sm font-medium text-blue-700">Total Requests</h3>
          </div>
          <p className="text-2xl font-bold text-blue-900">
            {data[data.length - 1]?.requests.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-green-500" />
            <h3 className="text-sm font-medium text-green-700">Active Users</h3>
          </div>
          <p className="text-2xl font-bold text-green-900">
            {data[data.length - 1]?.uniqueUsers.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-purple-500" />
            <h3 className="text-sm font-medium text-purple-700">Avg Latency</h3>
          </div>
          <p className="text-2xl font-bold text-purple-900">
            {data[data.length - 1]?.avgLatency}ms
          </p>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="#3B82F6"
              fill="#93C5FD"
              name="Requests"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}