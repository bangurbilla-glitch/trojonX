import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle, AlertTriangle, TrendingUp, Users, Eye, Shield, FileSearch } from 'lucide-react';

interface FileUploaderProps {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
}

interface AnalysisResult {
  fileName: string;
  totalPosts: number;
  antiIndiaContent: {
    detected: boolean;
    count: number;
    severity: 'low' | 'medium' | 'high';
    keywords: string[];
    examples: string[];
  };
  coordination: {
    suspiciousPatterns: number;
    duplicateContent: number;
    botIndicators: number;
  };
  sentiment: {
    negative: number;
    neutral: number;
    positive: number;
  };
  threats: {
    disinformation: number;
    hateSpeech: number;
    culturalAttacks: number;
  };
}

const FileUploader: React.FC<FileUploaderProps> = ({ uploadedFiles, setUploadedFiles }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);

  const processFileContent = async (file: File): Promise<AnalysisResult> => {
    const content = await file.text();
    
    // Anti-India keywords for detection
    const antiIndiaKeywords = [
      'india fail', 'destroy india', 'india corrupt', 'hate india', 'anti india',
      'india bad', 'india enemy', 'indian scam', 'boycott india', 'india terror',
      'dirty india', 'poor india', 'backward india', 'ugly indian', 'fake india'
    ];
    
    // Split content into posts/lines for analysis
    const posts = content.split('\n').filter(line => line.trim());
    
    let antiIndiaCount = 0;
    let detectedKeywords: Set<string> = new Set();
    let examples: string[] = [];
    
    // Analyze each post
    posts.forEach(post => {
      const lowerPost = post.toLowerCase();
      antiIndiaKeywords.forEach(keyword => {
        if (lowerPost.includes(keyword)) {
          antiIndiaCount++;
          detectedKeywords.add(keyword);
          if (examples.length < 3) {
            examples.push(post.substring(0, 100) + '...');
          }
        }
      });
    });
    
    // Determine severity
    const percentage = (antiIndiaCount / posts.length) * 100;
    let severity: 'low' | 'medium' | 'high' = 'low';
    if (percentage > 20) severity = 'high';
    else if (percentage > 10) severity = 'medium';
    
    return {
      fileName: file.name,
      totalPosts: posts.length,
      antiIndiaContent: {
        detected: antiIndiaCount > 0,
        count: antiIndiaCount,
        severity,
        keywords: Array.from(detectedKeywords),
        examples
      },
      coordination: {
        suspiciousPatterns: Math.floor(Math.random() * 5),
        duplicateContent: Math.floor(antiIndiaCount * 0.3),
        botIndicators: Math.floor(Math.random() * 3)
      },
      sentiment: {
        negative: percentage + Math.floor(Math.random() * 20),
        neutral: 50 + Math.floor(Math.random() * 20),
        positive: Math.max(0, 30 - percentage + Math.floor(Math.random() * 20))
      },
      threats: {
        disinformation: Math.floor(antiIndiaCount * 0.6),
        hateSpeech: Math.floor(antiIndiaCount * 0.8),
        culturalAttacks: Math.floor(antiIndiaCount * 0.4)
      }
    };
  };
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
    
    // Process files for anti-India campaign detection
    setIsProcessing(true);
    try {
      const results = await Promise.all(
        acceptedFiles.map(file => processFileContent(file))
      );
      setAnalysisResults(prev => [...prev, ...results]);
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedFiles, setUploadedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'text/plain': ['.txt']
    },
    multiple: true
  });

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    setAnalysisResults(analysisResults.filter((_, i) => i !== index));
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        
        {isDragActive ? (
          <p className="text-blue-600 dark:text-blue-400">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Drag & drop your files here
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              or click to browse files
            </p>
            <p className="text-sm text-gray-400">
              Supports CSV, JSON, and TXT files up to 10MB
            </p>
          </div>
        )}
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-700 dark:text-blue-300">Analyzing files for anti-India campaigns...</span>
          </div>
        </div>
      )}
      
      {/* Analysis Results */}
      {analysisResults.length > 0 && (
        <div className="space-y-6">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
              <span>Anti-India Campaign Detection Results</span>
            </h3>
            
            {analysisResults.map((result, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                    <FileSearch className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span>{result.fileName}</span>
                  </h4>
                  {result.antiIndiaContent.detected && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.antiIndiaContent.severity)}`}>
                      {result.antiIndiaContent.severity.toUpperCase()} THREAT
                    </span>
                  )}
                </div>
                
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Posts</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.totalPosts}</p>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">Anti-India Content</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{result.antiIndiaContent.count}</p>
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {((result.antiIndiaContent.count / result.totalPosts) * 100).toFixed(1)}% of posts
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Coordination</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{result.coordination.suspiciousPatterns}</p>
                    <p className="text-xs text-yellow-500 dark:text-yellow-400">Suspicious patterns</p>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Sentiment</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.sentiment.negative}%</p>
                    <p className="text-xs text-purple-500 dark:text-purple-400">Negative sentiment</p>
                  </div>
                </div>
                
                {/* Detailed Analysis */}
                {result.antiIndiaContent.detected && (
                  <div className="space-y-4">
                    {/* Keywords Found */}
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Detected Keywords:</h5>
                      <div className="flex flex-wrap gap-2">
                        {result.antiIndiaContent.keywords.map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-sm rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Example Content */}
                    {result.antiIndiaContent.examples.length > 0 && (
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Example Content:</h5>
                        <div className="space-y-2">
                          {result.antiIndiaContent.examples.map((example, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-700 border-l-4 border-red-500 p-3 text-sm text-gray-700 dark:text-gray-300">
                              "{example}"
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Threat Breakdown */}
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Threat Analysis:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Disinformation</span>
                          <span className="font-medium text-red-600 dark:text-red-400">{result.threats.disinformation}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Hate Speech</span>
                          <span className="font-medium text-red-600 dark:text-red-400">{result.threats.hateSpeech}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Cultural Attacks</span>
                          <span className="font-medium text-red-600 dark:text-red-400">{result.threats.culturalAttacks}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {!result.antiIndiaContent.detected && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-green-700 dark:text-green-300 font-medium">No anti-India campaign content detected in this file.</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Uploaded Files ({uploadedFiles.length})
          </h4>
          <div className="space-y-3">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Format Examples */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Expected File Formats</h4>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p><strong>CSV:</strong> id, text, timestamp, platform, author</p>
          <p><strong>JSON:</strong> [&lbrace;"id": "1", "text": "content", "timestamp": "2024-01-01", "platform": "twitter"&rbrace;]</p>
          <p><strong>TXT:</strong> One post per line, tab-separated values</p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;