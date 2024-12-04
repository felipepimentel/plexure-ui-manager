import React, { useState } from 'react';
import { mockEndpoints } from '../data/mockData';
import { Search, Filter, Plus } from 'lucide-react';
import MethodBadge from './common/MethodBadge';
import StatusBadge from './common/StatusBadge';
import EndpointDetail from './EndpointDetail';

export default function Endpoints() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);

  const filteredEndpoints = mockEndpoints.filter(endpoint => {
    const matchesSearch = endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || endpoint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">API Endpoints</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={20} />
          Add Endpoint
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search endpoints..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="deprecated">Deprecated</option>
            <option value="development">Development</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Path
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEndpoints.map((endpoint) => (
                <tr
                  key={endpoint.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedEndpoint(endpoint.id)}
                >
                  <td className="px-6 py-4">
                    <MethodBadge method={endpoint.method} />
                  </td>
                  <td className="px-6 py-4 font-mono text-sm">{endpoint.path}</td>
                  <td className="px-6 py-4">{endpoint.description}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={endpoint.status} type="endpoint" />
                  </td>
                  <td className="px-6 py-4 text-sm">v{endpoint.version}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {endpoint.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedEndpoint && (
        <EndpointDetail
          endpoint={mockEndpoints.find(e => e.id === selectedEndpoint)!}
          onClose={() => setSelectedEndpoint(null)}
        />
      )}
    </div>
  );
}