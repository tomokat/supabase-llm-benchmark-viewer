import { Json } from './database.types';

export type UsageData = {
  prompt?: number;
  completion?: number;
  total?: number;
};

export const getUsageData = (output: Json | null): UsageData | null => {
  if (!output || typeof output !== 'object' || output === null || !('usage' in output)) {
    return null;
  }
  const usage = output.usage;
  if (!usage || typeof usage !== 'object' || usage === null) {
    return null;
  }

  const hasTokens = 'prompt_tokens' in usage || 'completion_tokens' in usage || 'total_tokens' in usage;
  if (!hasTokens) return null;

  return {
    prompt: 'prompt_tokens' in usage && typeof usage.prompt_tokens === 'number' ? usage.prompt_tokens : undefined,
    completion: 'completion_tokens' in usage && typeof usage.completion_tokens === 'number' ? usage.completion_tokens : undefined,
    total: 'total_tokens' in usage && typeof usage.total_tokens === 'number' ? usage.total_tokens : undefined,
  };
};