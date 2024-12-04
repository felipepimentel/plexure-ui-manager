import React from 'react';
import { GitBranch, GitMerge, GitPullRequest, Box, CheckCircle, AlertTriangle, Clock, Settings } from 'lucide-react';

interface WorkflowStage {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending' | 'failed';
  tasks: {
    name: string;
    status: 'completed' | 'in-progress' | 'pending' | 'failed';
    description: string;
    assignee?: string;
    dueDate?: string;
  }[];
  metrics?: {
    timeSpent: number;
    completionRate: number;
    blockers: number;
  };
}

export default function ApiWorkflow() {
  const stages: WorkflowStage[] = [
    {
      id: 'design',
      name: 'Design & Planning',
      status: 'completed',
      tasks: [
        { 
          name: 'API Specification', 
          status: 'completed', 
          description: 'Create OpenAPI specification',
          assignee: 'Sarah Chen',
          dueDate: '2024-03-20'
        },
        { 
          name: 'Security Review', 
          status: 'completed', 
          description: 'Review security requirements',
          assignee: 'Mike Johnson',
          dueDate: '2024-03-22'
        },
        {
          name: 'Documentation Planning',
          status: 'completed',
          description: 'Plan API documentation structure',
          assignee: 'Alex Kim',
          dueDate: '2024-03-23'
        }
      ],
      metrics: {
        timeSpent: 48,
        completionRate: 100,
        blockers: 0
      }
    },
    {
      id: 'development',
      name: 'Development',
      status: 'in-progress',
      tasks: [
        { 
          name: 'Implementation', 
          status: 'in-progress', 
          description: 'Implement API endpoints',
          assignee: 'David Lee',
          dueDate: '2024-03-25'
        },
        { 
          name: 'Unit Tests', 
          status: 'pending', 
          description: 'Write unit tests',
          assignee: 'Emma Wilson',
          dueDate: '2024-03-26'
        },
        {
          name: 'Code Review',
          status: 'pending',
          description: 'Conduct peer code review',
          assignee: 'Chris Taylor',
          dueDate: '2024-03-27'
        }
      ],
      metrics: {
        timeSpent: 24,
        completionRate: 45,
        blockers: 1
      }
    },
    {
      id: 'testing',
      name: 'Testing & Validation',
      status: 'pending',
      tasks: [
        { 
          name: 'Integration Tests', 
          status: 'pending', 
          description: 'Run integration tests',
          assignee: 'Sarah Chen',
          dueDate: '2024-03-28'
        },
        { 
          name: 'Performance Tests', 
          status: 'pending', 
          description: 'Run performance tests',
          assignee: 'Mike Johnson',
          dueDate: '2024-03-29'
        },
        {
          name: 'Security Testing',
          status: 'pending',
          description: 'Conduct security testing',
          assignee: 'Alex Kim',
          dueDate: '2024-03-30'
        }
      ],
      metrics: {
        timeSpent: 0,
        completionRate: 0,
        blockers: 0
      }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'in-progress':
        return <GitBranch className="text-blue-500" size={16} />;
      case 'failed':
        return <AlertTriangle className="text-red-500" size={16} />;
      default:
        return <GitPullRequest className="text-gray-400" size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">API Development Workflow</h2>
        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
          <Settings size={16} />
          Configure Workflow
        </button>
      </div>

      <div className="space-y-8">
        {stages.map((stage) => (
          <div key={stage.id} className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {getStatusIcon(stage.status)}
                <h3 className="font-medium">{stage.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stage.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : stage.status === 'in-progress'
                    ? 'bg-blue-100 text-blue-800'
                    : stage.status === 'failed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {stage.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              {stage.metrics && (
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-gray-400" />
                    <span>{stage.metrics.timeSpent}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle size={14} className="text-gray-400" />
                    <span>{stage.metrics.completionRate}%</span>
                  </div>
                  {stage.metrics.blockers > 0 && (
                    <div className="flex items-center gap-1 text-red-500">
                      <AlertTriangle size={14} />
                      <span>{stage.metrics.blockers} blocker(s)</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="ml-8 space-y-4">
              {stage.tasks.map((task) => (
                <div key={task.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(task.status)}
                    <div>
                      <p className="font-medium">{task.name}</p>
                      <p className="text-sm text-gray-500">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    {task.assignee && (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          {task.assignee.charAt(0)}
                        </div>
                        <span>{task.assignee}</span>
                      </div>
                    )}
                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock size={14} />
                        <span>Due {task.dueDate}</span>
                      </div>
                    )}
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