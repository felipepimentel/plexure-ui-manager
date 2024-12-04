import React, { useState } from 'react';
import { GitBranch, GitMerge, AlertTriangle, Calendar } from 'lucide-react';

interface Version {
  version: string;
  status: 'current' | 'deprecated' | 'sunset';
  releaseDate: string;
  sunsetDate?: string;
  breaking: boolean;
  changes: {
    type: 'added' | 'modified' | 'deprecated' | 'removed';
    description: string;
  }[];
}

interface ApiVersionManagerProps {
  versions: Version[];
  onVersionChange: (version: string) => void;
}

export default function ApiVersionManager({ versions, onVersionChange }: ApiVersionManagerProps) {
  const [selectedVersion, setSelectedVersion] = useState(versions[0]?.version);

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    onVersionChange(version);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <GitBranch className="text-gray-500" size={24} />
        <h2 className="text-lg font-semibold">Version Management</h2>
      </div>

      <div className="flex gap-4 mb-6">
        {versions.map((version) => (
          <button
            key={version.version}
            onClick={() => handleVersionChange(version.version)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              selectedVersion === version.version
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>v{version.version}</span>
            {version.breaking && (
              <AlertTriangle size={16} className="text-yellow-500" />
            )}
          </button>
        ))}
      </div>

      {versions.map((version) => (
        version.version === selectedVersion && (
          <div key={version.version} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-gray-500" />
                  <h3 className="font-medium">Release Date</h3>
                </div>
                <p className="text-gray-600">{version.releaseDate}</p>
              </div>
              {version.sunsetDate && (
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-red-500" />
                    <h3 className="font-medium">Sunset Date</h3>
                  </div>
                  <p className="text-red-600">{version.sunsetDate}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-medium mb-4">Changes</h3>
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
            </div>
          </div>
        )
      ))}
    </div>
  );
}