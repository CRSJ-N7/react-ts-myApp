import { useState } from 'react';

import someGif from '../assets/someGif.gif'

const HomePage = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
    setClicked(true);
    } else {
      setClicked(false)
    }
  };

  return (
    <div>
      {!clicked ? (
        <h1 
          style={{ cursor: 'pointer' }} 
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
