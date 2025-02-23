import React from 'react';

// Define the Footer component
const Footer = ({ setTyping, setShowSkip }) => {
  // Function to handle skipping typing
  const skipTyping = () => {
    // Set typing to false and hide the skip button
    setTyping(false);
    setShowSkip(false);
  };

  // Return the JSX for the Footer component
  return (
    <div className="skip-button">
      {/* Render the "Skip" text and attach the skipTyping function to the onClick event */}
      <p onClick={skipTyping}>Skip</p>
    </div>
  );
}

// Export the Footer component to be used in other parts of the application
export default Footer;
