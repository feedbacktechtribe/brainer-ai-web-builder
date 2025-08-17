
import React, { ReactNode } from 'react';

interface OptionCardProps {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ label, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center text-center border-2 border-transparent hover:border-cyan-500 hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="text-cyan-400 group-hover:text-cyan-300 mb-3 transition-colors duration-300">
        {icon}
      </div>
      <span className="font-semibold text-lg text-gray-200 group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </button>
  );
};

export default OptionCard;
