import { useState } from 'react';
import Layout from './Layout';
import TableView from './TableView';
import CompareView from './CompareView';
import SettingsView from './SettingsView';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView} dateRange={dateRange} onDateChange={handleDateChange}>
      {currentView === 'dashboard' && (
        <TableView dateRange={dateRange} />
      )}
      {currentView === 'compare' && (
        <CompareView dateRange={dateRange} />
      )}
      {currentView === 'settings' && (
        <SettingsView />
      )}
    </Layout>
  );
}

export default App;