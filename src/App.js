import React from 'react';

function App() {
  
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
    alignItems: 'center'
  };

  // Define the Style for the Box
  const floatingBoxStyle = {
    backgroundColor: 'rgba(64, 64, 64, 0.8)', // Grey with semi-transparency
    borderRadius: '5vw', // Rounded corners
    padding: '2vw', // Padding inside the box
    width: '40vw', // Width of the box
    height: '50vh', // Height of the box
    display: 'flex', // To center content inside the box, if needed
    justifyContent: 'center', // Center horizontally inside the box
    alignItems: 'center', // Center vertically inside the box
    boxShadow: '1vw 1vw 3vw rgba(0, 0, 0, 0.5)', // Responsive Shadow to the bottom right
    position: 'fixed', // Keeps the box fixed during scrolling
    top: '50%', // Centers the box vertically
    left: '50%', // Centers the box horizontally
    transform: 'translate(-50%, -50%)', // Adjusts the box to be centered correctly
  };

  
  return (
    <div style={backgroundStyle}>
      <div style={floatingBoxStyle}>
        <div style={{ borderRadius: '5%', width: '10vw', height: '10vw', objectFit: 'cover', alignSelf: 'flex-start', overflow: 'hidden' }}>
          <img src="/profile.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Authors profile portrait" />          
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignSelf: 'flex-end', alignItems: 'flex-end' }}>
          <a href="https://www.google.com" style={{ margin: '0 1vw' }}>
            <img src="/linkedin_logo.png" style={{ width: '3vw', height: '3vw', objectFit: 'cover' }} alt="LinkedIn Link" />
          </a>
          <a href="https://www.google.com" style={{ margin: '0 1vw' }}>
            <img src="/reddit_logo.png" style={{ width: '3vw', height: '3vw', objectFit: 'cover' }} alt="Reddit Link" />
          </a>
          <a href="https://www.google.com" style={{ margin: '0 1vw' }}>
            <img src="/github_logo.png" style={{ width: '3vw', height: '3vw', objectFit: 'cover' }} alt="GitHub Link" />
          </a>
        </div>
      </div>   
    </div>
  ); 
}

export default App;
