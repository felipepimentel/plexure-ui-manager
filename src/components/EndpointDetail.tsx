import React from 'react';
import type { Endpoint } from '../types/api';
import MethodBadge from './common/MethodBadge';
import StatusBadge from './common/StatusBadge';
import ApiPlayground from './common/ApiPlayground';
import SchemaViewer from './common/SchemaViewer';
import EndpointVersioning from './endpoints/EndpointVersioning';
import EndpointDocumentation from './endpoints/EndpointDocumentation';
import { Clock, Shield, Zap, X } from 'lucide-react';

interface EndpointDetailProps {
  endpoint: Endpoint;
  onClose: () => void;
}

export default function EndpointDetail({ endpoint, onClose }: EndpointDetailProps) {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'documentation' | 'versioning'>('overview');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MethodBadge method={endpoint.method} />
            <h2 className="text-xl font-bold">{endpoint.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-4 mb-6 border-b">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'documentation', label: 'Documentation' },
              { id: 'versioning', label: 'Versioning' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="text-gray-400" size={16} />
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">{endpoint.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="text-gray-400" size={16} />
                  <div>
                    <p className="text-sm text-gray-500">Authentication</p>
                    <p className="font-medium">{endpoint.authentication}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="text-gray-400" size={16} />
                  <div>
                    <p className="text-sm text-gray-500">Rate Limit</p>
                    <p className="font-medium">{endpoint.rateLimit} req/hour</p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p>{endpoint.description}</p>
              </div>

              {endpoint.requestSchema && (
                <div className="mb-6">
                  <SchemaViewer
                    schema={endpoint.requestSchema}
                    title="Request Schema"
                  />
                </div>
              )}

              {endpoint.responseSchema && (
                <div className="mb-6">
                  <SchemaViewer
                    schema={endpoint.responseSchema}
                    title="Response Schema"
                  />
                </div>
              )}

              <ApiPlayground endpoint={endpoint} />
            </>
          )}

          {activeTab === 'documentation' && (
            <EndpointDocumentation endpoint={endpoint} />
          )}

          {activeTab === 'versioning' && (
            <EndpointVersioning endpoint={endpoint} />
          )}
        </div>
      </div>
    </div>
  );
}