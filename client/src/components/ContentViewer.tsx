import React from 'react';
import { X, Calendar, User, BarChart3, AlertTriangle, TrendingUp } from 'lucide-react';

interface ContentViewerProps {
  post: any;
  onClose: () => void;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ post, onClose }) => {
  const analysisMetrics = [
    { label: 'Sentiment Score', value: '0.23', description: 'Negative sentiment detected' },
    { label: 'Toxicity Level', value: '0.78', description: 'High toxicity indicators' },
    { label: 'Bot Probability', value: '0.15', description: 'Low likelihood of bot activity' },
    { label: 'Virality Score', value: '0.89', description: 'High potential for viral spread' }
  ];

  const relatedPatterns = [
    'Similar posting times across multiple accounts',
    'Identical hashtag usage patterns',
    'Coordinated engagement behavior',
    'Cross-platform content amplification'
  ];

  const getScoreColor = (value: string) => {
    const numValue = parseFloat(value);
    if (numValue > 0.7) return 'text-red-600';
    if (numValue > 0.4) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Content Analysis Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Content Display */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Original Content</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {post.content}
            </p>
            
            <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{post.timestamp}</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="h-4 w-4" />
                <span>{post.engagement.toLocaleString()} interactions</span>
              </div>
            </div>
          </div>

          {/* Classification & Confidence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Classification Results</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Primary Classification</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    post.classification === 'harmful' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    post.classification === 'coordinated' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {post.classification.charAt(0).toUpperCase() + post.classification.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Confidence Score</span>
                  <span className="font-bold text-gray-900 dark:text-white">{post.confidence}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Language Detected</span>
                  <span className="text-gray-900 dark:text-white">{post.language}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Coordination Analysis</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Coordination Score</span>
                  <span className={`font-bold ${getScoreColor(post.coordinationScore.toString())}`}>
                    {post.coordinationScore.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${post.coordinationScore * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {post.coordinationScore > 0.8 ? 'High coordination likelihood' :
                   post.coordinationScore > 0.5 ? 'Moderate coordination indicators' :
                   'Low coordination probability'}
                </p>
              </div>
            </div>
          </div>

          {/* Analysis Metrics */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Detailed Analysis Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {metric.label}
                    </span>
                    <span className={`font-bold ${getScoreColor(metric.value)}`}>
                      {metric.value}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Patterns */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">
              <AlertTriangle className="inline h-5 w-5 mr-2 text-orange-500" />
              Detected Patterns
            </h3>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <ul className="space-y-2">
                {relatedPatterns.map((pattern, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-orange-800 dark:text-orange-200">{pattern}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Flag for Review
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentViewer;