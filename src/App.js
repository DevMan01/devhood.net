import React from 'react';

function App() {
  
  // Building a constant to hold the background style
  const backgroundStyle = {
    backgroundImage: 'url(/homepage.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
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
        {/* <div>Hey Jen, thinking of you. I wish we were cuddling.</div> */}
      </div>   
    </div>
  );
}

export default App;
