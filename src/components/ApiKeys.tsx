import React from 'react';
import { mockApiKeys } from '../data/mockData';
import { Copy, Eye, EyeOff } from 'lucide-react';

export default function ApiKeys() {
  const [showKeys, setShowKeys] = React.useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">API Keys</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Generate New Key
        </button>
      </div>

      <div className="space-y-4">
        {mockApiKeys.map((apiKey) => (
          <div key={apiKey.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-lg">{apiKey.name}</h3>
                <div className="flex items-center mt-2 space-x-2">
                  <code className="bg-gray-100 px-3 py-1 rounded font-mono text-sm">
                    {showKeys[apiKey.id] ? apiKey.key : '•'.repeat(20)}
                  </code>
                  <button
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showKeys[apiKey.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(apiKey.key)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${apiKey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {apiKey.status}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              <p>Created: {apiKey.created}</p>
              <p>Last used: {apiKey.lastUsed}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}