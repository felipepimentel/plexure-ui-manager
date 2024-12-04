import React, { useState } from 'react';
import { TestTube, Play, CheckCircle, XCircle, Filter } from 'lucide-react';
import ApiTestSuite from './testing/ApiTestSuite';
import ContractTestViewer from './testing/ContractTestViewer';
import TestRunner from './testing/TestRunner';

const mockTests = [
  {
    id: '1',
    name: 'User Authentication Flow',
    description: 'Validate user authentication process',
    type: 'integration',
    status: 'passed',
    lastRun: '2024-03-15T10:00:00Z',
    duration: 1250,
    assertions: [
      { description: 'Should return JWT token', passed: true },
      { description: 'Should validate credentials', passed: true }
    ],
    environment: {
      name: 'development',
      variables: {
        API_URL: 'http://localhost:3000'
      }
    }
  },
  {
    id: '2',
    name: 'Rate Limiting',
    description: 'Test API rate limiting functionality',
    type: 'performance',
    status: 'failed',
    lastRun: '2024-03-15T09:00:00Z',
    duration: 3500,
    assertions: [
      { description: 'Should handle 1000 requests/minute', passed: false },
      { description: 'Should return 429 when limit exceeded', passed: true }
    ],
    environment: {
      name: 'staging',
      variables: {
        API_URL: 'https://staging-api.example.com'
      }
    }
  }
];

export default function Testing() {
  const [activeTab, setActiveTab] = useState<'unit' | 'integration' | 'contract'>('unit');
  const [selectedEnvironment, setSelectedEnvironment] = useState('development');

  const handleRunTests = async () => {
    // Implementation for running tests
    console.log('Running tests...');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">API Testing</h1>
          <p className="text-gray-500">Manage and run API tests across environments</p>
        </div>
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
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Play size={16} />
            Run All Tests
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-4 border-b">
        {[
          { id: 'unit', label: 'Unit Tests' },
          { id: 'integration', label: 'Integration Tests' },
          { id: 'contract', label: 'Contract Tests' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 -mb-px ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          {activeTab === 'unit' && (
            <TestRunner
              tests={mockTests.filter(t => t.type === 'unit')}
              onRunTests={handleRunTests}
            />
          )}
          {activeTab === 'integration' && (
            <ApiTestSuite
              tests={mockTests.filter(t => t.type === 'integration')}
            />
          )}
          {activeTab === 'contract' && (
            <ContractTestViewer contracts={[]} />
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Test Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Tests</span>
                <span className="font-medium">{mockTests.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Passing</span>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="font-medium">
                    {mockTests.filter(t => t.status === 'passed').length}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Failing</span>
                <div className="flex items-center gap-2">
                  <XCircle size={16} className="text-red-500" />
                  <span className="font-medium">
                    {mockTests.filter(t => t.status === 'failed').length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Test Environments</h2>
            <div className="space-y-2">
              {['development', 'staging', 'production'].map((env) => (
                <div
                  key={env}
                  className={`p-3 rounded-lg ${
                    selectedEnvironment === env
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{env}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      env === 'production'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {env === selectedEnvironment ? 'Active' : 'Ready'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}