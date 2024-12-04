import React, { useState } from 'react';
import { Search, Filter, Download, RefreshCw } from 'lucide-react';

interface Log {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  metadata: Record<string, any>;
}

interface LogViewerProps {
  logs: Log[];
  onRefresh: () => void;
  isLoading?: boolean;
}

export default function LogViewer({ logs, onRefresh, isLoading = false }: LogViewerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         JSON.stringify(log.metadata).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">API Logs</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg hover:bg-gray-100"
            disabled={isLoading}
          >
            <RefreshCw className={`${isLoading ? 'animate-spin' : ''} text-gray-500`} size={20} />
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <Download size={20} />
            Export Logs
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search logs..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            className="pl-10 pr-8 py-2 border rounded-lg appearance-none bg-white"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className={`p-4 rounded-lg ${
              log.level === 'error'
                ? 'bg-red-50'
                : log.level === 'warn'
                ? 'bg-yellow-50'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                log.level === 'error'
                  ? 'bg-red-100 text-red-800'
                  : log.level === 'warn'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {log.level.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">{log.timestamp}</span>
            </div>
            <p className="text-gray-800 mb-2">{log.message}</p>
            {Object.keys(log.metadata).length > 0 && (
              <pre className="text-sm bg-white p-2 rounded border">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}