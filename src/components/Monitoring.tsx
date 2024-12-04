import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import AlertsConfig from './monitoring/AlertsConfig';
import { Clock, Activity, AlertTriangle, Globe } from 'lucide-react';

const mockData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 1000) + 500,
  latency: Math.floor(Math.random() * 100) + 50,
  errors: Math.floor(Math.random() * 10),
  p95: Math.floor(Math.random() * 200) + 100,
  p99: Math.floor(Math.random() * 300) + 200,
}));

const geographicData = {
  'North America': 45,
  'Europe': 30,
  'Asia': 15,
  'South America': 5,
  'Others': 5,
};

export default function Monitoring() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">API Monitoring</h1>
        <div className="flex gap-4">
          <select className="border rounded-lg px-3 py-2">
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {[
          { icon: Activity, label: 'Total Requests', value: '1.2M', change: '+12.5%' },
          { icon: Clock, label: 'Avg Response Time', value: '245ms', change: '-5.2%' },
          { icon: AlertTriangle, label: 'Error Rate', value: '0.12%', change: '-2.3%' },
          { icon: Globe, label: 'Active Regions', value: '12', change: '+2' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Icon className="text-gray-500" size={24} />
                <span className={`text-sm font-medium ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Request Volume</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stroke="#3B82F6" fill="#93C5FD" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Response Time Percentiles</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="latency" name="P50" stroke="#10B981" />
                <Line type="monotone" dataKey="p95" name="P95" stroke="#F59E0B" />
                <Line type="monotone" dataKey="p99" name="P99" stroke="#EF4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <AlertsConfig />
    </div>
  );
}