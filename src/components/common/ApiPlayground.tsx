import React, { useState } from 'react';
import { Play, Code, Copy, Download } from 'lucide-react';
import type { Endpoint } from '../../types/api';

interface ApiPlaygroundProps {
  endpoint: Endpoint;
}

export default function ApiPlayground({ endpoint }: ApiPlaygroundProps) {
  const [requestBody, setRequestBody] = useState('{\n  \n}');
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [response, setResponse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'playground' | 'curl' | 'sdk'>('playground');

  const generateCurlCommand = () => {
    return `curl -X ${endpoint.method} \\
  '${endpoint.path}' \\
  -H 'Content-Type: application/json' \\
  -d '${requestBody}'`;
  };

  const generateSdkExample = (language: 'javascript' | 'python' | 'go') => {
    const examples = {
      javascript: `const response = await fetch('${endpoint.path}', {
  method: '${endpoint.method}',
  headers: ${headers},
  body: ${requestBody}
});
const data = await response.json();`,
      python: `import requests

response = requests.${endpoint.method.toLowerCase()}(
    '${endpoint.path}',
    headers=${headers},
    json=${requestBody}
)
data = response.json()`,
      go: `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func main() {
    payload := ${requestBody}
    jsonData, _ := json.Marshal(payload)
    
    req, _ := http.NewRequest("${endpoint.method}", "${endpoint.path}", bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    // Handle response...
}`
    };
    return examples[language];
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab('playground')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'playground' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          <Play size={16} className="inline mr-2" />
          Playground
        </button>
        <button
          onClick={() => setActiveTab('curl')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'curl' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          <Code size={16} className="inline mr-2" />
          cURL
        </button>
        <button
          onClick={() => setActiveTab('sdk')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'sdk' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          <Download size={16} className="inline mr-2" />
          SDK Examples
        </button>
      </div>

      {activeTab === 'playground' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Headers</label>
            <textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              className="w-full h-32 font-mono text-sm p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Request Body</label>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="w-full h-48 font-mono text-sm p-3 border rounded-lg"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Send Request
          </button>
          {response && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Response</label>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                {response}
              </pre>
            </div>
          )}
        </div>
      )}

      {activeTab === 'curl' && (
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-400 text-sm">cURL Command</span>
            <button
              onClick={() => navigator.clipboard.writeText(generateCurlCommand())}
              className="text-gray-400 hover:text-white"
            >
              <Copy size={16} />
            </button>
          </div>
          <pre className="overflow-x-auto">{generateCurlCommand()}</pre>
        </div>
      )}

      {activeTab === 'sdk' && (
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">JavaScript</h3>
              <button
                onClick={() => navigator.clipboard.writeText(generateSdkExample('javascript'))}
                className="text-gray-400 hover:text-gray-600"
              >
                <Copy size={16} />
              </button>
            </div>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              {generateSdkExample('javascript')}
            </pre>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Python</h3>
              <button
                onClick={() => navigator.clipboard.writeText(generateSdkExample('python'))}
                className="text-gray-400 hover:text-gray-600"
              >
                <Copy size={16} />
              </button>
            </div>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              {generateSdkExample('python')}
            </pre>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Go</h3>
              <button
                onClick={() => navigator.clipboard.writeText(generateSdkExample('go'))}
                className="text-gray-400 hover:text-gray-600"
              >
                <Copy size={16} />
              </button>
            </div>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              {generateSdkExample('go')}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}