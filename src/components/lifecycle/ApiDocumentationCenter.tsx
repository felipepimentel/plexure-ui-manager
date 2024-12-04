import React from 'react';
import { Book, Code, FileText, ExternalLink } from 'lucide-react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const mockOpenApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Sample API',
    version: '1.0.0',
    description: 'A sample API specification'
  },
  paths: {
    '/users': {
      get: {
        summary: 'Get users',
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default function ApiDocumentationCenter() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">API Documentation</h1>
          <p className="text-gray-500">Interactive API documentation and resources</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <FileText size={16} />
            Export as PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Code size={16} />
            View OpenAPI Spec
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <div className="bg-white rounded-lg shadow-sm">
            <SwaggerUI spec={mockOpenApiSpec} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <div className="space-y-3">
              {[
                { title: 'Getting Started', icon: Book },
                { title: 'Authentication', icon: Code },
                { title: 'Error Handling', icon: FileText },
                { title: 'SDKs & Tools', icon: ExternalLink }
              ].map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.title}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50"
                  >
                    <Icon size={16} className="text-gray-500" />
                    <span>{link.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">API Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Version</span>
                <span className="font-medium">v1.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Updated</span>
                <span className="font-medium">2024-03-15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}