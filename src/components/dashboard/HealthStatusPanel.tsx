import React from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ServiceHealth {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  latency: number;
  lastCheck: string;
}

interface HealthStatusPanelProps {
  services: ServiceHealth[];
}

export default function HealthStatusPanel({ services }: HealthStatusPanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'degraded':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'down':
        return <XCircle className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'operational':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'degraded':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'down':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const allOperational = services.every(service => service.status === 'operational');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="text-gray-500" size={24} />
          <h2 className="text-lg font-semibold">API Health Status</h2>
        </div>
        <span className={`${getStatusBadge(allOperational ? 'operational' : 'degraded')}`}>
          {allOperational ? 'All Systems Operational' : 'System Issues Detected'}
        </span>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              {getStatusIcon(service.status)}
              <div>
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-sm text-gray-500">
                  Last checked: {service.lastCheck}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Latency: {service.latency}ms
              </span>
              <span className={getStatusBadge(service.status)}>
                {service.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}