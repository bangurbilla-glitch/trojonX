import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import DataUpload from './components/DataUpload';
import Analysis from './components/Analysis';
import Settings from './components/Settings';
import { AnalysisProvider } from './context/AnalysisContext';

function App() {
  return (
    <AnalysisProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<DataUpload />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AnalysisProvider>
  );
}

export default App;