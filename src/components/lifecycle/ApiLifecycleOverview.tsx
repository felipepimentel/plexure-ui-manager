import React from 'react';
import { GitBranch, GitMerge, GitPullRequest, Box, CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import ApiLifecycleManager from './ApiLifecycleManager';
import ApiHealthMonitor from './ApiHealthMonitor';
import ApiMetricsAnalyzer from './ApiMetricsAnalyzer';
import ApiWorkflow from './ApiWorkflow';
import ApiGovernance from './ApiGovernance';

const mockHealthChecks = [
  {
    endpoint: '/api/v1/users',
    status: 'healthy',
    latency: 145,
    lastCheck: '2 minutes ago',
    uptime: 99.9,
    incidents: 0
  },
  {
    endpoint: '/api/v1/products',
    status: 'degraded',
    latency: 350,
    lastCheck: '1 minute ago',
    uptime: 98.5,
    incidents: 2
  }
];

const mockMetricsData = Array.from({ length: 24 }, (_, i) => ({
  timestamp: `${i}:00`,
  value: Math.floor(Math.random() * 100) + 50,
  predicted: Math.floor(Math.random() * 100) + 50,
  threshold: 200
}));

export default function ApiLifecycleOverview() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">API Lifecycle Overview</h1>
          <p className="text-gray-500">Monitor and manage your API throughout its lifecycle</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <GitBranch size={16} />
            Create Version
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
            <CheckCircle size={16} />
            Deploy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ApiLifecycleManager endpoint={{} as any} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ApiHealthMonitor healthChecks={mockHealthChecks} />
          <ApiMetricsAnalyzer
            title="Response Time Analysis"
            data={mockMetricsData}
            unit="ms"
            thresholdLabel="SLA Threshold"
          />
        </div>

        <ApiWorkflow />
        <ApiGovernance />
      </div>
    </div>
  );
}