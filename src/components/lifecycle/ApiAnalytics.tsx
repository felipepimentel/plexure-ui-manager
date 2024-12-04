import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock, AlertTriangle } from 'lucide-react';

interface ApiAnalyticsProps {
  data: {
    timestamp: string;
    requests: number;
    latency: number;
    errors: number;
    successRate: number;
  }[];
}

export default function ApiAnalytics({ data }: ApiAnalyticsProps) {
  const latestData = data[data.length - 1];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Real-time Analytics</h2>
        <select className="border rounded-lg px-3 py-2">
          <option value="1h">Last Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-500" size={20} />
            <h3 className="text-sm font-medium">Total Requests</h3>
          </div>
          <p className="text-2xl font-bold">{latestData?.requests.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-green-500" size={20} />
            <h3 className="text-sm font-medium">Avg Latency</h3>
          </div>
          <p className="text-2xl font-bold">{latestData?.latency}ms</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-red-500" size={20} />
            <h3 className="text-sm font-medium">Error Rate</h3>
          </div>
          <p className="text-2xl font-bold">{latestData?.errors}%</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-purple-500" size={20} />
            <h3 className="text-sm font-medium">Success Rate</h3>
          </div>
          <p className="text-2xl font-bold">{latestData?.successRate}%</p>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="requests" stroke="#3B82F6" name="Requests" />
            <Line type="monotone" dataKey="latency" stroke="#10B981" name="Latency" />
            <Line type="monotone" dataKey="errors" stroke="#EF4444" name="Errors" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}