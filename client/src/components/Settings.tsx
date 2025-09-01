import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Database, Globe, Bell, Users, Lock, AlertTriangle, Check, Clock, HelpCircle, BookOpen, MessageCircle, FileText, Mail, Smartphone, Send, TestTube } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [emailTesting, setEmailTesting] = useState(false);
  const [smsTesting, setSmsTesting] = useState(false);
  const [testResults, setTestResults] = useState<{[key: string]: any}>({});

  const testEmail = async () => {
    setEmailTesting(true);
    try {
      const response = await fetch('/api/notifications/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'security@contentguard.com' // In production, this would be from the form
        })
      });

      const result = await response.json();
      setTestResults(prev => ({ ...prev, email: result }));
      
      if (result.success) {
        console.log('Test email sent successfully');
      }
    } catch (error) {
      console.error('Failed to send test email:', error);
      setTestResults(prev => ({ 
        ...prev, 
        email: { success: false, message: 'Failed to send test email' }
      }));
    } finally {
      setEmailTesting(false);
    }
  };

  const testSMS = async () => {
    setSmsTesting(true);
    try {
      const response = await fetch('/api/notifications/test-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: '+91 9876543210' // In production, this would be from the form
        })
      });

      const result = await response.json();
      setTestResults(prev => ({ ...prev, sms: result }));
      
      if (result.success) {
        console.log('Test SMS sent successfully');
      }
    } catch (error) {
      console.error('Failed to send test SMS:', error);
      setTestResults(prev => ({ 
        ...prev, 
        sms: { success: false, message: 'Failed to send test SMS' }
      }));
    } finally {
      setSmsTesting(false);
    }
  };

  const tabs = [
    { id: 'analysis', label: 'Analysis Settings', icon: Shield },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'languages', label: 'Language Support', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  const renderAnalysisSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Model Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Classification Threshold
            </label>
            <input
              type="range"
              min="0.5"
              max="1"
              step="0.05"
              defaultValue="0.8"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Less Sensitive</span>
              <span>More Sensitive</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Coordination Detection Level
            </label>
            <select className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              <option>Standard</option>
              <option>Enhanced</option>
              <option>Maximum Sensitivity</option>
            </select>
          </div>

          <div>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Enable real-time processing
              </span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Content Filtering</h3>
        <div className="space-y-3">
          {['Hate Speech', 'Misinformation', 'Spam Content', 'Bot Activity', 'Coordinated Campaigns'].map(filter => (
            <label key={filter} className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{filter}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Retention</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Raw Data Retention Period
            </label>
            <select className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              <option>30 days</option>
              <option>90 days</option>
              <option>180 days</option>
              <option>1 year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Analysis Results Retention
            </label>
            <select className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              <option>6 months</option>
              <option>1 year</option>
              <option>2 years</option>
              <option>Indefinitely</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Export Settings</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Include confidence scores in exports
            </span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Include raw content in exports
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderLanguageSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Supported Languages</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            'English', 'Hindi', 'Tamil', 'Bengali', 'Marathi', 'Telugu',
            'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Sanskrit'
          ].map(language => (
            <label key={language} className="flex items-center">
              <input 
                type="checkbox" 
                defaultChecked={['English', 'Hindi'].includes(language)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{language}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Translation Settings</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Auto-translate non-English content
            </span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Preserve original language in analysis
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Alerts - 2025</h3>
        <div className="space-y-4">
          {/* Active Campaign Alert */}
          <div className="border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-102 animate-slide-in-left">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 animate-pulse" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800 dark:text-red-300">
                  High Priority: Anti-India Campaign Detected
                </h4>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  Coordinated disinformation campaign targeting Indian policies detected across 47 YouTube channels. 
                  Campaign involves synchronized posting of misleading content about India's economic and social policies.
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-red-600 dark:text-red-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Jan 15, 2025 - 08:45 AM</span>
                  </span>
                  <span>Channels: 47 | Videos: 234 | Reach: 2.3M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resolved Alert */}
          <div className="border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-102 animate-slide-in-right">
            <div className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 animate-bounce-subtle" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-green-800 dark:text-green-300">
                  Resolved: Anti-India Hashtag Campaign
                </h4>
                <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                  Coordinated hashtag campaign #IndiaFails has been successfully flagged and neutralized. 
                  Network of 23 channels spreading false narratives about India's technological achievements.
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-green-600 dark:text-green-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Jan 12, 2025 - 02:30 PM</span>
                  </span>
                  <span>Action: Content flagged | Channels reported</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Priority Alert */}
          <div className="border border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-102 animate-slide-in-left" style={{ animationDelay: '200ms' }}>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 animate-pulse" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  Medium: Cultural Appropriation Campaign
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  Trend analysis shows increased negative sentiment around Indian cultural practices. 
                  Multiple channels promoting misconceptions about Hindu festivals and traditions.
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Jan 10, 2025 - 11:20 AM</span>
                  </span>
                  <span>Channels: 12 | Engagement: 456K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monitoring Alert */}
          <div className="border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-102 animate-slide-in-right" style={{ animationDelay: '300ms' }}>
            <div className="flex items-start space-x-3">
              <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 animate-ring" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Monitoring: Pro-India Counter-Narrative
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  Positive trend detected: Educational content about India's achievements in space technology 
                  and renewable energy gaining traction. Authentic creator voices promoting factual information.
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-blue-600 dark:text-blue-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Jan 8, 2025 - 09:15 AM</span>
                  </span>
                  <span>Positive sentiment: +78% | Reach: 1.8M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Settings</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Real-time alerts for anti-India campaigns
            </span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Daily digest of threat analysis
            </span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Weekly trend reports
            </span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Email notifications for high-priority threats
            </span>
          </label>
        </div>
      </div>

      {/* Email/SMS Alert Configuration */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Email & SMS Alert Configuration</h3>
        
        {/* Email Settings */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h4 className="text-md font-medium text-gray-900 dark:text-white">Email Alerts</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Email
              </label>
              <input
                type="email"
                defaultValue="security@contentguard.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter primary email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Backup Email
              </label>
              <input
                type="email"
                defaultValue="backup@contentguard.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter backup email"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Enable email alerts for critical threats
              </span>
            </label>
            <button 
              onClick={testEmail}
              disabled={emailTesting}
              className="flex items-center space-x-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
            >
              <TestTube className={`h-4 w-4 ${emailTesting ? 'animate-pulse' : ''}`} />
              <span>{emailTesting ? 'Sending...' : 'Test Email'}</span>
            </button>
            {testResults.email && (
              <div className={`text-xs mt-2 ${testResults.email.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {testResults.email.message}
              </div>
            )}
          </div>
        </div>

        {/* SMS Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-3">
            <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h4 className="text-md font-medium text-gray-900 dark:text-white">SMS Alerts</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+91 9876543210"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Backup Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+91 9876543211"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Enable SMS alerts for high-priority threats only
              </span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Send SMS for emergency escalations (when email fails)
              </span>
            </label>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              SMS powered by secure gateway • Charges may apply
            </div>
            <button 
              onClick={testSMS}
              disabled={smsTesting}
              className="flex items-center space-x-2 px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
            >
              <Send className={`h-4 w-4 ${smsTesting ? 'animate-pulse' : ''}`} />
              <span>{smsTesting ? 'Sending...' : 'Test SMS'}</span>
            </button>
            {testResults.sms && (
              <div className={`text-xs mt-2 ${testResults.sms.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {testResults.sms.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alert Escalation Rules */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Alert Escalation Rules</h3>
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 dark:text-white">High Priority Threats</h4>
              <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium rounded">
                Critical
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Coordinated disinformation campaigns, large-scale bot networks, viral hate content
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Immediate email notification</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">SMS alert within 2 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Escalate to backup contacts if no response in 15 minutes</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 dark:text-white">Medium Priority Threats</h4>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-medium rounded">
                Important
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Suspicious trending patterns, cultural appropriation campaigns, emerging threats
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Email notification within 10 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Include in hourly digest</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 dark:text-white">Low Priority Monitoring</h4>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-medium rounded">
                Watch
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Routine content monitoring, minor sentiment changes, educational content
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Include in daily summary report</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">No immediate notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Campaign Tracking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Threats</span>
              <span className="text-lg font-bold text-red-600 dark:text-red-400 animate-number-change">3</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Currently monitoring</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Resolved This Month</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400 animate-number-change">12</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Successfully addressed</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Channels Monitored</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 animate-number-change">1,247</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Under surveillance</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Detection Accuracy</span>
              <span className="text-lg font-bold text-purple-600 dark:text-purple-400 animate-number-change">94.2%</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">System reliability</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="space-y-8">
      {/* Getting Started */}
      <div className="animate-fade-in">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Getting Started</h3>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Quick Setup Guide</h4>
            <p className="text-sm text-blue-800 dark:text-blue-400 mb-3">
              Learn how to configure ContentGuard for optimal anti-India campaign detection.
            </p>
            <ol className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
              <li>1. Configure your YouTube API key in environment settings</li>
              <li>2. Set analysis thresholds under Analysis Settings</li>
              <li>3. Enable real-time notifications for critical threats</li>
              <li>4. Add target keywords and channels to monitor</li>
            </ol>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
            <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">Best Practices</h4>
            <p className="text-sm text-green-800 dark:text-green-400 mb-3">
              Maximize detection accuracy with these recommended settings.
            </p>
            <ul className="text-xs text-green-700 dark:text-green-400 space-y-1">
              <li>• Use 0.8+ classification threshold for critical campaigns</li>
              <li>• Enable multiple language support for comprehensive coverage</li>
              <li>• Regular review of false positives to improve accuracy</li>
              <li>• Set up daily digest reports for trend analysis</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Documentation */}
      <div className="animate-slide-in-left">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Feature Documentation</h3>
        </div>
        
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white">Content Analysis Engine</h4>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Advanced ML-powered detection system for identifying harmful content and coordinated campaigns.
              </p>
              <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div><strong>Sentiment Analysis:</strong> Tracks emotional tone across content</div>
                <div><strong>Coordination Detection:</strong> Identifies synchronized posting patterns</div>
                <div><strong>Harmful Content:</strong> Flags misinformation and hate speech</div>
                <div><strong>Language Support:</strong> Multi-language content analysis</div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white">Real-time Monitoring</h4>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Continuous monitoring of YouTube channels and content for anti-India campaigns.
              </p>
              <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div><strong>Live Dashboard:</strong> Real-time threat status updates</div>
                <div><strong>Auto-refresh:</strong> Automatic data updates every 30 seconds</div>
                <div><strong>Instant Alerts:</strong> Immediate notifications for high-priority threats</div>
                <div><strong>Trend Analysis:</strong> Historical data visualization and patterns</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="animate-slide-in-right">
        <div className="flex items-center space-x-3 mb-6">
          <MessageCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
        </div>
        
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">How accurate is the detection system?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our system maintains 94.2% accuracy through continuous machine learning and user feedback integration. 
              False positives are minimized through multi-layered validation.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">What types of campaigns can be detected?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ContentGuard detects coordinated disinformation, hate speech, cultural appropriation campaigns, 
              bot networks, and synchronized negative sentiment targeting India.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">How often is data updated?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Live Dashboard updates every 30 seconds, analysis results refresh every 5 minutes, 
              and trend data is updated hourly for comprehensive monitoring.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Can I customize detection parameters?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Yes, you can adjust classification thresholds, coordination detection levels, and content filtering 
              preferences in the Analysis Settings tab.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 animate-fade-in">
        <div className="flex items-center space-x-3 mb-4">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Need Additional Help?</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Our support team is available 24/7 to help with any questions about ContentGuard's capabilities.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Contact Support
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
            View Documentation
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
            Report Issue
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'analysis': return renderAnalysisSettings();
      case 'data': return renderDataSettings();
      case 'languages': return renderLanguageSettings();
      case 'notifications': return renderNotifications();
      case 'help': return renderHelp();
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              {tabs.find(tab => tab.id === activeTab)?.label} settings coming soon...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure analysis parameters and system preferences
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-b-xl">
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              Reset to Defaults
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;