import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, Calendar, Download } from 'lucide-react';

interface Prediction {
  timestamp: string;
  actual?: number;
  predicted: number;
  confidence: {
    lower: number;
    upper: number;
  };
}

interface PredictiveAnalyticsProps {
  predictions: Prediction[];
  metric: string;
  unit: string;
  anomalies: {
    timestamp: string;
    severity: 'warning' | 'critical';
    message: string;
  }[];
}

export default function PredictiveAnalytics({
  predictions,
  metric,
  unit,
  anomalies
}: PredictiveAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-indigo-500" size={24} />
          <h2 className="text-lg font-semibold">Predictive Analytics: {metric}</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="24h">Next 24 Hours</option>
              <option value="7d">Next 7 Days</option>
              <option value="30d">Next 30 Days</option>
            </select>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Download size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="h-[400px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={predictions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => new Date(value).toLocaleString()}
            />
            <YAxis unit={unit} />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleString()}
              formatter={(value: number) => [`${value} ${unit}`, '']}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3B82F6"
              name="Actual"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#10B981"
              name="Predicted"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="confidence.upper"
              stroke="#D1D5DB"
              name="Upper Bound"
              strokeWidth={1}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="confidence.lower"
              stroke="#D1D5DB"
              name="Lower Bound"
              strokeWidth={1}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {anomalies.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Predicted Anomalies</h3>
          {anomalies.map((anomaly, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg flex items-start gap-3 ${
                anomaly.severity === 'critical' ? 'bg-red-50' : 'bg-yellow-50'
              }`}
            >
              <AlertTriangle
                size={16}
                className={anomaly.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'}
              />
              <div>
                <p className={`font-medium ${
                  anomaly.severity === 'critical' ? 'text-red-700' : 'text-yellow-700'
                }`}>
                  {new Date(anomaly.timestamp).toLocaleString()}
                </p>
                <p className={
                  anomaly.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                }>
                  {anomaly.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}