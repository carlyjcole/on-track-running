import React, { useState, useEffect } from 'react';
import ShoeInputForm from './ShoeInputForm';
import axios from 'axios'; 

const ShoeTracker = ({ userId }) => {
  useEffect(() => {
    const savedShoes = JSON.parse(localStorage.getItem('shoes')) || [];
    setShoes(savedShoes);
  }, []);

  const [shoes, setShoes] = useState([]);

  const handleAddShoe = async (newShoe) => {
    try {
      const response = await axios.post('http://localhost:4000/shoes', newShoe);
  
      if (!response.ok) {
        throw new Error('Failed to add shoe');
      }
  
      const result = await response.text();
      console.log(result); // Output success message
    } catch (error) {
      console.error('Error adding shoe:', error.message);
    }
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
