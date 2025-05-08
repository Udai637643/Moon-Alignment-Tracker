import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MoonData } from '../types';

interface MapComponentProps {
  moonData: MoonData[];
}

const MapComponent: React.FC<MapComponentProps> = ({ moonData }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Moon Alignment Visualization
      </h2>
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <LineChart
          width={600}
          height={300}
          data={moonData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="moonAngle"
            stroke="#8884d8"
            name="Moon Angle"
          />
          <Line
            type="monotone"
            dataKey="visibility"
            stroke="#82ca9d"
            name="Visibility"
          />
        </LineChart>
      </div>
    </div>
  );
};

export default MapComponent; 