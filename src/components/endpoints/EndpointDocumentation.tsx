import React from 'react';
import { Book, Code } from 'lucide-react';
import type { Endpoint } from '../../types/api';

interface EndpointDocumentationProps {
  endpoint: Endpoint;
}

export default function EndpointDocumentation({ endpoint }: EndpointDocumentationProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Book size={20} className="text-gray-500" />
        <h3 className="text-lg font-semibold">Documentation</h3>
      </div>

      <div className="prose max-w-none">
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Overview</h4>
          <p className="text-gray-600">{endpoint.documentation?.overview}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Parameters</h4>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Required</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {endpoint.documentation?.parameters.map((param) => (
                <tr key={param.name}>
                  <td className="px-4 py-2 font-mono text-sm">{param.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{param.type}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      param.required
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {param.required ? 'Required' : 'Optional'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{param.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Examples</h4>
          <div className="space-y-4">
            {endpoint.documentation?.examples.map((example, index) => (
              <div key={index} className="border rounded-lg">
                <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                  <span className="font-medium">{example.title}</span>
                  <Code size={16} className="text-gray-500" />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-4">{example.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Request</h5>
                      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                        {example.request}
                      </pre>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Response</h5>
                      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                        {example.response}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}