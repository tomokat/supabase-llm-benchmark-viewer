import { useState } from 'react';

interface ExpandableRowProps {
  title: string;
  data: unknown;
}

const ExpandableRow = ({ title, data }: ExpandableRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data) return null;

  return (
    <div className="py-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none text-sm"
      >
        {isExpanded ? 'Hide' : 'Show'} {title}
      </button>
      {isExpanded && <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-xs overflow-x-auto"><code>{JSON.stringify(data, null, 2)}</code></pre>}
    </div>
  );
};

export default ExpandableRow;