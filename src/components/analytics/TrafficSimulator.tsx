import React, { useState } from 'react';
import { Play, Pause, RefreshCw, Upload, Download, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SimulationConfig {
  baselineMultiplier: number;
  errorRate: number;
  latencyIncrease: number;
  duration: number;
}

interface TrafficSimulatorProps {
  historicalData: any[];
  onSimulate: (config: SimulationConfig) => void;
  isSimulating: boolean;
}

export default function TrafficSimulator({ historicalData, onSimulate, isSimulating }: TrafficSimulatorProps) {
  const [config, setConfig] = useState<SimulationConfig>({
    baselineMultiplier: 2,
    errorRate: 0.1,
    latencyIncrease: 1.5,
    duration: 60
  });

  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <RefreshCw className="text-blue-500" size={24} />
          <h2 className="text-lg font-semibold">Traffic Simulator</h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Settings size={16} className="text-gray-500" />
          </button>
          <button
            onClick={() => onSimulate(config)}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isSimulating
                ? 'bg-gray-100 text-gray-500'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSimulating ? <Pause size={16} /> : <Play size={16} />}
            {isSimulating ? 'Simulating...' : 'Start Simulation'}
          </button>
        </div>
      </div>

      {showConfig && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium mb-4">Simulation Configuration</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Traffic Multiplier
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={config.baselineMultiplier}
                onChange={(e) => setConfig({
                  ...config,
                  baselineMultiplier: parseFloat(e.target.value)
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Error Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={config.errorRate}
                onChange={(e) => setConfig({
                  ...config,
                  errorRate: parseFloat(e.target.value)
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Latency Multiplier
              </label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={config.latencyIncrease}
                onChange={(e) => setConfig({
                  ...config,
                  latencyIncrease: parseFloat(e.target.value)
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Duration (seconds)
              </label>
              <input
                type="number"
                min="30"
                max="300"
                step="30"
                value={config.duration}
                onChange={(e) => setConfig({
                  ...config,
                  duration: parseInt(e.target.value)
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700 mb-2">Expected Traffic</h3>
          <p className="text-2xl font-bold text-blue-900">
            {Math.round(historicalData[historicalData.length - 1]?.requests * config.baselineMultiplier)} req/s
          </p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-700 mb-2">Expected Latency</h3>
          <p className="text-2xl font-bold text-yellow-900">
            {Math.round(historicalData[historicalData.length - 1]?.latency * config.latencyIncrease)} ms
          </p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-sm font-medium text-red-700 mb-2">Expected Errors</h3>
          <p className="text-2xl font-bold text-red-900">
            {config.errorRate.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="requests"
              stroke="#3B82F6"
              name="Requests"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="simulatedRequests"
              stroke="#10B981"
              name="Simulated"
              strokeDasharray="5 5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <Upload size={16} />
            Import Traffic Pattern
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <Download size={16} />
            Export Results
          </button>
        </div>
        <div className="text-sm text-gray-500">
          Last simulation: Never
        </div>
      </div>
    </div>
  );
}