import React from 'react';
import { AlertTriangle, Shield, TrendingUp } from 'lucide-react';

const ThreatIndicators = () => {
  const indicators = [
    {
      label: 'Coordinated Posting Patterns',
      value: 'High',
      level: 'high',
      description: 'Similar timing and content patterns detected',
      icon: TrendingUp
    },
    {
      label: 'Bot Activity Score',
      value: 'Medium',
      level: 'medium',
      description: 'Automated behavior indicators present',
      icon: AlertTriangle
    },
    {
      label: 'Content Authenticity',
      value: 'Low Risk',
      level: 'low',
      description: 'Most content appears genuine',
      icon: Shield
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      case 'medium': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-400';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className={`p-2 rounded-lg ${getLevelColor(indicator.level)}`}>
            <indicator.icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {indicator.label}
              </h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(indicator.level)}`}>
                {indicator.value}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {indicator.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreatIndicators;