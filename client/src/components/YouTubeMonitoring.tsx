import React, { useState, useEffect } from 'react';
import { Play, Search, AlertTriangle, TrendingUp, Eye, MessageSquare, ThumbsUp, Clock, BarChart3, Shield, Activity, Hash, Users } from 'lucide-react';

interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  thumbnail: string;
  description: string;
}

interface YouTubeChannel {
  id: string;
  title: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  thumbnail: string;
}

const YouTubeMonitoring = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [channelId, setChannelId] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');
  const [error, setError] = useState('');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    // Load default analysis when component mounts
    if (activeTab === 'analysis' && !analysisData) {
      runDefaultAnalysis();
    }
  }, [activeTab]);

  const formatNumber = (num: string) => {
    const number = parseInt(num);
    if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
    if (number >= 1000) return (number / 1000).toFixed(1) + 'K';
    return number.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const searchVideos = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(searchQuery)}&type=video`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      setVideos(data.items || []);
    } catch (err) {
      setError('Failed to search videos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchChannels = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(searchQuery)}&type=channel`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      setChannels(data.items || []);
    } catch (err) {
      setError('Failed to search channels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getChannelVideos = async () => {
    if (!channelId.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/youtube/channel/${channelId}/videos`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      setVideos(data.items || []);
    } catch (err) {
      setError('Failed to get channel videos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const runDefaultAnalysis = async () => {
    setLoadingAnalysis(true);
    setError('');
    
    try {
      const response = await fetch('/api/youtube/analysis/default');
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      setAnalysisData(data);
    } catch (err) {
      setError('Failed to load analysis data. Please try again.');
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const analyzeContent = async (videoIds: string[]) => {
    if (videoIds.length === 0) return;
    
    setLoadingAnalysis(true);
    setError('');
    
    try {
      const response = await fetch('/api/youtube/analysis/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoIds })
      });
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      setAnalysisData(data);
    } catch (err) {
      setError('Failed to analyze content. Please try again.');
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Play className="h-8 w-8 text-red-600 dark:text-red-400" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">YouTube Monitoring</h1>
            <p className="text-gray-600 dark:text-gray-300">Monitor YouTube content for harmful activities and coordination</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 relative">
          <button
            onClick={() => {
              setActiveTab('analysis');
              if (!analysisData) runDefaultAnalysis();
            }}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'analysis'
                ? 'border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Content Analysis
          </button>
          <button
            onClick={() => setActiveTab('channel')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'channel'
                ? 'border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Channel Analysis
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'search'
                ? 'border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Search Content
          </button>
        </div>
      </div>

      {/* Interface Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {activeTab === 'search' && (
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for videos or channels..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && searchVideos()}
                  data-testid="input-youtube-search"
                />
              </div>
              <button
                onClick={searchVideos}
                disabled={loading}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                data-testid="button-search-videos"
              >
                <Search className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Search Videos</span>
              </button>
              <button
                onClick={searchChannels}
                disabled={loading}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                data-testid="button-search-channels"
              >
                <Search className="h-4 w-4" />
                <span>Search Channels</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'channel' && (
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                  placeholder="Enter YouTube Channel ID or URL..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && getChannelVideos()}
                  data-testid="input-channel-id"
                />
              </div>
              <button
                onClick={getChannelVideos}
                disabled={loading}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                data-testid="button-get-channel-videos"
              >
                <Play className="h-4 w-4" />
                <span>Get Videos</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Content Analysis Dashboard</h3>
              <div className="flex space-x-3">
                <button
                  onClick={runDefaultAnalysis}
                  disabled={loadingAnalysis}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                  data-testid="button-default-analysis"
                >
                  <BarChart3 className={`h-4 w-4 ${loadingAnalysis ? 'animate-pulse' : ''}`} />
                  <span>Default Analysis</span>
                </button>
                {videos.length > 0 && (
                  <button
                    onClick={() => analyzeContent(videos.map(v => v.id))}
                    disabled={loadingAnalysis}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-lg disabled:opacity-50 transition-all duration-300 transform hover:scale-105 animate-slide-in-right flex items-center space-x-2"
                    data-testid="button-analyze-content"
                  >
                    <Shield className={`h-4 w-4 ${loadingAnalysis ? 'animate-pulse' : ''}`} />
                    <span>Analyze Current Results</span>
                  </button>
                )}
              </div>
            </div>

            {loadingAnalysis && (
              <div className="text-center py-8 animate-fade-in" data-testid="analysis-loading">
                <div className="enhanced-spinner inline-block rounded-full h-8 w-8"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-300 animate-pulse">Running analysis...</p>
              </div>
            )}

            {analysisData && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                {/* Sentiment Analysis */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-in-left">
                  <div className="flex items-center space-x-3 mb-4">
                    <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Sentiment Analysis</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Positive</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {analysisData.sentiment?.positive || '0'}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-1000 ease-out animate-width-expand" 
                        style={{ width: `${analysisData.sentiment?.positive || 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Neutral</span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {analysisData.sentiment?.neutral || '0'}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gray-500 h-2 rounded-full" 
                        style={{ width: `${analysisData.sentiment?.neutral || 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Negative</span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        {analysisData.sentiment?.negative || '0'}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${analysisData.sentiment?.negative || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Harmful Content Detection */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Harmful Content</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Hate Speech</span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        {analysisData.harmfulContent?.hateSpeech || '0'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Misinformation</span>
                      <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                        {analysisData.harmfulContent?.misinformation || '0'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Spam Content</span>
                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        {analysisData.harmfulContent?.spam || '0'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coordination Detection */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Coordination</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Bot Activity</span>
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {analysisData.coordination?.botActivity || '0'}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Coordinated Campaigns</span>
                      <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        {analysisData.coordination?.campaigns || '0'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Risk Score</span>
                      <span className={`text-sm font-medium ${
                        (analysisData.coordination?.riskScore || 0) > 70 
                          ? 'text-red-600 dark:text-red-400' 
                          : (analysisData.coordination?.riskScore || 0) > 40 
                            ? 'text-yellow-600 dark:text-yellow-400' 
                            : 'text-green-600 dark:text-green-400'
                      }`}>
                        {analysisData.coordination?.riskScore || '0'}/100
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trending Topics */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 md:col-span-2 lg:col-span-3">
                  <div className="flex items-center space-x-3 mb-4">
                    <Hash className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Trending Topics & Keywords</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(analysisData.trending?.topics || []).map((topic: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                  {analysisData.trending?.keywords && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Terms:</h5>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.trending.keywords.map((keyword: string, index: number) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg flex items-center space-x-2" data-testid="error-message">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <span className="text-red-700 dark:text-red-300">{error}</span>
          </div>
        )}

        {loading && (
          <div className="mt-4 text-center py-8" data-testid="loading-indicator">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        )}
      </div>

      {/* Results */}
      {videos.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Videos ({videos.length})</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <div 
                key={video.id} 
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-xl hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up" 
                style={{ animationDelay: `${index * 100}ms` }}
                data-testid={`video-card-${video.id}`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{video.channelTitle}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{formatNumber(video.viewCount)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{formatNumber(video.likeCount)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{formatNumber(video.commentCount)}</span>
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {channels.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Channels ({channels.length})</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel, index) => (
              <div 
                key={channel.id} 
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up" 
                style={{ animationDelay: `${index * 100}ms` }}
                data-testid={`channel-card-${channel.id}`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={channel.thumbnail}
                    alt={channel.title}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">{channel.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{formatNumber(channel.subscriberCount)} subscribers</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div>
                    <span className="font-medium">Videos:</span> {formatNumber(channel.videoCount)}
                  </div>
                  <div>
                    <span className="font-medium">Views:</span> {formatNumber(channel.viewCount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeMonitoring;