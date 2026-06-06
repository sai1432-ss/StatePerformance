import React, { useState } from 'react';
// Corrected relative paths targeting the specific sub-folders inside implementations
import ContextNaiveApp from "./implementations/01-context-naive/src/native/App.jsx"; 
import ContextOptimizedApp from "./implementations/01-context-naive/src/optimized/App.jsx"; 
import ZustandApp from "./implementations/03-zustand/src/App.jsx";
import ReduxApp from "./implementations/04-redux-toolkit/src/App.jsx"; 

export default function App() {
  const [currentView, setCurrentView] = useState('naive-context');

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', background: '#fff', minHeight: '100vh', color: '#333' }}>
      <header style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2>State Management Benchmarking Workbench</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setCurrentView('naive-context')} 
            style={btnStyle(currentView === 'naive-context')}
          >
            1. Naive Context (Single Tree)
          </button>
          
          <button 
            onClick={() => setCurrentView('split-context')} 
            style={btnStyle(currentView === 'split-context')} 
          >
            2. Split Context (Optimized) ⚡
          </button>
          
          <button 
            onClick={() => setCurrentView('zustand')} 
            style={btnStyle(currentView === 'zustand')}
          >
            3. Zustand (Unlocked) ⚡
          </button>
          
          <button 
            onClick={() => setCurrentView('redux-toolkit')} 
            style={btnStyle(currentView === 'redux-toolkit')}
          >
            4. Redux Toolkit (Unlocked) 🛠️
          </button>
        </div>
      </header>

      <main>
        {currentView === 'naive-context' && <ContextNaiveApp />}
        {currentView === 'split-context' && <ContextOptimizedApp />}
        {currentView === 'zustand' && <ZustandApp />}
        {currentView === 'redux-toolkit' && <ReduxApp />} 
      </main>
    </div>
  );
}

const btnStyle = (isActive) => ({
  padding: '10px 15px',
  backgroundColor: isActive ? '#0070f3' : '#eee',
  color: isActive ? '#fff' : '#000',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: isActive ? 'bold' : 'normal'
});