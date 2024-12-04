import React from 'react';
import { ChevronDown, ChevronRight, Copy } from 'lucide-react';

interface SchemaViewerProps {
  schema: string;
  title: string;
}

export default function SchemaViewer({ schema, title }: SchemaViewerProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const formatSchema = (jsonSchema: string) => {
    try {
      return JSON.stringify(JSON.parse(jsonSchema), null, 2);
    } catch {
      return jsonSchema;
    }
  };

  return (
    <div className="border rounded-lg">
      <div
        className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <h3 className="font-medium">{title}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(schema);
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <Copy size={16} />
        </button>
      </div>
      {isExpanded && (
        <pre className="p-4 bg-gray-800 text-white rounded-b-lg overflow-x-auto">
          {formatSchema(schema)}
        </pre>
      )}
    </div>
  );
}