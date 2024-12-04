import React from 'react';
import { TestTube, Play, CheckCircle, XCircle } from 'lucide-react';
import type { TestSuite } from '../../../types/api';

interface ApiTestingStageProps {
  testSuites: TestSuite[];
  onRunTests: (suiteId: string) => void;
}

export default function ApiTestingStage({ testSuites, onRunTests }: ApiTestingStageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TestTube className="text-purple-500" size={24} />
          <h2 className="text-lg font-semibold">API Testing</h2>
        </div>
        <button
          onClick={() => onRunTests('all')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Play size={16} />
          Run All Tests
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {testSuites.map((suite) => (
          <div key={suite.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">{suite.name}</h3>
                <p className="text-sm text-gray-500">{suite.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm font-medium">{suite.stats.passed} passed</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="text-red-500" size={16} />
                  <span className="text-sm font-medium">{suite.stats.failed} failed</span>
                </div>
                <button
                  onClick={() => onRunTests(suite.id)}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                >
                  Run Suite
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {suite.tests.map((test) => (
                <div
                  key={test.id}
                  className={`p-3 rounded-lg ${
                    test.status === 'passed'
                      ? 'bg-green-50'
                      : test.status === 'failed'
                      ? 'bg-red-50'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {test.status === 'passed' ? (
                        <CheckCircle className="text-green-500" size={16} />
                      ) : test.status === 'failed' ? (
                        <XCircle className="text-red-500" size={16} />
                      ) : (
                        <TestTube className="text-gray-400" size={16} />
                      )}
                      <span className="font-medium">{test.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Duration: {test.duration}ms
                    </span>
                  </div>
                  {test.error && (
                    <div className="mt-2 p-2 bg-red-100 rounded text-sm text-red-700">
                      {test.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}