import React, { useState } from 'react';
import { ArrowRight, CheckCircle, AlertTriangle, Code } from 'lucide-react';
import CodePreview from '../code/CodePreview';

interface MigrationStep {
  id: string;
  title: string;
  description: string;
  type: 'code_change' | 'config_update' | 'data_migration';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  codeChanges?: {
    before: string;
    after: string;
  };
  validation?: {
    tests: number;
    passed: number;
  };
}

interface ApiMigrationAssistantProps {
  fromVersion: string;
  toVersion: string;
  steps: MigrationStep[];
  onStepComplete: (stepId: string) => void;
}

export default function ApiMigrationAssistant({
  fromVersion,
  toVersion,
  steps,
  onStepComplete
}: ApiMigrationAssistantProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'code_change':
        return <Code className="text-blue-500" size={16} />;
      case 'config_update':
        return <ArrowRight className="text-green-500" size={16} />;
      case 'data_migration':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Migration Assistant</h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">v{fromVersion}</span>
          <ArrowRight size={16} className="text-gray-400" />
          <span className="text-gray-500">v{toVersion}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 rounded-lg cursor-pointer ${
                currentStep === index
                  ? 'bg-blue-50 border-2 border-blue-200'
                  : step.status === 'completed'
                  ? 'bg-green-50'
                  : step.status === 'failed'
                  ? 'bg-red-50'
                  : 'bg-gray-50'
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStepIcon(step.type)}
                  <span className="font-medium">{step.title}</span>
                </div>
                {step.status === 'completed' && (
                  <CheckCircle className="text-green-500" size={16} />
                )}
              </div>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="col-span-2">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-4">{steps[currentStep].title}</h3>
            <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>

            {steps[currentStep].codeChanges && (
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Before</h4>
                  <CodePreview
                    code={steps[currentStep].codeChanges.before}
                    language="typescript"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">After</h4>
                  <CodePreview
                    code={steps[currentStep].codeChanges.after}
                    language="typescript"
                  />
                </div>
              </div>
            )}

            {steps[currentStep].validation && (
              <div className="bg-white p-4 rounded-lg border mb-6">
                <h4 className="text-sm font-medium mb-2">Validation Tests</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>{steps[currentStep].validation.passed} passed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="text-yellow-500" size={16} />
                    <span>
                      {steps[currentStep].validation.tests - steps[currentStep].validation.passed} remaining
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => onStepComplete(steps[currentStep].id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Complete Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}