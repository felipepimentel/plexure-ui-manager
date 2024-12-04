import React, { useState } from 'react';
import { Activity, Users, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight, Filter, Calendar, Download, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stats = [
    { icon: Activity, label: 'Total Requests', value: '1.2M', change: '+12.5%', trend: 'up' },
    { icon: Users, label: 'Active Users', value: '3.4K', change: '+8.1%', trend: 'up' },
    { icon: Clock, label: 'Avg Response Time', value: '245ms', change: '-5.2%', trend: 'down' },
    { icon: AlertTriangle, label: 'Error Rate', value: '0.12%', change: '-2.3%', trend: 'down' },
  ];

  const mockTimeSeriesData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    requests: Math.floor(Math.random() * 1000) + 500,
    errors: Math.floor(Math.random() * 20),
    latency: Math.floor(Math.random() * 100) + 50,
  }));

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            API Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Monitor your API performance and usage in real-time
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border rounded-xl px-4 py-2 bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button
            onClick={() => setIsRefreshing(true)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <RefreshCw className={`text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} size={20} />
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-secondary transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="dashboard-grid mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
          
          return (
            <div key={index} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Icon className="text-primary" size={24} />
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${
                  (stat.label === 'Error Rate' || stat.label === 'Avg Response Time') 
                    ? (isPositive ? 'text-red-600' : 'text-green-600')
                    : (isPositive ? 'text-green-600' : 'text-red-600')
                }`}>
                  <TrendIcon size={16} />
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="glass-panel rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Request Volume</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Filter size={16} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Calendar size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTimeSeriesData}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '0.75rem',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#6366F1" 
                  fill="url(#colorRequests)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">API Health Status</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              All Systems Operational
            </span>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Authentication Service', status: 'operational', latency: '45ms' },
              { name: 'Database Service', status: 'operational', latency: '120ms' },
              { name: 'Cache Service', status: 'degraded', latency: '350ms' }
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-500">{service.latency}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  service.status === 'operational'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {service.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}