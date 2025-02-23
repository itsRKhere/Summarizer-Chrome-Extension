// Import the necessary modules from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main styling and the App component
import './index.css';
import App from './App';

// Create a root element to attach the React app to
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component within a StrictMode
root.render(
  // StrictMode helps catch potential issues in the app during development
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
