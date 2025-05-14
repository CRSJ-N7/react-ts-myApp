import { useState } from 'react';

import someGif from '../assets/someGif.gif'

const HomePage = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
    setClicked(true);
    setTimeout(() => {
      setClicked(false)
    }, 5000);
    } else {
      setClicked(false)
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '65px' }}>
      {!clicked ? (
        <h1 
          style={{ cursor: 'pointer', fontStyle: 'italic', fontFamily: 'fantasy', letterSpacing: '2px' }} 
          onClick={handleClick}
        >
          <b>Don't click</b>
        </h1>
      ) : (
        <img 
          src={someGif}
          alt='Rick Rolled ha-ha'
          style={{ width: '500px', height: 'auto', cursor: 'pointer' }}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default HomePage;
