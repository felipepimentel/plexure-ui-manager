import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, Filter } from 'lucide-react';

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'acknowledged';
  endpoint?: string;
  metric?: {
    name: string;
    value: number;
    threshold: number;
    unit: string;
  };
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'error',
    title: 'High Error Rate Detected',
    message: 'Error rate exceeded threshold of 1% in the last 5 minutes',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    status: 'active',
    endpoint: '/api/users',
    metric: {
      name: 'Error Rate',
      value: 2.5,
      threshold: 1,
      unit: '%'
    }
  },
  {
    id: '2',
    type: 'warning',
    title: 'Elevated Response Time',
    message: 'Average response time is approaching critical threshold',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    status: 'acknowledged',
    endpoint: '/api/products',
    metric: {
      name: 'Response Time',
      value: 850,
      threshold: 1000,
      unit: 'ms'
    }
  }
];

export default function Alerts() {
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  const getAlertTypeStyles = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'acknowledged':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Alerts</h1>
          <p className="text-gray-500">Monitor and manage API alerts</p>
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
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Bell size={16} />
            Configure Alerts
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-4">
          <div className="flex gap-4 mb-4">
            {['all', 'active', 'acknowledged', 'resolved'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg ${
                  filter === status
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 ${getAlertTypeStyles(alert.type)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={
                      alert.type === 'error'
                        ? 'text-red-500'
                        : alert.type === 'warning'
                        ? 'text-yellow-500'
                        : 'text-blue-500'
                    }
                    size={20}
                  />
                  <h3 className="font-medium">{alert.title}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(alert.status)}`}>
                  {alert.status.toUpperCase()}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{alert.message}</p>

              {alert.metric && (
                <div className="bg-white bg-opacity-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{alert.metric.name}</span>
                    <span className="text-sm text-gray-500">
                      Threshold: {alert.metric.threshold}{alert.metric.unit}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        alert.type === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                      style={{
                        width: `${(alert.metric.value / alert.metric.threshold) * 100}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span className="font-medium">
                      Current: {alert.metric.value}{alert.metric.unit}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={14} />
                  <span>{new Date(alert.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700">
                    Investigate
                  </button>
                  {alert.status === 'active' && (
                    <button className="text-green-600 hover:text-green-700">
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Alert Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Alerts</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  {mockAlerts.filter(a => a.status === 'active').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Acknowledged</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  {mockAlerts.filter(a => a.status === 'acknowledged').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Resolved Today</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {mockAlerts.filter(a => a.status === 'resolved').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Alert Rules</h2>
            <div className="space-y-2">
              {[
                { name: 'Error Rate', threshold: '> 1%', status: 'active' },
                { name: 'Response Time', threshold: '> 1000ms', status: 'active' },
                { name: 'Failed Requests', threshold: '> 50/min', status: 'inactive' }
              ].map((rule, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-sm text-gray-500">Threshold: {rule.threshold}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rule.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rule.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}