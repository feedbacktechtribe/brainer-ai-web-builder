
import React, { useState } from 'react';
import { Clipboard, Check } from './icons/ActionIcons';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-900 rounded-lg">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
      >
        {copied ? <Check /> : <Clipboard />}
      </button>
      <pre className="p-4 overflow-auto rounded-lg max-h-96">
        <code className="language-html text-sm text-gray-300">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
