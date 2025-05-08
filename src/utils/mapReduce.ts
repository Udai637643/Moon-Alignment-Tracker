import { MoonData } from '../types';

// Map function: Extract relevant moon data by date and location
const map = (data: MoonData[]) => {
  return data.map(item => ({
    ...item,
    date: new Date(item.timestamp).toISOString().split('T')[0],
  }));
};

// Reduce function: Aggregate alignment events
const reduce = (mappedData: (MoonData & { date: string })[]) => {
  const groupedByDate = mappedData.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, (MoonData & { date: string })[]>);

  // Process each day's data to find alignment events
  return Object.entries(groupedByDate).flatMap(([date, items]) => {
    // Find locations with similar moon angles (within 5 degrees)
    const alignments = items.reduce((acc, item) => {
      const similarAngles = items.filter(
        other => Math.abs(other.moonAngle - item.moonAngle) < 5
      );
      
      if (similarAngles.length > 1) {
        acc.push({
          timestamp: item.timestamp,
          location: item.location,
          moonAngle: item.moonAngle,
          visibility: item.visibility,
          alignedLocations: similarAngles.map(a => a.location),
        });
      }
      return acc;
    }, [] as (MoonData & { alignedLocations: string[] })[]);

    return alignments;
  });
};

// Main MapReduce function
export const processMoonData = (data: MoonData[]): MoonData[] => {
  const mappedData = map(data);
  return reduce(mappedData);
}; 