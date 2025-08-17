
import React from 'react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = ['Type', 'Style', 'Branding'];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, index) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                currentStep >= index ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {index + 1}
            </div>
            <span className={`mt-2 text-sm font-semibold ${currentStep >= index ? 'text-white' : 'text-gray-500'}`}>
              {label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                currentStep > index ? 'bg-cyan-500' : 'bg-gray-700'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
