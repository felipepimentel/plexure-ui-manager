import React, { useState } from 'react';
import { Play, CheckCircle, XCircle, Clock, Settings, RefreshCw } from 'lucide-react';
import type { ApiTest } from '../../types/api';

interface ApiTestSuiteProps {
  tests: ApiTest[];
}

export default function ApiTestSuite({ tests }: ApiTestSuiteProps) {
  const [selectedEnvironment, setSelectedEnvironment] = useState('development');
  const [isRunning, setIsRunning] = useState(false);

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
        <h2 className="text-lg font-semibold">API Test Suite</h2>
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
            onClick={() => setIsRunning(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {isRunning ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
            Run Tests
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tests.map((test) => (
          <div key={test.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(test.status)}
                <h3 className="font-medium">{test.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  test.type === 'unit'
                    ? 'bg-blue-100 text-blue-800'
                    : test.type === 'integration'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {test.type}
                </span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings size={16} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">{test.description}</p>

            <div className="space-y-2">
              {test.assertions.map((assertion, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-sm ${
                    assertion.passed
                      ? 'bg-green-50 text-green-700'
                      : assertion.passed === false
                      ? 'bg-red-50 text-red-700'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {assertion.description}
                </div>
              ))}
            </div>

            {test.lastRun && (
              <div className="mt-4 text-sm text-gray-500">
                Last run: {new Date(test.lastRun).toLocaleString()}
                {test.duration && ` • Duration: ${test.duration}ms`}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}