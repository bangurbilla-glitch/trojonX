import React from 'react';
import { Eye, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface AnalysisResultsProps {
  filter: string;
  searchTerm: string;
  onSelectPost: (post: any) => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ filter, searchTerm, onSelectPost }) => {
  const mockData = [
    {
      id: '1',
      content: 'This is misleading information about recent events spreading rapidly across platforms...',
      platform: 'Twitter',
      timestamp: '2024-01-15 14:22:33',
      classification: 'harmful',
      confidence: 94.2,
      language: 'English',
      engagement: 1247,
      author: '@user123',
      coordinationScore: 0.85
    },
    {
      id: '2',
      content: 'Regular discussion about current affairs and policy matters in the region...',
      platform: 'Reddit',
      timestamp: '2024-01-15 13:45:12',
      classification: 'neutral',
      confidence: 89.7,
      language: 'English',
      engagement: 56,
      author: 'reddit_user456',
      coordinationScore: 0.12
    },
    {
      id: '3',
      content: 'समान समय पर समान सामग्री पोस्ट करने का संदिग्ध पैटर्न...',
      platform: 'YouTube',
      timestamp: '2024-01-15 12:18:45',
      classification: 'coordinated',
      confidence: 91.8,
      language: 'Hindi',
      engagement: 324,
      author: 'channel789',
      coordinationScore: 0.92
    },
    {
      id: '4',
      content: 'Normal conversation about everyday topics and local community matters...',
      platform: 'Twitter',
      timestamp: '2024-01-15 11:55:20',
      classification: 'neutral',
      confidence: 96.1,
      language: 'English',
      engagement: 23,
      author: '@localuser',
      coordinationScore: 0.08
    },
    {
      id: '5',
      content: 'Anti-establishment rhetoric with inflammatory language targeting specific groups...',
      platform: 'Reddit',
      timestamp: '2024-01-15 10:33:15',
      classification: 'harmful',
      confidence: 88.4,
      language: 'English',
      engagement: 789,
      author: 'anonymous_account',
      coordinationScore: 0.67
    }
  ];

  const getClassificationBadge = (classification: string, confidence: number) => {
    const badges = {
      harmful: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Harmful ({confidence}%)
        </span>
      ),
      coordinated: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
          <Clock className="w-3 h-3 mr-1" />
          Coordinated ({confidence}%)
        </span>
      ),
      neutral: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Neutral ({confidence}%)
        </span>
      )
    };
    return badges[classification] || badges.neutral;
  };

  const getPlatformIcon = (platform: string) => {
    // Return platform icon based on platform name
    return <ExternalLink className="w-4 h-4" />;
  };

  const getCoordinationLevel = (score: number) => {
    if (score > 0.8) return { level: 'High', color: 'text-red-600' };
    if (score > 0.5) return { level: 'Medium', color: 'text-orange-600' };
    return { level: 'Low', color: 'text-green-600' };
  };

  const filteredData = mockData.filter(item => {
    const matchesFilter = filter === 'all' || item.classification === filter;
    const matchesSearch = !searchTerm || 
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Analysis Results ({filteredData.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Classification
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Coordination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Engagement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map((item) => {
              const coordination = getCoordinationLevel(item.coordinationScore);
              
              return (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <div className="max-w-md">
                      <p className="text-sm text-gray-900 dark:text-white truncate">
                        {item.content}
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.author}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.timestamp}
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
                          {item.language}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getClassificationBadge(item.classification, item.confidence)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getPlatformIcon(item.platform)}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.platform}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${coordination.color}`}>
                        {coordination.level}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({item.coordinationScore.toFixed(2)})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.engagement.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onSelectPost(item)}
                      className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View Details</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No results found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;