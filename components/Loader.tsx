
import React from 'react';

interface LoaderProps {
    message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-semibold text-white">{message}</p>
      <p className="text-gray-400 mt-1">AI is thinking...</p>
    </div>
  );
};

export default Loader;
