import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { LlmUsageBenchmark } from './database.types';
import { getUsageData, UsageData } from './utils';

interface RunChartsProps {
    records: LlmUsageBenchmark[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const RunCharts = ({ records }: RunChartsProps) => {
    const chartData = useMemo(() => {
        const groupedByModel = records.reduce((acc, record) => {
            if (record.model) {
                if (!acc[record.model]) {
                    acc[record.model] = [];
                }
                acc[record.model].push(record);
            }
            return acc;
        }, {} as Record<string, LlmUsageBenchmark[]>);

        return Object.entries(groupedByModel).map(([model, modelRecords]) => {
            const latencies = modelRecords.map(r => r.latency_ms).filter((l): l is number => l !== null);
            const avgLatency = latencies.length > 0 ? latencies.reduce((s, l) => s + l, 0) / latencies.length : 0;

            const allUsages = modelRecords.map(r => getUsageData(r.output)).filter((u): u is UsageData => u !== null);
            
            const promptTokens = allUsages.map(u => u.prompt || 0);
            const completionTokens = allUsages.map(u => u.completion || 0);

            const avgPromptTokens = promptTokens.length > 0 ? promptTokens.reduce((s, t) => s + t, 0) / promptTokens.length : 0;
            const avgCompletionTokens = completionTokens.length > 0 ? completionTokens.reduce((s, t) => s + t, 0) / completionTokens.length : 0;

            return {
                model,
                'Latency (ms)': avgLatency,
                'Prompt Tokens': avgPromptTokens,
                'Completion Tokens': avgCompletionTokens,
            };
        });
    }, [records]);

    if (chartData.length === 0) {
        return null;
    }

    const tooltipStyle = {
        backgroundColor: 'rgba(31, 41, 55, 0.9)', // bg-gray-800 with opacity
        borderColor: 'rgba(75, 85, 99, 0.9)', // border-gray-600 with opacity
        color: '#fff',
        borderRadius: '0.5rem'
    };

    return (
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
                <h4 className="text-md mb-4 font-semibold text-gray-800 dark:text-gray-100">Latency by Model</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
                        <XAxis dataKey="model" tick={{ fill: 'currentColor', fontSize: 12 }} />
                        <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} unit="ms" />
                        <Tooltip cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }} contentStyle={tooltipStyle} />
                        <Bar dataKey="Latency (ms)">
                            {chartData.map((_entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div>
                <h4 className="text-md mb-4 font-semibold text-gray-800 dark:text-gray-100">Token Usage by Model</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
                        <XAxis dataKey="model" tick={{ fill: 'currentColor', fontSize: 12 }} />
                        <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} />
                        <Tooltip cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }} contentStyle={tooltipStyle} />
                        <Legend wrapperStyle={{ fontSize: '14px' }} />
                        <Bar dataKey="Prompt Tokens" stackId="a" fill="#8884d8" />
                        <Bar dataKey="Completion Tokens" stackId="a" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RunCharts;