import React from 'react';
import { Activity, AlertTriangle, CheckCircle, XCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface HealthCheck {
  endpoint: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  lastCheck: string;
  uptime: number;
  incidents: number;
}

interface ApiHealthMonitorProps {
  healthChecks: HealthCheck[];
}

export default function ApiHealthMonitor({ healthChecks }: ApiHealthMonitorProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'degraded':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'down':
        return <XCircle className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'down':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const overallHealth = healthChecks.every(check => check.status === 'healthy')
    ? 'Healthy'
    : healthChecks.some(check => check.status === 'down')
    ? 'Critical'
    : 'Degraded';

  const averageUptime = healthChecks.reduce((acc, check) => acc + check.uptime, 0) / healthChecks.length;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="text-gray-500" size={24} />
          <h2 className="text-lg font-semibold">API Health Status</h2>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          overallHealth === 'Healthy'
            ? 'bg-green-100 text-green-800'
            : overallHealth === 'Critical'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {overallHealth}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700">Average Uptime</h3>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold text-blue-900">{averageUptime.toFixed(1)}%</span>
            <ArrowUpRight className="text-green-500 ml-2" size={20} />
          </div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-sm font-medium text-purple-700">Total Incidents</h3>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold text-purple-900">
              {healthChecks.reduce((acc, check) => acc + check.incidents, 0)}
            </span>
            <ArrowDownRight className="text-red-500 ml-2" size={20} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {healthChecks.map((check) => (
          <div key={check.endpoint} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(check.status)}
                <h3 className="font-medium">{check.endpoint}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                {check.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Latency</p>
                <p className="font-medium">{check.latency}ms</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Uptime</p>
                <p className="font-medium">{check.uptime}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Incidents</p>
                <p className="font-medium">{check.incidents}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Check</p>
                <p className="font-medium">{check.lastCheck}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    check.status === 'healthy'
                      ? 'bg-green-500'
                      : check.status === 'degraded'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${check.uptime}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}