import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import MapComponent from './components/MapComponent';
import DateRangePicker from './components/DateRangePicker';
import MoonDataTable from './components/MoonDataTable';
import { processMoonData } from './utils/mapReduce';
import { generateMockData } from './utils/mockData';
import { MoonData } from './types';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  const [moonData, setMoonData] = useState<MoonData[]>([]);
  const [processedData, setProcessedData] = useState<MoonData[]>([]);

  useEffect(() => {
    // Generate mock data
    const mockData = generateMockData(dateRange.startDate, dateRange.endDate);
    setMoonData(mockData);

    // Process data using MapReduce
    const processed = processMoonData(mockData);
    setProcessedData(processed);
  }, [dateRange]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-800 min-h-screen">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Moon Alignment Tracker
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <DateRangePicker
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  onDateChange={setDateRange}
                />
                <MapComponent moonData={processedData} />
              </div>
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <MoonDataTable data={processedData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
