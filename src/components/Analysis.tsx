import React, { useState } from 'react';
import { Search, Filter, Download, Eye, AlertTriangle, TrendingUp } from 'lucide-react';
import AnalysisResults from './AnalysisResults';
import ContentViewer from './ContentViewer';

const Analysis = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const filters = [
    { id: 'all', label: 'All Content', count: 15247 },
    { id: 'harmful', label: 'Harmful Content', count: 342 },
    { id: 'coordinated', label: 'Coordinated Activity', count: 89 },
    { id: 'neutral', label: 'Neutral Content', count: 14816 }
  ];

  const getFilterColor = (id: string, isActive: boolean) => {
    const colors = {
      all: isActive ? 'bg-blue-100 text-blue-700 border-blue-300' : 'text-gray-700 border-gray-300',
      harmful: isActive ? 'bg-red-100 text-red-700 border-red-300' : 'text-gray-700 border-gray-300',
      coordinated: isActive ? 'bg-orange-100 text-orange-700 border-orange-300' : 'text-gray-700 border-gray-300',
      neutral: isActive ? 'bg-green-100 text-green-700 border-green-300' : 'text-gray-700 border-gray-300'
    };
    return colors[id] || colors.all;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Analysis</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Detailed analysis results and content classification
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search content, keywords, or patterns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export Results</span>
            </button>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-3 mt-6">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
                getFilterColor(filter.id, activeFilter === filter.id)
              }`}
            >
              <span className="font-medium">{filter.label}</span>
              <span className="text-sm opacity-75">({filter.count.toLocaleString()})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Risk Content</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">2.3%</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-red-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+0.5% from last week</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Coordination Score</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">0.67</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '67%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Confidence</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">92.4%</p>
            </div>
            <Eye className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-4">
            <div className="text-sm text-green-600 dark:text-green-400">
              Model performing well
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <AnalysisResults 
        filter={activeFilter}
        searchTerm={searchTerm}
        onSelectPost={setSelectedPost}
      />

      {/* Content Viewer Modal */}
      {selectedPost && (
        <ContentViewer
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default Analysis;