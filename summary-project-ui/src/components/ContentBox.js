import React from 'react';
import { TypeAnimation } from 'react-type-animation';

// Define a functional component named ContentBox
const ContentBox = ({ show, typing, setShowSkip }) => { 
    return (
        <>
            {/* Conditionally render content based on typing */}
            {/* If 'typing' is true, show the typing animation */}
            {(typing) ? 
                <>
                    {/* TypeAnimation component for the typing effect */}
                    <TypeAnimation
                        sequence={[show, () => setShowSkip(false)]}
                        wrapper="span"
                        speed={70}
                        style={{ whiteSpace: 'pre-line' }}
                    />
                </>
                :
                // If 'typing' is false, display the content directly
                // This is the content displayed when not typing
                <div style={{ whiteSpace: 'pre-line' }}>{show}</div>
            }
        </>
    );
};

// Export the ContentBox component as the default export
export default ContentBox;
