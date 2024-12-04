import React from 'react';
import { TrendingUp, AlertTriangle, Zap } from 'lucide-react';

interface Insight {
  type: 'performance' | 'warning' | 'optimization';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  metric?: {
    value: number;
    change: number;
    unit: string;
  };
}

interface PerformanceInsightsProps {
  insights: Insight[];
}

export default function PerformanceInsights({ insights }: PerformanceInsightsProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return <TrendingUp className="text-blue-500" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'optimization':
        return <Zap className="text-purple-500" size={20} />;
      default:
        return null;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6">Performance Insights</h2>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getInsightIcon(insight.type)}
                <h3 className="font-medium">{insight.title}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                {insight.impact.toUpperCase()} IMPACT
              </span>
            </div>

            <p className="text-gray-600 mb-3">{insight.description}</p>

            {insight.metric && (
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium">
                  {insight.metric.value} {insight.metric.unit}
                </span>
                <span className={insight.metric.change > 0 ? 'text-green-600' : 'text-red-600'}>
                  {insight.metric.change > 0 ? '+' : ''}{insight.metric.change}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}