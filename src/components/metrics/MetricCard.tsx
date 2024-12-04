import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  format?: (value: number) => string;
  inverseColors?: boolean;
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon,
  format = (v) => v.toString(),
  inverseColors = false
}: MetricCardProps) {
  const isPositive = change > 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  
  const getChangeColor = () => {
    if (inverseColors) {
      return isPositive ? 'text-red-600' : 'text-green-600';
    }
    return isPositive ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Icon className="text-primary" size={24} />
        </div>
        <span className={`flex items-center gap-1 text-sm font-medium ${getChangeColor()}`}>
          <TrendIcon size={16} />
          {change > 0 ? '+' : ''}{format(change)}
        </span>
      </div>
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}