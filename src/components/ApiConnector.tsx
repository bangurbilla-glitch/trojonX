import React, { useState } from 'react';
import { Twitter, MessageSquare, Youtube, Globe, Key, Play, Pause } from 'lucide-react';

const ApiConnector = () => {
  const [connections, setConnections] = useState({
    twitter: { connected: false, streaming: false },
    reddit: { connected: false, streaming: false },
    youtube: { connected: false, streaming: false }
  });

  const [apiKeys, setApiKeys] = useState({
    twitter: '',
    reddit: '',
    youtube: ''
  });

  const platforms = [
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: Twitter,
      description: 'Connect to Twitter API v2 for real-time tweet analysis',
      keyLabel: 'Bearer Token',
      color: 'blue'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: MessageSquare,
      description: 'Analyze Reddit posts and comments from specified subreddits',
      keyLabel: 'API Key',
      color: 'orange'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      description: 'Monitor YouTube comments and community posts',
      keyLabel: 'API Key',
      color: 'red'
    }
  ];

  const handleConnect = (platformId: string) => {
    setConnections(prev => ({
      ...prev,
      [platformId]: { ...prev[platformId], connected: !prev[platformId].connected }
    }));
  };

  const toggleStreaming = (platformId: string) => {
    setConnections(prev => ({
      ...prev,
      [platformId]: { ...prev[platformId], streaming: !prev[platformId].streaming }
    }));
  };

  const getColorClasses = (color: string) => {
    const classes = {
      blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-700',
      orange: 'text-orange-600 bg-orange-100 dark:bg-orange-900 border-orange-200 dark:border-orange-700',
      red: 'text-red-600 bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-700'
    };
    return classes[color] || classes.blue;
  };

  return (
    <div className="space-y-6">
      {/* API Connections */}
      <div className="grid gap-6">
        {platforms.map((platform) => {
          const connection = connections[platform.id];
          const apiKey = apiKeys[platform.id];
          
          return (
            <div key={platform.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${getColorClasses(platform.color)}`}>
                    <platform.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {platform.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {platform.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {connection.connected && (
                    <button
                      onClick={() => toggleStreaming(platform.id)}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                        connection.streaming
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      }`}
                    >
                      {connection.streaming ? (
                        <>
                          <Pause className="h-3 w-3" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3" />
                          <span>Start</span>
                        </>
                      )}
                    </button>
                  )}
                  
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    connection.connected
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {connection.connected ? 'Connected' : 'Disconnected'}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Key className="inline h-4 w-4 mr-1" />
                    {platform.keyLabel}
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKeys(prev => ({
                        ...prev,
                        [platform.id]: e.target.value
                      }))}
                      placeholder={`Enter your ${platform.name} ${platform.keyLabel.toLowerCase()}`}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                      onClick={() => handleConnect(platform.id)}
                      disabled={!apiKey.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      {connection.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>

                {connection.connected && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Collection Settings
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {platform.id === 'twitter' && (
                        <>
                          <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">Keywords</label>
                            <input
                              type="text"
                              placeholder="Enter keywords (comma separated)"
                              className="w-full rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">Rate Limit</label>
                            <select className="w-full rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm">
                              <option>100 tweets/min</option>
                              <option>500 tweets/min</option>
                              <option>1000 tweets/min</option>
                            </select>
                          </div>
                        </>
                      )}
                      {platform.id === 'reddit' && (
                        <>
                          <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">Subreddits</label>
                            <input
                              type="text"
                              placeholder="r/india, r/worldnews"
                              className="w-full rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">Post Limit</label>
                            <select className="w-full rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm">
                              <option>25 posts</option>
                              <option>50 posts</option>
                              <option>100 posts</option>
                            </select>
                          </div>
                        </>
                      )}
                      {platform.id === 'youtube' && (
                        <>
                          <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">Video IDs</label>
                            <input
                              type="text"
                              placeholder="Enter YouTube video IDs"
                              className="w-full rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">Comment Depth</label>
                            <select className="w-full rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm">
                              <option>Top level only</option>
                              <option>Include replies</option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Streaming Status */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">Real-time Monitoring</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {Object.values(connections).filter(c => c.streaming).length} platform(s) actively streaming
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-blue-900 dark:text-blue-100">2,347</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Posts collected today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiConnector;