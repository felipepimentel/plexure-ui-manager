import React from 'react';
import { Bell, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface Alert {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'critical';
  status: 'active' | 'resolved' | 'acknowledged';
  message: string;
  metric: string;
  value: number;
  threshold: number;
  resolvedAt?: string;
  resolvedBy?: string;
}

interface AlertsTimelineProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
  onResolve: (alertId: string) => void;
}

export default function AlertsTimeline({ alerts, onAcknowledge, onResolve }: AlertsTimelineProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Bell className="text-blue-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'critical':
        return <XCircle className="text-red-500" size={16} />;
      default:
        return null;
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
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="text-gray-500" size={24} />
          <h2 className="text-lg font-semibold">Alerts Timeline</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            {alerts.filter(a => a.status === 'active').length} Active
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg ${
              alert.type === 'critical'
                ? 'bg-red-50'
                : alert.type === 'warning'
                ? 'bg-yellow-50'
                : 'bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getAlertIcon(alert.type)}
                <span className="font-medium">{alert.metric}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(alert.status)}`}>
                  {alert.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>{new Date(alert.timestamp).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-3">{alert.message}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span>Value: {alert.value}</span>
                <span>Threshold: {alert.threshold}</span>
              </div>
              {alert.status === 'active' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAcknowledge(alert.id)}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm hover:bg-yellow-200"
                  >
                    Acknowledge
                  </button>
                  <button
                    onClick={() => onResolve(alert.id)}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200"
                  >
                    Resolve
                  </button>
                </div>
              )}
              {alert.status === 'resolved' && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle size={14} className="text-green-500" />
                  <span>Resolved by {alert.resolvedBy} at {new Date(alert.resolvedAt!).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}