interface HeaderProps {
  onMenuClick: () => void;
  dateRange: { from: string; to: string };
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header = ({ onMenuClick, dateRange, onDateChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/75 px-4 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-800/75 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="mr-4 p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:hidden"
          aria-label="Open sidebar"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="text-xl font-bold text-gray-900 dark:text-white">LLM Benchmarks</div>
      </div>
      <div className="flex items-center gap-x-2 sm:gap-x-4">
        <div className="flex items-center gap-2">
          <label htmlFor="from-date" className="hidden text-sm font-medium text-gray-600 dark:text-gray-400 sm:block">From:</label>
          <input
            type="date" id="from-date" name="from" value={dateRange.from} onChange={onDateChange}
            className="block w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="to-date" className="hidden text-sm font-medium text-gray-600 dark:text-gray-400 sm:block">To:</label>
          <input
            type="date" id="to-date" name="to" value={dateRange.to} onChange={onDateChange}
            className="block w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-indigo-500"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;