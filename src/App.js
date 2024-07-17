import React, { useState, useEffect } from 'react';

const App = () => {

  const [profilePicOpacity, setProfilePicOpacity] = useState(0);

  const navigateToURL = (url) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setProfilePicOpacity(1);
    }, 5); // Delay the profile picture appearance by 500ms
    return () => clearTimeout(timer);
  }, []);

  
  // Building a constant to hold the background style
  const backgroundStyle = {
    backgroundImage: 'url(/homepage.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed', // Keeps the background fixed during scrolling
    height: '100vh',
    width: '100vw',
    overflow: 'hidden', // Prevents scrolling
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black'
  };

  // Define the Style for the Box
  const floatingBoxStyle = {
    backgroundColor: 'rgba(64, 64, 64, 0.8)', // Grey with semi-transparency
    borderRadius: '5vw', // Rounded corners
    padding: '2vw', // Padding inside the box
    width: '30vw', // Width of the box
    height: '50vh', // Height of the box
    display: 'flex', // To center content inside the box, if needed
    flexDirection: 'column', // To layout rows vertically
    justifyContent: 'space-around', // Evenly space the rows
    alignItems: 'center', // Center vertically inside the box
    boxShadow: '1vw 1vw 3vw rgba(0, 0, 0, 0.75)', // Responsive Shadow to the bottom right
    position: 'fixed', // Keeps the box fixed during scrolling
    top: '50%', // Centers the box vertically
    left: '50%', // Centers the box horizontally
    transform: 'translate(-50%, -50%)', // Adjusts the box to be centered correctly
  };

  // Style for the sections
  const iconSectionStyle = {
    display: 'flex',
    justifyContent: 'center', // Evenly space the sections in a row
    alignItems: 'center',
    width: '100%', // Take full width of the container
    height: '90%', // Each row takes half of the container's height
  };

  // Style for the profile picture section
  const profilePicSectionStyle = {
    display: 'flex',
    justifyContent: 'space-around', // Evenly space the sections in a row
    alignItems: 'center',
    width: '100%', // Take full width of the container
    height: '90%', // Each row takes half of the container's height
  };

  // Style for the profile picture
  const profilePicStyle = {
    width: '40%', // Relative to its container section
    height: '90%', // Maintain aspect ratio
    borderRadius: '5%', // Round the corners
    backgroundImage: 'url(/profile.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: profilePicOpacity, // Apply dynamic opacity
    transition: 'opacity 1000ms ease-out', // Smooth transition for opacity change
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5)', // Adds shadow to the bottom right
  };

  // New style for the LinkedIn icon
  const linkedInIconStyle = {
    width: '30%', // Adjust based on the desired size of the icon
    height: '30%', // Maintain aspect ratio
    backgroundImage: 'url(/linkedin_logo.png)', // Adjust path if necessary
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginLeft: '20%', // Adjust based on the desired spacing between icons
    cursor: 'pointer', // Change cursor to pointer on hover
  };

  // Style for the Reddit icon
  const redditIconStyle = {
    width: '27%', // Adjust based on the desired size of the icon
    height: '27%', // Maintain aspect ratio
    backgroundImage: 'url(/reddit_logo.png)', // Use the Reddit logo
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginRight: '20%', // Adjust based on the desired spacing between icons
    cursor: 'pointer', // Change cursor to pointer on hover
  };

  // Style for the GitHub icon
  const githubIconStyle = {
    width: '30%', // Adjust based on the desired size of the icon
    height: '30%', // Maintain aspect ratio
    backgroundImage: 'url(/github_logo.png)', // Use the GitHub logo
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer', // Change cursor to pointer on hover
  };

  return (
    <div style={backgroundStyle}>
      <div style={floatingBoxStyle}>
        <div style={profilePicSectionStyle}>
          <div></div> {/* Empty section */}
          <div style={profilePicStyle}></div> {/* Profile picture section */}
          <div></div> {/* Empty section */}
        </div>
        <div style={iconSectionStyle}>
          <div style={linkedInIconStyle} onClick={() => navigateToURL('https://linkedin.com/in/tim-chaffin-064b98132')}></div> {/* Bottom row, left section, LinkedIn link */}
          <div style={githubIconStyle} onClick={() => navigateToURL('https://github.com/DevMan01')}></div> {/* Bottom row, center section, GitHub link */}
          <div style={redditIconStyle} onClick={() => navigateToURL('https://www.reddit.com/user/DevManTim/')}></div> {/* Bottom row, right section, Reddit link */}
        </div>
      </div>   
    </div>
  );
};

export default App;
