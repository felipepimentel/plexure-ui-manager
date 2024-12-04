import React from 'react';
import { Shield, AlertTriangle, Lock, Activity, Users } from 'lucide-react';

interface SecurityMetrics {
  authFailures: number;
  suspiciousIPs: number;
  activeThreats: number;
  vulnerabilities: {
    high: number;
    medium: number;
    low: number;
  };
  complianceScore: number;
}

interface SecurityDashboardProps {
  metrics: SecurityMetrics;
}

export default function SecurityDashboard({ metrics }: SecurityDashboardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="text-blue-500" size={24} />
          <h2 className="text-lg font-semibold">Security Overview</h2>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          metrics.complianceScore > 90
            ? 'bg-green-100 text-green-800'
            : metrics.complianceScore > 70
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          Compliance Score: {metrics.complianceScore}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-red-500" size={20} />
            <h3 className="font-medium">Active Threats</h3>
          </div>
          <p className="text-2xl font-bold text-red-700">{metrics.activeThreats}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="text-yellow-500" size={20} />
            <h3 className="font-medium">Auth Failures</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-700">{metrics.authFailures}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-blue-500" size={20} />
            <h3 className="font-medium">Suspicious IPs</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700">{metrics.suspiciousIPs}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-purple-500" size={20} />
            <h3 className="font-medium">Vulnerabilities</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
              {metrics.vulnerabilities.high} High
            </span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
              {metrics.vulnerabilities.medium} Med
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
              {metrics.vulnerabilities.low} Low
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Recent Security Events</h3>
          <div className="space-y-3">
            {[
              { type: 'auth_failure', message: 'Multiple failed login attempts', time: '5m ago' },
              { type: 'suspicious_ip', message: 'Unusual traffic pattern detected', time: '15m ago' },
              { type: 'rate_limit', message: 'Rate limit exceeded for API key', time: '1h ago' }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-yellow-500" size={16} />
                  <div>
                    <p className="font-medium">{event.message}</p>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Investigate
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Security Recommendations</h3>
          <div className="space-y-3">
            {[
              { title: 'Enable 2FA', priority: 'high', effort: 'low' },
              { title: 'Update API key rotation policy', priority: 'medium', effort: 'medium' },
              { title: 'Configure IP allowlist', priority: 'high', effort: 'medium' }
            ].map((rec, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{rec.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      rec.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {rec.priority.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {rec.effort.toUpperCase()} effort
                    </span>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}