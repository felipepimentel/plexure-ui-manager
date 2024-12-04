import React, { useState } from 'react';
import { GitBranch, GitMerge, AlertTriangle, Calendar, Clock } from 'lucide-react';
import ApiVersionHistory from './lifecycle/ApiVersionHistory';
import ApiVersionManager from './lifecycle/ApiVersionManager';

const mockVersions = [
  {
    version: '2.0.0',
    status: 'current',
    releaseDate: '2024-03-15',
    breaking: true,
    changes: [
      { type: 'added', description: 'New authentication system' },
      { type: 'removed', description: 'Legacy API endpoints' },
      { type: 'modified', description: 'Updated rate limiting' }
    ],
    author: 'Sarah Chen',
    commitHash: '8f62a4d2e3'
  },
  {
    version: '1.5.0',
    status: 'deprecated',
    releaseDate: '2024-02-01',
    sunsetDate: '2024-08-01',
    breaking: false,
    changes: [
      { type: 'added', description: 'Pagination support' },
      { type: 'modified', description: 'Improved error handling' }
    ],
    author: 'Mike Johnson',
    commitHash: '3e7b9f1a2d'
  }
];

export default function Versions() {
  const [selectedVersion, setSelectedVersion] = useState(mockVersions[0].version);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">API Versions</h1>
          <p className="text-gray-500">Manage and track API versions and changes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <GitBranch size={16} />
          Create New Version
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ApiVersionHistory
            versions={mockVersions}
            onVersionSelect={setSelectedVersion}
          />
        </div>
        <div>
          <ApiVersionManager
            versions={mockVersions}
            onVersionChange={setSelectedVersion}
          />
        </div>
      </div>
    </div>
  );
}