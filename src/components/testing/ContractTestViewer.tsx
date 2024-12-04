import React from 'react';
import { GitBranch, CheckCircle, AlertTriangle } from 'lucide-react';
import type { ContractTest } from '../../types/api';

interface ContractTestViewerProps {
  contracts: ContractTest[];
}

export default function ContractTestViewer({ contracts }: ContractTestViewerProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <GitBranch className="text-gray-500" size={24} />
        <h2 className="text-lg font-semibold">Contract Tests</h2>
      </div>

      <div className="space-y-6">
        {contracts.map((contract) => (
          <div key={contract.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">{contract.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span>Provider: {contract.provider.name} v{contract.provider.version}</span>
                  <span>Consumer: {contract.consumer.name} v{contract.consumer.version}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-sm font-medium">Verified</span>
              </div>
            </div>

            <div className="space-y-4">
              {contract.interactions.map((interaction, index) => (
                <div key={index} className="border-t pt-4">
                  <h4 className="font-medium mb-2">{interaction.description}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Request</h5>
                      <pre className="bg-gray-50 p-3 rounded-lg text-sm overflow-x-auto">
                        {JSON.stringify({
                          method: interaction.request.method,
                          path: interaction.request.path,
                          headers: interaction.request.headers,
                          body: interaction.request.body
                        }, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Expected Response</h5>
                      <pre className="bg-gray-50 p-3 rounded-lg text-sm overflow-x-auto">
                        {JSON.stringify({
                          status: interaction.response.status,
                          headers: interaction.response.headers,
                          body: interaction.response.body
                        }, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}