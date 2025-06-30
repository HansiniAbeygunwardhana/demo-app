'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export function OnboardingWorkflow() {
  const [steps, setSteps] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number>(3);

  useEffect(() => {
    fetchWorkflowSteps();
  }, []);

  const fetchWorkflowSteps = async () => {
    try {
      const response = await fetch('/api/onboarding/workflow');
      const data = await response.json();
      setSteps(data.steps);
    } catch (error) {
      console.error('Failed to fetch workflow steps:', error);
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-900 mb-4">Onboarding Workflow</h4>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            {index < completedSteps ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-gray-300 flex-shrink-0" />
            )}
            <span className={`text-sm ${
              index < completedSteps ? 'text-gray-900 font-medium' : 'text-gray-500'
            }`}>
              {index + 1}. {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}