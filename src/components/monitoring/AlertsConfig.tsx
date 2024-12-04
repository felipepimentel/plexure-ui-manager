import React, { useState } from 'react';
import { Bell, Plus, Trash2 } from 'lucide-react';
import type { Alert } from '../../types/api';

export default function AlertsConfig() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = () => {
    const newAlert: Alert = {
      id: crypto.randomUUID(),
      type: 'error_rate',
      severity: 'warning',
      threshold: 0,
      condition: '>',
      status: 'active',
      createdAt: new Date().toISOString(),
      notifications: {}
    };
    setAlerts([...alerts, newAlert]);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Bell className="text-gray-500" size={20} />
          <h2 className="text-lg font-semibold">Alert Configuration</h2>
        </div>
        <button
          onClick={addAlert}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Alert
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{alert.type.replace('_', ' ').toUpperCase()}</h3>
                <p className="text-sm text-gray-500">
                  Trigger when value is {alert.condition} {alert.threshold}
                </p>
              </div>
              <button
                onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Severity
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={alert.severity}
                  onChange={(e) => {
                    const newAlerts = alerts.map(a =>
                      a.id === alert.id ? { ...a, severity: e.target.value as Alert['severity'] } : a
                    );
                    setAlerts(newAlerts);
                  }}
                >
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notification Email
                </label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="email@example.com"
                  onChange={(e) => {
                    const newAlerts = alerts.map(a =>
                      a.id === alert.id
                        ? { ...a, notifications: { ...a.notifications, email: [e.target.value] } }
                        : a
                    );
                    setAlerts(newAlerts);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}