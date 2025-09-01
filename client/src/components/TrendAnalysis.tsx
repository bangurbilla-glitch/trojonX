import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, BarChart3, Calendar, Filter, 
  Download, RefreshCw, AlertTriangle, Users, Eye 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';

const TrendAnalysis = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [dataType, setDataType] = useState('threats');
  const [isLoading, setIsLoading] = useState(false);

  // Mock trend data
  const threatTrendData = [
    { date: 'Jan 08', threats: 12, campaigns: 3, channels: 45, sentiment: -0.3 },
    { date: 'Jan 09', threats: 18, campaigns: 5, channels: 52, sentiment: -0.5 },
    { date: 'Jan 10', threats: 25, campaigns: 7, channels: 68, sentiment: -0.7 },
    { date: 'Jan 11', threats: 15, campaigns: 4, channels: 41, sentiment: -0.2 },
    { date: 'Jan 12', threats: 22, campaigns: 6, channels: 59, sentiment: -0.6 },
    { date: 'Jan 13', threats: 31, campaigns: 8, channels: 73, sentiment: -0.8 },
    { date: 'Jan 14', threats: 28, campaigns: 7, channels: 65, sentiment: -0.7 },
    { date: 'Jan 15', threats: 35, campaigns: 9, channels: 82, sentiment: -0.9 }
  ];

  const campaignTypeData = [
    { name: 'Disinformation', value: 45, color: '#ef4444' },
    { name: 'Hate Speech', value: 30, color: '#f97316' },
    { name: 'Bot Networks', value: 15, color: '#eab308' },
    { name: 'Cultural Attack', value: 10, color: '#3b82f6' }
  ];

  const platformData = [
    { platform: 'YouTube', threats: 145, reach: '2.3M' },
    { platform: 'Twitter/X', threats: 89, reach: '1.8M' },
    { platform: 'Reddit', threats: 67, reach: '890K' },
    { platform: 'TikTok', threats: 23, reach: '450K' }
  ];

  const sentimentTrendData = [
    { date: 'Jan 08', positive: 25, neutral: 45, negative: 30 },
    { date: 'Jan 09', positive: 20, neutral: 35, negative: 45 },
    { date: 'Jan 10', positive: 15, neutral: 30, negative: 55 },
    { date: 'Jan 11', positive: 22, neutral: 38, negative: 40 },
    { date: 'Jan 12', positive: 18, neutral: 32, negative: 50 },
    { date: 'Jan 13', positive: 12, neutral: 25, negative: 63 },
    { date: 'Jan 14', positive: 16, neutral: 29, negative: 55 },
    { date: 'Jan 15', positive: 10, neutral: 20, negative: 70 }
  ];

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, [timeRange, dataType]);

  const handleExport = () => {
    // Simulate export functionality
    console.log('Exporting trend analysis data...');
  };

  const getTimeRangeOptions = () => [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' }
  ];

  const getDataTypeOptions = () => [
    { value: 'threats', label: 'Threat Levels' },
    { value: 'sentiment', label: 'Sentiment Analysis' },
    { value: 'campaigns', label: 'Campaign Activity' },
    { value: 'channels', label: 'Channel Monitoring' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span>Trend Analysis</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Historical data visualization and pattern analysis for anti-India campaigns
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          >
            {getTimeRangeOptions().map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          >
            {getDataTypeOptions().map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 animate-slide-in-left">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Threats (7d)</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">186</p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-500">+23% vs last week</span>
              </div>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 animate-slide-in-left" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Campaigns</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">49</p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-orange-500">+12% increase</span>
              </div>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 animate-slide-in-left" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Channels Flagged</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">385</p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingDown className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">-8% improvement</span>
              </div>
            </div>
            <Users className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 animate-slide-in-left" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reach</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">5.4M</p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-500">+34% expansion</span>
              </div>
            </div>
            <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Timeline */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 animate-slide-in-left">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Threat Timeline</h3>
            {isLoading && <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={threatTrendData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Legend />
              <Area type="monotone" dataKey="threats" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              <Area type="monotone" dataKey="campaigns" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Types */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 animate-slide-in-right">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Campaign Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campaignTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {campaignTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Sentiment Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={sentimentTrendData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
            <Line type="monotone" dataKey="neutral" stroke="#6b7280" strokeWidth={3} dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }} />
            <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Platform Analysis */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 animate-slide-in-up">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Platform-wise Threat Distribution</h3>
        <div className="space-y-4">
          {platformData.map((platform, index) => (
            <div key={platform.platform} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-medium text-gray-900 dark:text-white">{platform.platform}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Reach: {platform.reach}</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">{platform.threats} threats</div>
                <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${(platform.threats / 145) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;