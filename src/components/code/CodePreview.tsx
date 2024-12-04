import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodePreviewProps {
  code: string;
  language: string;
  title?: string;
}

export default function CodePreview({ code, language, title }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex items-center justify-between">
        {title && <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</span>}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{language}</span>
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} className="text-gray-500" />
            )}
          </button>
        </div>
      </div>
      <pre className="p-4 bg-gray-900 text-gray-100 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}