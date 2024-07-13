import React from 'react';

function App() {
  
  // Building a constant to hold the background style
  const backgroundStyle = {
    backgroundImage: 'url(/homepage.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw'
  };

  return (
    <div style={backgroundStyle}>
      <div>Hey Jen, thinking of you. I wish we were cuddling.</div>
    </div>
  );
}

export default App;
