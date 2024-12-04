import React from 'react';
import { GitBranch, AlertTriangle } from 'lucide-react';

interface Version {
  version: string;
  releaseDate: string;
  status: 'current' | 'deprecated' | 'sunset';
  breaking: boolean;
  changes: {
    type: 'added' | 'modified' | 'removed' | 'deprecated';
    description: string;
  }[];
  author: string;
  commitHash: string;
}

interface ApiVersionHistoryProps {
  versions: Version[];
  onVersionSelect: (version: string) => void;
}

export default function ApiVersionHistory({ versions = [], onVersionSelect }: ApiVersionHistoryProps) {
  if (!versions.length) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="text-gray-500" size={24} />
          <h2 className="text-lg font-semibold">Version History</h2>
        </div>
        <p className="text-gray-500">No version history available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <GitBranch className="text-indigo-500" size={24} />
        <h2 className="text-lg font-semibold">Version History</h2>
      </div>

      <div className="space-y-6">
        {versions.map((version) => (
          <div key={version.version} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">v{version.version}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  version.status === 'current'
                    ? 'bg-green-100 text-green-800'
                    : version.status === 'deprecated'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {version.status.toUpperCase()}
                </span>
                {version.breaking && (
                  <span className="flex items-center gap-1 text-xs text-red-600">
                    <AlertTriangle size={12} />
                    Breaking Changes
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(version.releaseDate).toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-3">
              {version.changes.map((change, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    change.type === 'added'
                      ? 'bg-green-50'
                      : change.type === 'modified'
                      ? 'bg-blue-50'
                      : change.type === 'deprecated'
                      ? 'bg-yellow-50'
                      : 'bg-red-50'
                  }`}
                >
                  <span className={`text-sm font-medium ${
                    change.type === 'added'
                      ? 'text-green-700'
                      : change.type === 'modified'
                      ? 'text-blue-700'
                      : change.type === 'deprecated'
                      ? 'text-yellow-700'
                      : 'text-red-700'
                  }`}>
                    {change.type.toUpperCase()}:
                  </span>
                  <p className="mt-1 text-gray-600">{change.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
              <div className="text-gray-500">
                Author: {version.author}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-gray-500">
                  {version.commitHash.substring(0, 7)}
                </span>
                <button
                  onClick={() => onVersionSelect(version.version)}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}