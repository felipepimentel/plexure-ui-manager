import React, { useState } from 'react';
import { Play, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import type { ContractTest } from '../../types/api';

interface ContractTestRunnerProps {
  contracts: ContractTest[];
  onRunTests: () => void;
}

export default function ContractTestRunner({ contracts, onRunTests }: ContractTestRunnerProps) {
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTests = async () => {
    setIsRunning(true);
    await onRunTests();
    setIsRunning(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Contract Tests</h2>
        <button
          onClick={handleRunTests}
          disabled={isRunning}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
          Run Contract Tests
        </button>
      </div>

      <div className="space-y-4">
        {contracts.map((contract) => (
          <div key={contract.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{contract.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Provider: {contract.provider.name}</span>
                <span className="text-sm text-gray-500">v{contract.provider.version}</span>
              </div>
            </div>

            <div className="space-y-4">
              {contract.interactions.map((interaction, index) => (
                <div key={index} className="border-t pt-4">
                  <h4 className="font-medium mb-2">{interaction.description}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Request</h5>
                      <pre className="bg-gray-50 p-3 rounded-lg text-sm">
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
                      <pre className="bg-gray-50 p-3 rounded-lg text-sm">
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