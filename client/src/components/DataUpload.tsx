import React, { useState, useCallback } from 'react';
import { Upload, FileText, Database, Globe, Settings, Play } from 'lucide-react';
import FileUploader from './FileUploader';
import ApiConnector from './ApiConnector';

const DataUpload = () => {
  const [activeTab, setActiveTab] = useState('file');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const tabs = [
    { id: 'file', label: 'File Upload', icon: Upload },
    { id: 'api', label: 'API Connection', icon: Database }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Collection</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Upload datasets or connect to social media APIs for real-time content analysis
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
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
          {activeTab === 'file' && (
            <FileUploader 
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
            />
          )}
          {activeTab === 'api' && (
            <ApiConnector />
          )}
        </div>
      </div>

      {/* Processing Options */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Analysis Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Languages to Analyze
            </label>
            <div className="space-y-2">
              {['English', 'Hindi', 'Tamil', 'Bengali', 'Marathi'].map(lang => (
                <label key={lang} className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={lang === 'English'}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{lang}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Analysis Depth
            </label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>Quick Scan</option>
              <option>Standard Analysis</option>
              <option>Deep Analysis</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confidence Threshold
            </label>
            <input
              type="range"
              min="0.5"
              max="1"
              step="0.05"
              defaultValue="0.8"
              className="w-full"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">80% confidence</span>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Play className="h-4 w-4" />
            <span>Start Analysis</span>
          </button>
          <button className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Settings className="h-4 w-4" />
            <span>Advanced Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;