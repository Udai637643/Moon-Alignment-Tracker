import { MoonData } from '../types';

const locations = [
  'New York',
  'London',
  'Tokyo',
  'Sydney',
  'Paris',
  'Berlin',
  'Moscow',
  'Dubai',
  'Singapore',
  'Cairo',
];

const generateRandomAngle = () => Math.random() * 360;
const generateRandomVisibility = () => Math.random();

export const generateMockData = (
  startDate: Date,
  endDate: Date
): MoonData[] => {
  const data: MoonData[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    // Generate data for each location
    locations.forEach(location => {
      // Generate 24 data points per day (hourly)
      for (let hour = 0; hour < 24; hour++) {
        const timestamp = new Date(currentDate);
        timestamp.setHours(hour);

        data.push({
          timestamp: timestamp.toISOString(),
          location,
          moonAngle: generateRandomAngle(),
          visibility: generateRandomVisibility(),
        });
      }
    });

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
}; 