import React from 'react';
import { History, GitCommit, AlertTriangle, Calendar } from 'lucide-react';

interface ChangeLogEntry {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  breaking: boolean;
  changes: {
    type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed';
    description: string;
  }[];
}

const mockChangelog: ChangeLogEntry[] = [
  {
    version: '2.0.0',
    date: '2024-03-15',
    type: 'major',
    breaking: true,
    changes: [
      {
        type: 'changed',
        description: 'Updated authentication mechanism to OAuth 2.0'
      },
      {
        type: 'removed',
        description: 'Removed deprecated basic auth endpoints'
      },
      {
        type: 'added',
        description: 'Added rate limiting support'
      }
    ]
  },
  {
    version: '1.5.0',
    date: '2024-03-01',
    type: 'minor',
    breaking: false,
    changes: [
      {
        type: 'added',
        description: 'Added pagination support to list endpoints'
      },
      {
        type: 'fixed',
        description: 'Fixed response caching issues'
      }
    ]
  }
];

export default function ApiChangeLog() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <History className="text-gray-500" size={24} />
        <h2 className="text-lg font-semibold">API Change Log</h2>
      </div>

      <div className="space-y-6">
        {mockChangelog.map((entry) => (
          <div key={entry.version} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <GitCommit size={20} className="text-gray-500" />
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    v{entry.version}
                    {entry.breaking && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center gap-1">
                        <AlertTriangle size={12} />
                        Breaking Changes
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                entry.type === 'major'
                  ? 'bg-red-100 text-red-800'
                  : entry.type === 'minor'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {entry.type.toUpperCase()} RELEASE
              </span>
            </div>

            <div className="space-y-2">
              {entry.changes.map((change, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    change.type === 'added'
                      ? 'bg-green-50'
                      : change.type === 'changed'
                      ? 'bg-blue-50'
                      : change.type === 'deprecated'
                      ? 'bg-yellow-50'
                      : change.type === 'removed'
                      ? 'bg-red-50'
                      : 'bg-purple-50'
                  }`}
                >
                  <span className={`text-sm font-medium ${
                    change.type === 'added'
                      ? 'text-green-700'
                      : change.type === 'changed'
                      ? 'text-blue-700'
                      : change.type === 'deprecated'
                      ? 'text-yellow-700'
                      : change.type === 'removed'
                      ? 'text-red-700'
                      : 'text-purple-700'
                  }`}>
                    {change.type.toUpperCase()}:
                  </span>
                  <span className="text-sm text-gray-600 ml-2">{change.description}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}