import React from 'react';
import { Activity, Clock, AlertTriangle } from 'lucide-react';

interface EndpointStats {
  path: string;
  method: string;
  requests: number;
  latency: number;
  errorRate: number;
  change: number;
}

interface EndpointUsageStatsProps {
  endpoints: EndpointStats[];
}

export default function EndpointUsageStats({ endpoints }: EndpointUsageStatsProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6">Endpoint Performance</h2>
      
      <div className="space-y-4">
        {endpoints.map((endpoint) => (
          <div key={endpoint.path} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                    endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                    endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {endpoint.method}
                  </span>
                  <span className="font-medium">{endpoint.path}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {endpoint.change > 0 ? '+' : ''}{endpoint.change}% from last period
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Requests</p>
                  <p className="font-medium">{endpoint.requests.toLocaleString()}/min</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Avg Latency</p>
                  <p className="font-medium">{endpoint.latency}ms</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Error Rate</p>
                  <p className="font-medium">{endpoint.errorRate}%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}