import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/components/HomePage';
import TestPage from '@/components/TestPage';
import ResultsPage from '@/components/ResultsPage';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedSet, setSelectedSet] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // This simulates ensuring everything is ready before rendering,
    // which can help prevent initial render issues.
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleStartTest = (setNumber) => {
    setSelectedSet(setNumber);
    setCurrentView('test');
  };

  const handleTestComplete = (results) => {
    setTestResults(results);
    setCurrentView('results');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedSet(null);
    setTestResults(null);
  };
  
  if (!isReady) {
    return null; // or a loading spinner
  }

  return (
    <>
      <Helmet>
        <title>IELTS Assessment Test - আইইএলটিএস মূল্যায়ন পরীক্ষা</title>
        <meta name="description" content="Complete IELTS practice test with 10 sets of questions. Get personalized feedback and improvement strategies from a Band 9.0 IELTS expert." />
      </Helmet>
      
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <HomePage key="home" onStartTest={handleStartTest} />
          )}
          {currentView === 'test' && selectedSet && (
            <TestPage 
              key="test" 
              setNumber={selectedSet} 
              onComplete={handleTestComplete}
              onBack={handleBackToHome}
            />
          )}
          {currentView === 'results' && testResults && (
            <ResultsPage 
              key="results" 
              results={testResults}
              onBackToHome={handleBackToHome}
            />
          )}
        </AnimatePresence>
        <Toaster />
      </div>
    </>
  );
}

export default App;