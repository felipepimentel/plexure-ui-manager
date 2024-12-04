import React from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ApiSecurityCenter() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="text-gray-500" size={24} />
        <h2 className="text-lg font-semibold">Security Center</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Lock size={16} />
            Security Policies
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Authentication Required', status: 'enabled', type: 'critical' },
              { name: 'Rate Limiting', status: 'enabled', type: 'critical' },
              { name: 'IP Whitelisting', status: 'disabled', type: 'recommended' },
              { name: 'Request Validation', status: 'enabled', type: 'critical' }
            ].map((policy) => (
              <div key={policy.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{policy.name}</p>
                  <p className="text-xs text-gray-500">{policy.type.toUpperCase()}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  policy.status === 'enabled'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {policy.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <AlertTriangle size={16} />
            Security Alerts
          </h3>
          <div className="space-y-3">
            {[
              { 
                title: 'Unusual Traffic Pattern',
                description: 'Spike in API requests from single IP',
                severity: 'high',
                time: '10m ago'
              },
              {
                title: 'Authentication Failures',
                description: 'Multiple failed auth attempts',
                severity: 'medium',
                time: '1h ago'
              }
            ].map((alert) => (
              <div key={alert.title} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{alert.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.severity === 'high'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{alert.description}</p>
                <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Security Audit Log</h3>
          <div className="space-y-3">
            {[
              { event: 'Policy Update', details: 'Rate limit increased', user: 'Admin', time: '2h ago' },
              { event: 'Access Grant', details: 'New API key generated', user: 'System', time: '5h ago' },
              { event: 'Security Scan', details: 'Vulnerability check completed', user: 'System', time: '1d ago' }
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{log.event}</p>
                  <p className="text-sm text-gray-500">{log.details}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{log.user}</p>
                  <p className="text-xs text-gray-500">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Compliance Status</h3>
          <div className="space-y-4">
            {[
              { standard: 'OWASP Top 10', status: 'compliant', score: '95%' },
              { standard: 'GDPR', status: 'compliant', score: '100%' },
              { standard: 'PCI DSS', status: 'partial', score: '85%' }
            ].map((compliance) => (
              <div key={compliance.standard} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{compliance.standard}</p>
                  <div className="flex items-center gap-2">
                    {compliance.status === 'compliant' 
                      ? <CheckCircle size={14} className="text-green-500" />
                      : <AlertTriangle size={14} className="text-yellow-500" />
                    }
                    <span className="text-sm text-gray-500">{compliance.status.toUpperCase()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{compliance.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}