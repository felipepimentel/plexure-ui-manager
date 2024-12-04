import { Endpoint, ApiKey, ApiUsageMetrics } from '../types/api';

export const mockEndpoints: Endpoint[] = [
  {
    id: '1',
    name: 'Get Users',
    method: 'GET',
    path: '/api/v1/users',
    description: 'Retrieve a list of all users',
    status: 'active',
    lastUpdated: '2024-03-15',
    version: '1.0',
    authentication: 'required',
    rateLimit: 1000
  },
  {
    id: '2',
    name: 'Create User',
    method: 'POST',
    path: '/api/v1/users',
    description: 'Create a new user',
    status: 'active',
    lastUpdated: '2024-03-15',
    version: '1.0',
    authentication: 'required',
    rateLimit: 100
  },
  {
    id: '3',
    name: 'Legacy Auth',
    method: 'POST',
    path: '/api/v1/auth',
    description: 'Legacy authentication endpoint',
    status: 'deprecated',
    lastUpdated: '2024-03-10',
    version: '0.9',
    authentication: 'required',
    rateLimit: 50
  },
  {
    id: '4',
    name: 'Update User',
    method: 'PUT',
    path: '/api/v1/users/:id',
    description: 'Update user information',
    status: 'active',
    lastUpdated: '2024-03-16',
    version: '1.0',
    authentication: 'required',
    rateLimit: 100
  },
  {
    id: '5',
    name: 'Delete User',
    method: 'DELETE',
    path: '/api/v1/users/:id',
    description: 'Delete a user account',
    status: 'active',
    lastUpdated: '2024-03-16',
    version: '1.0',
    authentication: 'required',
    rateLimit: 50
  }
];

export const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'pk_live_123456789',
    created: '2024-03-01',
    lastUsed: '2024-03-15',
    status: 'active',
    permissions: ['read', 'write'],
    environment: 'production',
    usageLimit: 10000,
    currentUsage: 5420
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'pk_test_987654321',
    created: '2024-03-10',
    lastUsed: '2024-03-15',
    status: 'active',
    permissions: ['read', 'write'],
    environment: 'development',
    usageLimit: 1000,
    currentUsage: 350
  }
];

export const generateMockMetrics = (): ApiUsageMetrics[] => {
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    requests: Math.floor(Math.random() * 1000) + 500,
    latency: Math.floor(Math.random() * 100) + 50,
    errors: Math.floor(Math.random() * 10),
    successRate: 98 + Math.random() * 2,
    bandwidth: Math.floor(Math.random() * 1000) + 200
  }));
};