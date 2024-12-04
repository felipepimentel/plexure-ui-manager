import { useState, useEffect } from 'react';
import { useRealTime } from '../contexts/RealTimeContext';
import type { ApiMetrics } from '../types/api';

export function useApiMetrics() {
  const { metrics } = useRealTime();
  const [historicalData, setHistoricalData] = useState<ApiMetrics[]>([]);

  useEffect(() => {
    if (metrics) {
      setHistoricalData(prev => [...prev, metrics].slice(-24)); // Keep last 24 data points
    }
  }, [metrics]);

  const getAggregatedMetrics = () => {
    if (historicalData.length === 0) return null;

    const latest = historicalData[historicalData.length - 1];
    const previous = historicalData[historicalData.length - 2];

    return {
      current: latest,
      previous,
      change: previous ? {
        requests: ((latest.requests - previous.requests) / previous.requests) * 100,
        latency: ((latest.latency - previous.latency) / previous.latency) * 100,
        errors: ((latest.errors - previous.errors) / previous.errors) * 100,
        successRate: latest.successRate - previous.successRate
      } : null
    };
  };

  return {
    historicalData,
    aggregatedMetrics: getAggregatedMetrics(),
    isLoading: !metrics
  };
}