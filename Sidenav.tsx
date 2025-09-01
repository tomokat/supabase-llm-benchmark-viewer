interface SidenavProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

const Sidenav = ({ isOpen, onClose, currentView, onNavigate }: SidenavProps) => {
  const handleNavClick = (view: string) => {
    onNavigate(view);
    onClose(); // Automatically close sidenav on mobile after navigation
  };

  const navItemClasses = "block rounded-lg px-4 py-2 text-sm font-medium";
  const activeClasses = "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
  const inactiveClasses = "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200";

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-30 bg-black/30 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <aside
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 transform self-start border-r border-gray-200 bg-white transition-transform dark:border-gray-700 dark:bg-gray-800 md:sticky md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Navigation</h2>
          <nav className="mt-4">
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleNavClick('dashboard'); }}
                  className={`${navItemClasses} ${currentView === 'dashboard' ? activeClasses : inactiveClasses}`}
                >
                  Dashboard
                </a>
              </li>
              <li className="mt-1">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleNavClick('compare'); }}
                  className={`${navItemClasses} ${currentView === 'compare' ? activeClasses : inactiveClasses}`}
                >
                  Compare
                </a>
              </li>
              <li className="mt-1">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleNavClick('settings'); }}
                  className={`${navItemClasses} ${currentView === 'settings' ? activeClasses : inactiveClasses}`}
                >
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidenav;