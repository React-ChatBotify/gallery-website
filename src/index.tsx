import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import initializeI18n from './i18n'; // Import the initializer
import reportWebVitals from './reportWebVitals';

initializeI18n()
  .then(() => {
    console.log('i18n initialized, rendering app.');
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error('Failed to initialize i18n:', error);
    // Optionally render a fallback UI here if i18n fails
    // For example, ReactDOM.createRoot(...).render(<div>Error loading application</div>);
  });

reportWebVitals();
