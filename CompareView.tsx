import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { LlmUsageBenchmark } from './database.types';
import ExpandableRow from './ExpandableRow';
import TokenUsageDisplay from './TokenUsageDisplay';
import RunCharts from './RunCharts';

type RunGroup = {
  runId: string;
  models: string[];
  scenarios: number;
  avgLatency: number | null;
  records: LlmUsageBenchmark[];
};

const CompareView = () => {
  const [runGroups, setRunGroups] = useState<RunGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndGroupBenchmarks = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('llm_usage_benchmark')
          .select('*')
          .not('run_id', 'is', null) // Only fetch rows that are part of a run
          .order('created_at', { ascending: false });

        if (error) throw error;

        const groupedByRunId = (data || []).reduce((acc, record) => {
          if (record.run_id) {
            if (!acc[record.run_id]) {
              acc[record.run_id] = [];
            }
            acc[record.run_id].push(record);
          }
          return acc;
        }, {} as Record<string, LlmUsageBenchmark[]>);

        const processedGroups: RunGroup[] = Object.entries(groupedByRunId).map(([runId, records]) => {
          const latencies = records.map(r => r.latency_ms).filter((l): l is number => l !== null);
          const totalLatency = latencies.reduce((sum, l) => sum + l, 0);
          const avgLatency = latencies.length > 0 ? totalLatency / latencies.length : null;
          const models = [...new Set(records.map(r => r.model).filter((m): m is string => m !== null))];

          return {
            runId,
            models,
            scenarios: records.length,
            avgLatency,
            records,
          };
        });

        setRunGroups(processedGroups);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching data for comparison: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndGroupBenchmarks();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compare Benchmark Runs</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Grouped results by <code>run_id</code> to compare performance across different scenarios.
        </p>
      </div>

      {loading && <div className="text-center p-8 text-gray-500 dark:text-gray-400">Loading comparison data...</div>}
      {error && <div className="text-center p-8 text-red-500">Error: {error}</div>}

      {!loading && !error && (
        <div className="space-y-6">
          {runGroups.length > 0 ? (
            runGroups.map(group => (
              <div key={group.runId} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Run ID: <code className="text-sm">{group.runId}</code></h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Models</p><p className="mt-1 text-gray-900 dark:text-white">{group.models.join(', ') || 'N/A'}</p></div>
                  <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Scenarios</p><p className="mt-1 text-gray-900 dark:text-white">{group.scenarios}</p></div>
                  <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Latency</p><p className="mt-1 text-gray-900 dark:text-white">{group.avgLatency ? `${group.avgLatency.toFixed(2)} ms` : 'N/A'}</p></div>
                </div>
                <RunCharts records={group.records} />
                <div className="mt-8">
                  <h4 className="text-md mb-3 font-semibold text-gray-800 dark:text-gray-100">Scenario Breakdown</h4>
                  <div className="-mx-6 px-6">
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                      {group.records.map(record => (
                        <div key={record.id} className="flex-1 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50 min-w-[18rem]">
                          <h5 className="truncate font-semibold text-gray-900 dark:text-white" title={record.scenario_name || 'Untitled'}>{record.scenario_name || 'Untitled Scenario'}</h5>
                          <div className="mt-4 space-y-3">
                            <div>
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Model</p>
                              <p className="text-sm text-gray-900 dark:text-white">{record.model || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Latency</p>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{record.latency_ms ? `${record.latency_ms.toFixed(2)} ms` : 'N/A'}</p>
                            </div>
                            <TokenUsageDisplay output={record.output} />
                            <ExpandableRow title="Output" data={record.output} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center p-8 text-gray-500 dark:text-gray-400">No benchmark runs found with a 'run_id'.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompareView;