import React from 'react';
import { Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface MonitoringMetric {
  name: string;
  value: string | number;
  change: number;
  status: 'success' | 'warning' | 'error';
}

const metrics: MonitoringMetric[] = [
  { name: 'Uptime', value: '99.99%', change: 0.01, status: 'success' },
  { name: 'Response Time', value: '145ms', change: -5.2, status: 'success' },
  { name: 'Error Rate', value: '0.12%', change: 0.05, status: 'warning' },
  { name: 'Active Endpoints', value: '12/12', change: 0, status: 'success' }
];

export default function ApiMonitoringDashboard() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="text-gray-500" size={24} />
          <h2 className="text-lg font-semibold">API Health Monitor</h2>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          All Systems Operational
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => (
          <div key={metric.name} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
              {metric.status === 'success' && <CheckCircle className="text-green-500" size={16} />}
              {metric.status === 'warning' && <AlertTriangle className="text-yellow-500" size={16} />}
              {metric.status === 'error' && <AlertTriangle className="text-red-500" size={16} />}
            </div>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className={`text-sm mt-1 ${
              metric.change > 0 ? 'text-green-600' : metric.change < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {metric.change > 0 ? '+' : ''}{metric.change}% from last period
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Recent Incidents</h3>
            <Clock size={16} className="text-gray-400" />
          </div>
          <div className="space-y-2">
            {[
              { time: '2h ago', message: 'High latency detected in US-WEST', status: 'resolved' },
              { time: '5h ago', message: 'API rate limit exceeded', status: 'investigating' }
            ].map((incident, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{incident.message}</p>
                  <p className="text-xs text-gray-500">{incident.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  incident.status === 'resolved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {incident.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}