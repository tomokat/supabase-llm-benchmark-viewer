import TableView from './TableView';

function App() {
  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">LLM Usage Benchmarks</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Displaying results from the <code>llm_usage_benchmark</code> table in Supabase.
          </p>
        </header>
        <TableView />
      </main>
    </div>
  );
}

export default App;