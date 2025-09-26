import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

// Hide loading screen once React is ready
const hideLoading = () => {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.classList.add('hidden');
    setTimeout(() => {
      loading.remove();
    }, 500);
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App onReady={hideLoading} />);
