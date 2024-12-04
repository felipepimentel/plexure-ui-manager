import React from 'react';
import { Users, Settings, Shield, Database } from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  plan: 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'pending';
  limits: {
    requestsPerSecond: number;
    endpoints: number;
    users: number;
  };
  usage: {
    requests: number;
    endpoints: number;
    users: number;
  };
}

interface TenantSettingsProps {
  tenant: Tenant;
  onUpdateLimits: (limits: Tenant['limits']) => void;
  onUpdateStatus: (status: Tenant['status']) => void;
}

export default function TenantSettings({ tenant, onUpdateLimits, onUpdateStatus }: TenantSettingsProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="text-blue-500" size={24} />
          <h2 className="text-lg font-semibold">Tenant Settings</h2>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          tenant.plan === 'enterprise'
            ? 'bg-purple-100 text-purple-800'
            : tenant.plan === 'pro'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {tenant.plan.toUpperCase()} Plan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Resource Limits</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Requests per Second
                </label>
                <input
                  type="number"
                  value={tenant.limits.requestsPerSecond}
                  onChange={(e) => onUpdateLimits({
                    ...tenant.limits,
                    requestsPerSecond: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-gray-500">
                    Current usage: {tenant.usage.requests}/s
                  </span>
                  <span className={tenant.usage.requests > tenant.limits.requestsPerSecond * 0.8
                    ? 'text-red-600'
                    : 'text-green-600'
                  }>
                    {((tenant.usage.requests / tenant.limits.requestsPerSecond) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Maximum Endpoints
                </label>
                <input
                  type="number"
                  value={tenant.limits.endpoints}
                  onChange={(e) => onUpdateLimits({
                    ...tenant.limits,
                    endpoints: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-gray-500">
                    Current usage: {tenant.usage.endpoints}
                  </span>
                  <span className={tenant.usage.endpoints > tenant.limits.endpoints * 0.8
                    ? 'text-red-600'
                    : 'text-green-600'
                  }>
                    {((tenant.usage.endpoints / tenant.limits.endpoints) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Maximum Users
                </label>
                <input
                  type="number"
                  value={tenant.limits.users}
                  onChange={(e) => onUpdateLimits({
                    ...tenant.limits,
                    users: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-gray-500">
                    Current usage: {tenant.usage.users}
                  </span>
                  <span className={tenant.usage.users > tenant.limits.users * 0.8
                    ? 'text-red-600'
                    : 'text-green-600'
                  }>
                    {((tenant.usage.users / tenant.limits.users) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Tenant Status</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-gray-500" />
                    <span className="font-medium">Access Status</span>
                  </div>
                  <select
                    value={tenant.status}
                    onChange={(e) => onUpdateStatus(e.target.value as Tenant['status'])}
                    className="px-3 py-1 border rounded-lg text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Database size={16} className="text-gray-500" />
                  <span className="font-medium">Data Isolation</span>
                </div>
                <p className="text-sm text-gray-600">
                  This tenant's data is fully isolated in a dedicated database schema.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Settings size={16} className="text-gray-500" />
                  <span className="font-medium">Custom Domain</span>
                </div>
                <input
                  type="text"
                  placeholder="api.yourdomain.com"
                  className="w-full px-3 py-2 border rounded-lg mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}