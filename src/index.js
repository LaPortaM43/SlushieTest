// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />  // Removed StrictMode for now to check if it's causing issues
);

// reportWebVitals(); // If you don't need it, you can comment this out for now
