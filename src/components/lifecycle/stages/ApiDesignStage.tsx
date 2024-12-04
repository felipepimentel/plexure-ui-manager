import React from 'react';
import { FileJson, GitBranch, Check, AlertTriangle } from 'lucide-react';
import type { ApiDesignData } from '../../../types/api';

interface ApiDesignStageProps {
  designData: ApiDesignData;
  onValidate: () => void;
  onSave: () => void;
}

export default function ApiDesignStage({ designData, onValidate, onSave }: ApiDesignStageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileJson className="text-blue-500" size={24} />
          <h2 className="text-lg font-semibold">API Design</h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onValidate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            <Check size={16} />
            Validate Schema
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <GitBranch size={16} />
            Save Version
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Design Guidelines</h3>
          <div className="space-y-3">
            {designData.guidelines.map((guideline, index) => (
              <div key={index} className="flex items-start gap-2">
                {guideline.status === 'passed' ? (
                  <Check className="text-green-500 mt-1" size={16} />
                ) : (
                  <AlertTriangle className="text-yellow-500 mt-1" size={16} />
                )}
                <div>
                  <p className="font-medium">{guideline.name}</p>
                  <p className="text-sm text-gray-500">{guideline.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Breaking Changes Detection</h3>
          <div className="space-y-3">
            {designData.breakingChanges.map((change, index) => (
              <div
                key={index}
                className="p-3 bg-red-50 rounded-lg border border-red-100"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-red-500" size={16} />
                  <p className="font-medium text-red-700">{change.type}</p>
                </div>
                <p className="text-sm text-red-600 mt-1">{change.description}</p>
                <p className="text-xs text-red-500 mt-2">
                  Impact: {change.impact} endpoints
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}