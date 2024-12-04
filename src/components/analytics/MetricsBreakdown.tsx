import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';

interface MetricBreakdownProps {
  title: string;
  data: {
    name: string;
    value: number;
    change: number;
  }[];
  unit?: string;
}

export default function MetricsBreakdown({ title, data, unit = '' }: MetricBreakdownProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Filter size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.name} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{item.name}</span>
              <div className="flex items-center gap-1">
                {item.change > 0 ? (
                  <ArrowUpRight className="text-green-500" size={16} />
                ) : (
                  <ArrowDownRight className="text-red-500" size={16} />
                )}
                <span className={`text-sm font-medium ${
                  item.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(item.change)}%
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold">
              {item.value.toLocaleString()}{unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}