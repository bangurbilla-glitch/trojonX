import React from 'react';

const AnalyticsChart = () => {
  const data = [
    { day: 'Mon', neutral: 120, harmful: 45, coordinated: 12 },
    { day: 'Tue', neutral: 98, harmful: 52, coordinated: 18 },
    { day: 'Wed', neutral: 156, harmful: 38, coordinated: 8 },
    { day: 'Thu', neutral: 143, harmful: 67, coordinated: 25 },
    { day: 'Fri', neutral: 178, harmful: 41, coordinated: 15 },
    { day: 'Sat', neutral: 134, harmful: 59, coordinated: 21 },
    { day: 'Sun', neutral: 112, harmful: 33, coordinated: 9 }
  ];

  const maxValue = Math.max(...data.map(d => d.neutral + d.harmful + d.coordinated));

  return (
    <div className="h-64">
      <div className="flex items-end justify-between h-full space-x-2">
        {data.map((item, index) => {
          const total = item.neutral + item.harmful + item.coordinated;
          const neutralHeight = (item.neutral / maxValue) * 100;
          const harmfulHeight = (item.harmful / maxValue) * 100;
          const coordinatedHeight = (item.coordinated / maxValue) * 100;

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex flex-col w-full h-48 justify-end space-y-1">
                <div 
                  className="bg-red-500 rounded-t-sm"
                  style={{ height: `${coordinatedHeight}%` }}
                  title={`Coordinated: ${item.coordinated}`}
                />
                <div 
                  className="bg-orange-500"
                  style={{ height: `${harmfulHeight}%` }}
                  title={`Harmful: ${item.harmful}`}
                />
                <div 
                  className="bg-blue-500 rounded-b-sm"
                  style={{ height: `${neutralHeight}%` }}
                  title={`Neutral: ${item.neutral}`}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Neutral</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Harmful</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Coordinated</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;