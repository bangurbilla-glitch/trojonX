import React from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const RecentAnalysis = () => {
  const analyses = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:22',
      source: 'Twitter Dataset',
      postsAnalyzed: 1247,
      threats: 34,
      status: 'completed',
      confidence: 92
    },
    {
      id: '2',
      timestamp: '2024-01-15 13:15:11',
      source: 'Reddit Comments',
      postsAnalyzed: 856,
      threats: 12,
      status: 'completed',
      confidence: 88
    },
    {
      id: '3',
      timestamp: '2024-01-15 12:45:33',
      source: 'YouTube Comments',
      postsAnalyzed: 2134,
      threats: 67,
      status: 'processing',
      confidence: null
    },
    {
      id: '4',
      timestamp: '2024-01-15 11:20:45',
      source: 'Custom Upload',
      postsAnalyzed: 445,
      threats: 8,
      status: 'completed',
      confidence: 95
    },
    {
      id: '5',
      timestamp: '2024-01-15 10:05:12',
      source: 'Twitter Dataset',
      postsAnalyzed: 789,
      threats: 0,
      status: 'failed',
      confidence: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'processing': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'failed': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getThreatLevel = (threats: number, total: number) => {
    const percentage = (threats / total) * 100;
    if (percentage > 10) return 'high';
    if (percentage > 5) return 'medium';
    return 'low';
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
              Timestamp
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
              Source
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
              Posts Analyzed
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
              Threats Detected
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
              Confidence
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {analyses.map((analysis) => (
            <tr key={analysis.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                {analysis.timestamp}
              </td>
              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">
                {analysis.source}
              </td>
              <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                {analysis.postsAnalyzed.toLocaleString()}
              </td>
              <td className="py-4 px-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className={getThreatColor(getThreatLevel(analysis.threats, analysis.postsAnalyzed))}>
                    {analysis.threats}
                  </span>
                  {analysis.threats > 0 && (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                {analysis.confidence ? `${analysis.confidence}%` : '-'}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(analysis.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(analysis.status)}`}>
                    {analysis.status.charAt(0).toUpperCase() + analysis.status.slice(1)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentAnalysis;