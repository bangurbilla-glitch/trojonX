import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

interface FileUploaderProps {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ uploadedFiles, setUploadedFiles }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
    
    // Simulate processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
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
            <span className="text-blue-700 dark:text-blue-300">Processing uploaded files...</span>
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