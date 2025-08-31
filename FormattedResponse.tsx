import { useState } from 'react';
import { Json } from './database.types';

interface FormattedResponseProps {
  output: Json | null;
}

const extractLlmContent = (output: Json | null): string | null => {
  if (
    !output ||
    typeof output !== 'object' ||
    !('choices' in output) ||
    !Array.isArray(output.choices) ||
    output.choices.length === 0
  ) {
    return null;
  }

  const firstChoice = output.choices[0];
  if (
    !firstChoice ||
    typeof firstChoice !== 'object' ||
    !('message' in firstChoice) ||
    !firstChoice.message ||
    typeof firstChoice.message !== 'object' ||
    !('content' in firstChoice.message) ||
    typeof firstChoice.message.content !== 'string'
  ) {
    return null;
  }

  return firstChoice.message.content;
};

const FormattedResponse = ({ output }: FormattedResponseProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const content = extractLlmContent(output);

  if (!content) {
    return null;
  }

  return (
    <div className="py-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 focus:outline-none text-sm"
      >
        {isExpanded ? 'Hide' : 'Show'} Formatted Response
      </button>
      {isExpanded && (
        <div className="mt-2 whitespace-pre-wrap rounded-md border border-gray-300 bg-white p-3 text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
          {content}
        </div>
      )}
    </div>
  );
};

export default FormattedResponse;