import React from 'react';

interface StatusBadgeProps {
  status: string;
  type: 'endpoint' | 'apiKey' | 'custom';
  className?: string;
}

export default function StatusBadge({ status, type, className = '' }: StatusBadgeProps) {
  const getStatusColor = () => {
    if (type === 'endpoint') {
      return {
        active: 'bg-green-100 text-green-800',
        deprecated: 'bg-red-100 text-red-800',
        development: 'bg-yellow-100 text-yellow-800'
      }[status] || 'bg-gray-100 text-gray-800';
    }
    
    if (type === 'apiKey') {
      return {
        active: 'bg-green-100 text-green-800',
        revoked: 'bg-red-100 text-red-800'
      }[status] || 'bg-gray-100 text-gray-800';
    }

    return 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()} ${className}`}>
      {status}
    </span>
  );
}