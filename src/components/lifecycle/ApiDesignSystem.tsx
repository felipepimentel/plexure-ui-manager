import React from 'react';
import { Book, Code, Copy, Download, FileJson, GitBranch } from 'lucide-react';

export default function ApiDesignSystem() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Book className="text-gray-500" size={24} />
          <h2 className="text-lg font-semibold">API Design System</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={16} />
            Export Guidelines
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Naming Conventions</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Resource Names</p>
              <p className="text-sm text-gray-600 mt-1">Use plural nouns for collections (e.g., /users, /orders)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Query Parameters</p>
              <p className="text-sm text-gray-600 mt-1">Use camelCase for parameter names (e.g., firstName, pageSize)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Response Fields</p>
              <p className="text-sm text-gray-600 mt-1">Use consistent casing across all responses (camelCase recommended)</p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">HTTP Methods Usage</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">GET</span>
                <p className="font-medium">Retrieve Resources</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">Use for reading data without side effects</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">POST</span>
                <p className="font-medium">Create Resources</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">Use for creating new resources</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">PUT</span>
                <p className="font-medium">Update Resources</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">Use for complete resource updates</p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Response Standards</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Success Responses</p>
              <pre className="mt-2 text-sm bg-gray-800 text-white p-2 rounded">
{`{
  "data": { ... },
  "meta": {
    "timestamp": "2024-03-15T10:30:00Z"
  }
}`}
              </pre>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Error Responses</p>
              <pre className="mt-2 text-sm bg-gray-800 text-white p-2 rounded">
{`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [ ... ]
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Versioning Strategy</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <GitBranch size={16} className="text-gray-500" />
                <p className="font-medium">URL Path Versioning</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">Example: /v1/users, /v2/users</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FileJson size={16} className="text-gray-500" />
                <p className="font-medium">Breaking Changes</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">Increment major version for breaking changes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}