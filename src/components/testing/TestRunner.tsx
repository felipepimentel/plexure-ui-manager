import React, { useState } from 'react';
import { Play, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import type { ApiTest } from '../../types/api';

interface TestRunnerProps {
  tests: ApiTest[];
  onRunTests: () => void;
}

export default function TestRunner({ tests, onRunTests }: TestRunnerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('development');

  const handleRunTests = async () => {
    setIsRunning(true);
    await onRunTests();
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'failed':
        return <XCircle className="text-red-500" size={16} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Test Suite</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedEnvironment}
            onChange={(e) => setSelectedEnvironment(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isRunning ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
            Run Tests
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tests.map((test) => (
          <div key={test.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(test.status)}
                <span className="font-medium">{test.name}</span>
                <span className="text-sm text-gray-500">({test.type})</span>
              </div>
              <span className="text-sm text-gray-500">
                {test.lastRun ? `Last run: ${new Date(test.lastRun).toLocaleString()}` : 'Never run'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{test.description}</p>
            <div className="space-y-2">
              {test.assertions.map((assertion, index) => (
                <div
                  key={index}
                  className={`text-sm p-2 rounded-lg ${
                    assertion.passed
                      ? 'bg-green-50 text-green-700'
                      : assertion.passed === false
                      ? 'bg-red-50 text-red-700'
                      : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {assertion.description}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}