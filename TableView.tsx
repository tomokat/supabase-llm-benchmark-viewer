import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { LlmUsageBenchmark } from './database.types';
import ExpandableRow from './ExpandableRow';
import FormattedResponse from './FormattedResponse';

interface TableViewProps {
  dateRange: { from: string; to: string };
}

const TableView = ({ dateRange }: TableViewProps) => {
  const [benchmarks, setBenchmarks] = useState<LlmUsageBenchmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBenchmarks = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('llm_usage_benchmark')
          .select('*')
          .order('created_at', { ascending: false });

        if (dateRange.from) {
          query = query.gte('created_at', new Date(dateRange.from).toISOString());
        }
        if (dateRange.to) {
          // To make the 'to' date inclusive, set the time to the end of the day.
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          query = query.lte('created_at', toDate.toISOString());
        }

        const { data, error } = await query;

        if (error) throw error;
        setBenchmarks(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBenchmarks();
  }, [dateRange]);

  if (loading) return <div className="text-center p-8 text-gray-500 dark:text-gray-400">Loading data...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">LLM Usage Benchmarks</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Displaying results from the <code>llm_usage_benchmark</code> table in Supabase.
        </p>
        {!loading && !error && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Showing {benchmarks.length} record{benchmarks.length !== 1 ? 's' : ''}.
          </p>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-800">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Created At</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Model</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Scenario</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Latency (ms)</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900 dark:text-white">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {benchmarks.map((row) => (
            <tr key={row.id} className="odd:bg-gray-50 dark:odd:bg-gray-900/50">
              <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-white">{new Date(row.created_at).toLocaleString()}</td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700 dark:text-gray-200">{row.model || 'N/A'}</td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700 dark:text-gray-200">{row.scenario_name || 'N/A'}</td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700 dark:text-gray-200">{row.latency_ms?.toFixed(2) || 'N/A'}</td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700 dark:text-gray-200">
                <ExpandableRow title="Input" data={row.input} />
                <ExpandableRow title="Raw Output" data={row.output} />
                <FormattedResponse output={row.output} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {benchmarks.length === 0 && !loading && (
        <p className="text-center p-8 text-gray-500 dark:text-gray-400">No data found in 'llm_usage_benchmark' table.</p>
      )}
    </div>
    </>
  );
};

export default TableView;