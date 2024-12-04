import React, { useState } from 'react';
import { Code, Save, Play, Download, Upload, Copy, RefreshCw } from 'lucide-react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDesigner() {
  const [specFormat, setSpecFormat] = useState('openapi');
  const [specVersion, setSpecVersion] = useState('3.0');
  const [spec, setSpec] = useState(`openapi: 3.0.0
info:
  title: Sample API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get users
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                    name:
                      type: string`);

  const handleSpecChange = (newSpec: string) => {
    setSpec(newSpec);
  };

  const generateSdk = async () => {
    // Implementation for SDK generation
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">API Designer</h2>
        <div className="flex items-center gap-4">
          <select
            value={specFormat}
            onChange={(e) => setSpecFormat(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="openapi">OpenAPI</option>
            <option value="asyncapi">AsyncAPI</option>
            <option value="graphql">GraphQL</option>
          </select>
          <select
            value={specVersion}
            onChange={(e) => setSpecVersion(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="3.0">3.0</option>
            <option value="3.1">3.1</option>
          </select>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Save size={16} />
            Save
          </button>
          <button 
            onClick={generateSdk}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Download size={16} />
            Generate SDK
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">API Specification</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigator.clipboard.writeText(spec)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Copy size={16} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Upload size={16} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <RefreshCw size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="border rounded-lg">
            <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
              <span className="text-sm font-medium">specification.yaml</span>
              <div className="flex gap-2">
                <button className="text-sm text-blue-600 hover:text-blue-700">Format</button>
                <button className="text-sm text-blue-600 hover:text-blue-700">Validate</button>
              </div>
            </div>
            <textarea
              className="w-full h-[600px] p-4 font-mono text-sm"
              value={spec}
              onChange={(e) => handleSpecChange(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Preview</h3>
            <button className="flex items-center gap-2 text-sm text-blue-600">
              <Play size={16} />
              Test Endpoints
            </button>
          </div>
          <div className="border rounded-lg h-[600px] overflow-auto">
            <SwaggerUI spec={spec} />
          </div>
        </div>
      </div>
    </div>
  );
}