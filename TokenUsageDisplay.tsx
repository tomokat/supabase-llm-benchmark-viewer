import { Json } from './database.types';
import { getUsageData } from './utils';

interface TokenUsageDisplayProps {
  output: Json | null;
}

const TokenUsageDisplay = ({ output }: TokenUsageDisplayProps) => {
  const usageData = getUsageData(output);

  if (!usageData) return null;

  return (
    <div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Token Usage</p>
      <table className="mt-1 w-full text-sm">
        <tbody>
          <tr className="border-t border-gray-200 dark:border-gray-700"><td className="py-1 pr-2 text-gray-600 dark:text-gray-300">Prompt</td><td className="py-1 text-right font-medium text-gray-900 dark:text-white">{usageData.prompt ?? 'N/A'}</td></tr>
          <tr className="border-t border-gray-200 dark:border-gray-700"><td className="py-1 pr-2 text-gray-600 dark:text-gray-300">Completion</td><td className="py-1 text-right font-medium text-gray-900 dark:text-white">{usageData.completion ?? 'N/A'}</td></tr>
          <tr className="border-t border-gray-200 dark:border-gray-700"><td className="py-1 pr-2 font-semibold text-gray-600 dark:text-gray-300">Total</td><td className="py-1 text-right font-bold text-gray-900 dark:text-white">{usageData.total ?? 'N/A'}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default TokenUsageDisplay;