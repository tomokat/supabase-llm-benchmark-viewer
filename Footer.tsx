const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="container mx-auto py-4 px-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} LLM Benchmark Viewer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;