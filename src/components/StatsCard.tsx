import React from 'react';
import { TrendingUp, TrendingDown, DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
  color: 'blue' | 'red' | 'orange' | 'green';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color
}) => {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900',
    red: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900',
    orange: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900',
    green: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          changeType === 'increase' ? 'text-green-600' : 'text-red-600'
        }`}>
          {changeType === 'increase' ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
      
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;