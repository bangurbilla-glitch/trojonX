import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnalysisState {
  datasets: any[];
  analysisResults: any[];
  isProcessing: boolean;
  streamingConnections: { [key: string]: boolean };
}

interface AnalysisContextType {
  state: AnalysisState;
  addDataset: (dataset: any) => void;
  updateAnalysisResults: (results: any[]) => void;
  setProcessing: (processing: boolean) => void;
  toggleStreaming: (platform: string, enabled: boolean) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};

interface AnalysisProviderProps {
  children: ReactNode;
}

export const AnalysisProvider: React.FC<AnalysisProviderProps> = ({ children }) => {
  const [state, setState] = useState<AnalysisState>({
    datasets: [],
    analysisResults: [],
    isProcessing: false,
    streamingConnections: {}
  });

  const addDataset = (dataset: any) => {
    setState(prev => ({
      ...prev,
      datasets: [...prev.datasets, dataset]
    }));
  };

  const updateAnalysisResults = (results: any[]) => {
    setState(prev => ({
      ...prev,
      analysisResults: results
    }));
  };

  const setProcessing = (processing: boolean) => {
    setState(prev => ({
      ...prev,
      isProcessing: processing
    }));
  };

  const toggleStreaming = (platform: string, enabled: boolean) => {
    setState(prev => ({
      ...prev,
      streamingConnections: {
        ...prev.streamingConnections,
        [platform]: enabled
      }
    }));
  };

  const value: AnalysisContextType = {
    state,
    addDataset,
    updateAnalysisResults,
    setProcessing,
    toggleStreaming
  };

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
};