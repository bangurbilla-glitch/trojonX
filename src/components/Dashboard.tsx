import React from 'react';
import { Shield, TrendingUp, AlertTriangle, Users, Activity, Globe } from 'lucide-react';
import StatsCard from './StatsCard';
import AnalyticsChart from './AnalyticsChart';
import RecentAnalysis from './RecentAnalysis';
import ThreatIndicators from './ThreatIndicators';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Posts Analyzed',
      value: '24,589',
      change: '+12%',
      changeType: 'increase',
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'Suspicious Activity Detected',
      value: '1,247',
      change: '-8%',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Coordinated Campaigns',
      value: '34',
      change: '+3',
      changeType: 'increase',
      icon: Users,
      color: 'orange'
    },
    {
      title: 'Languages Supported',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: Globe,
      color: 'green'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <Shield className="h-12 w-12" />
          <div>
            <h1 className="text-3xl font-bold">Content Analysis Dashboard</h1>
            <p className="text-blue-100 mt-2">
              Real-time monitoring and analysis of digital content for coordinated campaigns
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Analysis Trends
          </h3>
          <AnalyticsChart />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Threat Indicators
          </h3>
          <ThreatIndicators />
        </div>
      </div>

      {/* Recent Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Analysis Results
        </h3>
        <RecentAnalysis />
      </div>
    </div>
  );
};

export default Dashboard;