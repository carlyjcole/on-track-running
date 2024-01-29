import React, { useState, useEffect } from 'react';
import ShoeInputForm from './ShoeInputForm';

const ShoeTracker = () => {
  useEffect(() => {
    const savedShoes = JSON.parse(localStorage.getItem('shoes')) || [];
    setShoes(savedShoes);
  }, []);

  const [shoes, setShoes] = useState([]);

  const handleAddShoe = (newShoe) => {
    setShoes([...shoes, newShoe]);
    
    localStorage.setItem('shoes', JSON.stringify([...shoes, newShoe]));
  };

  return (
    <div>
      {shoes.length !== 0 && <h2>current shoe:</h2>}
      <ul>
        {shoes.map((shoe, index) => (
          <li key={index}>
            {shoe.name} (distance tracker: {shoe.acquisitionDate})
          </li>
        ))}
      </ul>
      {shoes.length === 0 && <ShoeInputForm onAddShoe={handleAddShoe} />}
    </div>
  );
};

export default ShoeTracker;
