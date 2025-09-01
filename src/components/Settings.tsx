import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Database, Globe, Bell, Users, Lock } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('analysis');

  const tabs = [
    { id: 'analysis', label: 'Analysis Settings', icon: Shield },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'languages', label: 'Language Support', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'security', label: 'Security', icon: Lock }
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

  const renderContent = () => {
    switch (activeTab) {
      case 'analysis': return renderAnalysisSettings();
      case 'data': return renderDataSettings();
      case 'languages': return renderLanguageSettings();
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