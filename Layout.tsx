import { useState, ReactNode } from 'react';
import Header from './Header';
import Sidenav from './Sidenav';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
  dateRange: { from: string; to: string };
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Layout = ({ children, currentView, onNavigate, dateRange, onDateChange }: LayoutProps) => {
  const [isSidenavOpen, setSidenavOpen] = useState(false);

  const toggleSidenav = () => {
    setSidenavOpen(!isSidenavOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <Header onMenuClick={toggleSidenav} dateRange={dateRange} onDateChange={onDateChange} />
      <div className="flex flex-1">
        <Sidenav isOpen={isSidenavOpen} onClose={() => setSidenavOpen(false)} currentView={currentView} onNavigate={onNavigate} />
        <main className="container mx-auto w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;