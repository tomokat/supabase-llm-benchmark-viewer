import { useState } from 'react';
import Layout from './Layout';
import TableView from './TableView';
import CompareView from './CompareView';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {currentView === 'dashboard' && (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">LLM Usage Benchmarks</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Displaying results from the <code>llm_usage_benchmark</code> table in Supabase.
            </p>
          </div>
          <TableView />
        </>
      )}
      {currentView === 'compare' && (
        <CompareView />
      )}
    </Layout>
  );
}

export default App;