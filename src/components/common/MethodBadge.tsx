import React from 'react';

interface MethodBadgeProps {
  method: string;
  className?: string;
}

export default function MethodBadge({ method, className = '' }: MethodBadgeProps) {
  const getMethodColor = () => {
    return {
      GET: 'bg-green-100 text-green-800',
      POST: 'bg-blue-100 text-blue-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800',
      PATCH: 'bg-purple-100 text-purple-800'
    }[method] || 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMethodColor()} ${className}`}>
      {method}
    </span>
  );
}