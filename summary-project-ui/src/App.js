// Import necessary components and libraries
import React, { useState } from 'react';
import Header from './components/Header';
import ContentBox from './components/ContentBox';
import Footer from './components/Footer';
import { Alert } from 'antd';
import './App.css';

// Main App component
function App() {
  // State variables to manage the state of the application
  const [message, setMessage] = useState(''); // Holds the user's message
  const [error, setError] = useState(false); // Tracks whether an error has occurred
  const [typing, setTyping] = useState(true); // Tracks if the user is typing
  const [showSkip, setShowSkip] = useState(true); // Controls the visibility of the skip button

  // Render the user interface
  return (
    // Outer container for the popup
    <div className="popup-container">
      {/* Render the header component */}
      <div className='popup-header'><Header message={message} setMessage={setMessage} setError={setError} setTyping={setTyping} setShowSkip={setShowSkip} error={error} /></div>

      {/* Conditional rendering based on error state */}
      {(!error) ?
        // If no error has occurred:
        <>
          {/* Display content box if the message is not empty */}
          {(message.length) ? <div className='popup-content'><ContentBox show={message} typing={typing} setShowSkip={setShowSkip} /></div> : <></>}
        </> :
        // If an error has occurred:
        <>
          {/* Display an error alert */}
          <div className='popup-error'><Alert message="Error" description={error} type="error" showIcon /></div>
        </>
      }

      {/* Conditional rendering based on message length and skip button visibility */}
      {(message.length && showSkip) ? <div className='popup-footer'><Footer setTyping={setTyping} setShowSkip={setShowSkip} /></div> : <></>}
    </div>
  );
}

// Export the App component as the default export
export default App;
