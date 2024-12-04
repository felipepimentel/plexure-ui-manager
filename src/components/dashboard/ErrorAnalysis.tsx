import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface ErrorData {
  code: string;
  message: string;
  count: number;
  trend: number;
  endpoint: string;
}

interface ErrorAnalysisProps {
  errors: ErrorData[];
  totalRequests: number;
}

export default function ErrorAnalysis({ errors, totalRequests }: ErrorAnalysisProps) {
  const totalErrors = errors.reduce((sum, error) => sum + error.count, 0);
  const errorRate = (totalErrors / totalRequests) * 100;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-gray-500" size={24} />
          <h2 className="text-lg font-semibold">Error Analysis</h2>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          errorRate < 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {errorRate.toFixed(2)}% Error Rate
        </span>
      </div>

      <div className="space-y-4">
        {errors.map((error) => (
          <div key={error.code} className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                  {error.code}
                </span>
                <span className="text-red-800 font-medium">{error.count} occurrences</span>
              </div>
              <span className={`text-sm font-medium ${
                error.trend > 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {error.trend > 0 ? '+' : ''}{error.trend}%
              </span>
            </div>
            <p className="text-red-700 mb-2">{error.message}</p>
            <div className="flex items-center gap-1 text-sm text-red-600">
              <span>Most affected endpoint:</span>
              <span className="font-mono">{error.endpoint}</span>
              <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}