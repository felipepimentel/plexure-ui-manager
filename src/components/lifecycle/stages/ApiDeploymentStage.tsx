import React from 'react';
import { Rocket, Server, Globe, Shield } from 'lucide-react';

interface DeploymentEnvironment {
  id: string;
  name: string;
  status: 'active' | 'deploying' | 'failed';
  url: string;
  lastDeployed: string;
  version: string;
  health: {
    status: 'healthy' | 'degraded' | 'down';
    uptime: number;
    lastCheck: string;
  };
}

interface ApiDeploymentStageProps {
  environments: DeploymentEnvironment[];
  onDeploy: (envId: string) => void;
}

export default function ApiDeploymentStage({ environments, onDeploy }: ApiDeploymentStageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Rocket className="text-green-500" size={24} />
        <h2 className="text-lg font-semibold">API Deployment</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {environments.map((env) => (
          <div key={env.id} className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Server className="text-gray-400" size={20} />
                  <h3 className="font-medium">{env.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Current Version: {env.version}
                </p>
              </div>
              <button
                onClick={() => onDeploy(env.id)}
                disabled={env.status === 'deploying'}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  env.status === 'deploying'
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <Rocket size={16} />
                {env.status === 'deploying' ? 'Deploying...' : 'Deploy'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="text-blue-500" size={16} />
                  <h4 className="text-sm font-medium">Endpoint</h4>
                </div>
                <a
                  href={env.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {env.url}
                </a>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="text-green-500" size={16} />
                  <h4 className="text-sm font-medium">Health Status</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    env.health.status === 'healthy'
                      ? 'bg-green-500'
                      : env.health.status === 'degraded'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`} />
                  <span className="capitalize">{env.health.status}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Uptime: {env.health.uptime.toFixed(2)}%
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="text-purple-500" size={16} />
                  <h4 className="text-sm font-medium">Last Deployed</h4>
                </div>
                <p>{new Date(env.lastDeployed).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}