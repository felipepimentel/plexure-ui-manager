import React from 'react';
import { Globe } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface RegionData {
  name: string;
  value: number;
  color: string;
}

interface GeographicDistributionProps {
  data: RegionData[];
}

export default function GeographicDistribution({ data }: GeographicDistributionProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="text-gray-500" size={24} />
        <h2 className="text-lg font-semibold">Geographic Distribution</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {data.map((region) => (
            <div key={region.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: region.color }}
                />
                <span className="font-medium">{region.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span>{region.value.toLocaleString()} requests</span>
                <span className="text-gray-500">
                  {((region.value / data.reduce((sum, r) => sum + r.value, 0)) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}