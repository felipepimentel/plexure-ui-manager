import React from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function ApiGovernance() {
  const governanceChecks = [
    {
      category: 'Security',
      checks: [
        { name: 'Authentication Required', status: 'passed' },
        { name: 'Rate Limiting Configured', status: 'passed' },
        { name: 'CORS Policy Defined', status: 'warning' },
        { name: 'Security Headers', status: 'failed' }
      ]
    },
    {
      category: 'Documentation',
      checks: [
        { name: 'OpenAPI Specification', status: 'passed' },
        { name: 'Example Responses', status: 'passed' },
        { name: 'Error Responses', status: 'warning' },
        { name: 'Version Strategy', status: 'passed' }
      ]
    },
    {
      category: 'Performance',
      checks: [
        { name: 'Response Time SLA', status: 'passed' },
        { name: 'Cache Strategy', status: 'warning' },
        { name: 'Pagination Support', status: 'passed' },
        { name: 'Query Optimization', status: 'passed' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'failed':
        return <XCircle className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="text-gray-500" size={24} />
        <h2 className="text-lg font-semibold">API Governance</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {governanceChecks.map((category) => (
          <div key={category.category} className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">{category.category}</h3>
            <div className="space-y-3">
              {category.checks.map((check) => (
                <div key={check.name} className="flex items-center justify-between">
                  <span className="text-sm">{check.name}</span>
                  {getStatusIcon(check.status)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-2">Governance Score</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: '85%' }} />
            </div>
          </div>
          <span className="font-medium">85%</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          4 issues need attention to achieve full compliance
        </p>
      </div>
    </div>
  );
}