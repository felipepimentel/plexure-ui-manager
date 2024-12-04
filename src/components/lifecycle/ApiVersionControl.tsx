import React from 'react';
import { GitBranch, GitMerge, GitPullRequest, AlertTriangle } from 'lucide-react';

export default function ApiVersionControl() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <GitBranch className="text-gray-500" size={24} />
          <h2 className="text-lg font-semibold">Version Control</h2>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <GitBranch size={16} />
          Create New Version
        </button>
      </div>

      <div className="space-y-4">
        {[
          { version: 'v2.0.0', status: 'development', changes: 3, breaking: true },
          { version: 'v1.5.0', status: 'staging', changes: 2, breaking: false },
          { version: 'v1.0.0', status: 'production', changes: 0, breaking: false }
        ].map((version) => (
          <div key={version.version} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <h3 className="font-medium">{version.version}</h3>
                {version.breaking && (
                  <span className="flex items-center gap-1 text-sm text-red-600">
                    <AlertTriangle size={14} />
                    Breaking Changes
                  </span>
                )}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                version.status === 'production'
                  ? 'bg-green-100 text-green-800'
                  : version.status === 'staging'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {version.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{version.changes} pending changes</span>
              <button className="text-blue-600 hover:text-blue-700">View Diff</button>
              <button className="text-blue-600 hover:text-blue-700">Deploy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}