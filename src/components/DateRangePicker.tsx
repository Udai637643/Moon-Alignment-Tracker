import React from 'react';
import { format } from 'date-fns';
import { DateRange } from '../types';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (range: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateChange,
}) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange({
      startDate: new Date(e.target.value),
      endDate,
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange({
      startDate,
      endDate: new Date(e.target.value),
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Select Date Range
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={format(startDate, 'yyyy-MM-dd')}
            onChange={handleStartDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={format(endDate, 'yyyy-MM-dd')}
            onChange={handleEndDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker; 