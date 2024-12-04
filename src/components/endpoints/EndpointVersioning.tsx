import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import type { Endpoint } from '../../types/api';

interface EndpointVersioningProps {
  endpoint: Endpoint;
}

export default function EndpointVersioning({ endpoint }: EndpointVersioningProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Version History</h3>
      <div className="space-y-4">
        {endpoint.versions?.map((version, index) => (
          <div
            key={version.version}
            className="border-l-2 pl-4 pb-4 relative"
            style={{
              borderColor: version.status === 'current' ? '#10B981' : '#D1D5DB'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">v{version.version}</span>
                <span className={`text-sm px-2 py-0.5 rounded-full ${
                  version.status === 'current'
                    ? 'bg-green-100 text-green-800'
                    : version.status === 'deprecated'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {version.status}
                </span>
                {version.breaking && (
                  <span className="flex items-center gap-1 text-sm text-red-600">
                    <AlertTriangle size={14} />
                    Breaking Changes
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-1" />
                {version.releaseDate}
              </div>
            </div>
            <div className="space-y-2">
              {version.changes.map((change, changeIndex) => (
                <div
                  key={changeIndex}
                  className={`text-sm ${
                    change.type === 'added'
                      ? 'text-green-600'
                      : change.type === 'modified'
                      ? 'text-blue-600'
                      : change.type === 'deprecated'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  <span className="font-medium capitalize">{change.type}:</span>{' '}
                  {change.description}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}