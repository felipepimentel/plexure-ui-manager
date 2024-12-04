import React from 'react';
import { Beaker, Play, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import ApiTestSuite from '../testing/ApiTestSuite';
import ContractTestViewer from '../testing/ContractTestViewer';

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

export default function ApiTestingCenter() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">API Testing Center</h1>
          <p className="text-gray-500">Comprehensive testing suite for API quality assurance</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Play size={16} />
          Run All Tests
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-green-500" size={20} />
            <h3 className="font-medium">Passing Tests</h3>
          </div>
          <p className="text-2xl font-bold text-green-700">24/30</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="text-red-500" size={20} />
            <h3 className="font-medium">Failing Tests</h3>
          </div>
          <p className="text-2xl font-bold text-red-700">4/30</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-yellow-500" size={20} />
            <h3 className="font-medium">Flaky Tests</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-700">2/30</p>
        </div>
      </div>

      <div className="space-y-6">
        <ApiTestSuite tests={mockTests} />
        <ContractTestViewer contracts={[]} />
      </div>
    </div>
  );
}