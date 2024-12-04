import React from 'react';
import { GitBranch, GitMerge, GitPullRequest, Box, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Endpoint } from '../../types/api';

interface ApiLifecycleManagerProps {
  endpoint: Endpoint;
}

export default function ApiLifecycleManager({ endpoint }: ApiLifecycleManagerProps) {
  const lifecycleStages = [
    { id: 'design', label: 'Design', icon: Box, status: 'completed' },
    { id: 'development', label: 'Development', icon: GitBranch, status: 'completed' },
    { id: 'testing', label: 'Testing', icon: GitPullRequest, status: 'in-progress' },
    { id: 'staging', label: 'Staging', icon: GitMerge, status: 'pending' },
    { id: 'production', label: 'Production', icon: CheckCircle, status: 'pending' }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6">API Lifecycle Status</h2>
      
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
        
        <div className="relative flex justify-between">
          {lifecycleStages.map((stage, index) => {
            const Icon = stage.icon;
            const isCompleted = stage.status === 'completed';
            const isInProgress = stage.status === 'in-progress';
            
            return (
              <div key={stage.id} className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center z-10
                  ${isCompleted ? 'bg-green-500' : isInProgress ? 'bg-blue-500' : 'bg-gray-300'}
                `}>
                  <Icon className="text-white" size={16} />
                </div>
                <span className="text-sm font-medium mt-2">{stage.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium">Current Stage</h3>
            <p className="text-sm text-gray-500">Testing and Validation</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">In Progress</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Quality Gates</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                Contract Tests Passed
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                Security Scan Complete
              </li>
              <li className="flex items-center text-sm">
                <AlertTriangle className="text-yellow-500 mr-2" size={16} />
                Performance Tests Pending
              </li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Next Actions</h3>
            <ul className="space-y-2">
              <li className="text-sm">• Complete performance testing</li>
              <li className="text-sm">• Update API documentation</li>
              <li className="text-sm">• Schedule staging deployment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}