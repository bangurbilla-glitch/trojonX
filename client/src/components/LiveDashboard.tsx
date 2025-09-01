import React, { useState, useEffect } from 'react';
import { 
  Shield, AlertTriangle, TrendingUp, Users, Clock, RefreshCw, 
  Activity, Target, Eye, Zap, CheckCircle, XCircle, Bell 
} from 'lucide-react';

const LiveDashboard = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock real-time data - in production this would come from WebSocket or API polling
  const [threatData, setThreatData] = useState({
    activeCampaigns: 5,
    channelsMonitored: 1247,
    alertsToday: 23,
    threatLevel: 'High',
    avgResponseTime: '2.3m',
    systemStatus: 'Online'
  });

  const [recentAlerts] = useState([
    {
      id: 1,
      type: 'high',
      title: 'Coordinated Anti-India Campaign Detected',
      description: 'New network of 12 channels spreading misinformation about India\'s economic policies',
      time: '2 minutes ago',
      channels: 12,
      reach: '850K',
      status: 'investigating'
    },
    {
      id: 2,
      type: 'medium',
      title: 'Suspicious Hashtag Trending',
      description: '#IndiaFailing gaining artificial traction across multiple platforms',
      time: '8 minutes ago',
      channels: 6,
      reach: '320K',
      status: 'monitoring'
    },
    {
      id: 3,
      type: 'resolved',
      title: 'Bot Network Neutralized',
      description: 'Successfully flagged and reported coordinated bot activity',
      time: '15 minutes ago',
      channels: 23,
      reach: '1.2M',
      status: 'resolved'
    },
    {
      id: 4,
      type: 'low',
      title: 'Cultural Appropriation Content',
      description: 'Increased negative sentiment around Hindu festivals',
      time: '32 minutes ago',
      channels: 4,
      reach: '180K',
      status: 'reviewing'
    }
  ]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const refreshData = async () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update timestamp and simulate slight data changes
    setLastUpdate(new Date());
    setThreatData(prev => ({
      ...prev,
      activeCampaigns: Math.max(1, prev.activeCampaigns + Math.floor(Math.random() * 3) - 1),
      alertsToday: prev.alertsToday + Math.floor(Math.random() * 2)
    }));
    
    setIsRefreshing(false);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'high': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low': return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case 'resolved': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBgColor = (type: string) => {
    switch (type) {
      case 'high': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700';
      case 'medium': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700';
      case 'low': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
      case 'resolved': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
      default: return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
            <Activity className="h-8 w-8 text-red-600 dark:text-red-400 animate-pulse" />
            <span>Live Threat Dashboard</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Real-time monitoring of anti-India campaigns and coordinated threats
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Auto-refresh</span>
          </label>
          
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-in-left">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Threat Level</p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getThreatLevelColor(threatData.threatLevel)}`}>
                {threatData.threatLevel}
              </div>
            </div>
            <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-in-left" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Campaigns</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 animate-number-change">{threatData.activeCampaigns}</p>
            </div>
            <Target className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-in-left" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Channels Monitored</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 animate-number-change">{threatData.channelsMonitored.toLocaleString()}</p>
            </div>
            <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-in-left" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Alerts Today</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 animate-number-change">{threatData.alertsToday}</p>
            </div>
            <Bell className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      {/* System Status Bar */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-slide-in-right">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">System Status: {threatData.systemStatus}</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Avg Response Time: {threatData.avgResponseTime}
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Zap className="h-4 w-4" />
            <span>Real-time monitoring active</span>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <span>Recent Threat Alerts</span>
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentAlerts.map((alert, index) => (
            <div 
              key={alert.id} 
              className={`p-6 border-l-4 ${getAlertBgColor(alert.type)} hover:shadow-md transition-all duration-300 animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{alert.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.time}</span>
                      </span>
                      <span>Channels: {alert.channels}</span>
                      <span>Reach: {alert.reach}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    alert.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    alert.status === 'investigating' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    alert.status === 'monitoring' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                  }`}>
                    {alert.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 animate-slide-in-up">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Run Emergency Scan</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
            <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Alert Response Team</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
            <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Generate Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;