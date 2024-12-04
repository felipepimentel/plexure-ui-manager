import React, { useState } from 'react';
import { Book, ChevronRight, CheckCircle, Code, PlayCircle } from 'lucide-react';
import CodePreview from '../code/CodePreview';

interface TutorialStep {
  title: string;
  description: string;
  code?: {
    language: string;
    content: string;
  };
  action?: {
    type: 'try' | 'copy' | 'read';
    label: string;
  };
}

interface InteractiveTutorialProps {
  title: string;
  description: string;
  steps: TutorialStep[];
  onComplete: () => void;
}

export default function InteractiveTutorial({
  title,
  description,
  steps,
  onComplete
}: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepComplete = (index: number) => {
    if (!completedSteps.includes(index)) {
      setCompletedSteps([...completedSteps, index]);
    }
    
    if (index === steps.length - 1) {
      onComplete();
    } else {
      setCurrentStep(index + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Book className="text-blue-500" size={24} />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg cursor-pointer ${
                currentStep === index
                  ? 'bg-blue-50 border-2 border-blue-200'
                  : completedSteps.includes(index)
                  ? 'bg-green-50'
                  : 'bg-gray-50'
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Step {index + 1}</span>
                {completedSteps.includes(index) && (
                  <CheckCircle className="text-green-500" size={16} />
                )}
              </div>
              <p className="text-sm text-gray-600">{step.title}</p>
            </div>
          ))}
        </div>

        <div className="col-span-2 space-y-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-4">{steps[currentStep].title}</h3>
            <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
            
            {steps[currentStep].code && (
              <div className="mb-4">
                <CodePreview
                  code={steps[currentStep].code.content}
                  language={steps[currentStep].code.language}
                />
              </div>
            )}

            {steps[currentStep].action && (
              <button
                onClick={() => handleStepComplete(currentStep)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {steps[currentStep].action.type === 'try' && <PlayCircle size={16} />}
                {steps[currentStep].action.type === 'copy' && <Code size={16} />}
                {steps[currentStep].action.label}
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}