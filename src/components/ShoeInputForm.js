import React, { useState } from 'react';

const ShoeInputForm = ({ onAddShoe }) => {
  const [shoeName, setShoeName] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');

  const handleShoeNameChange = (e) => {
    setShoeName(e.target.value);
  };

  const handleAcquisitionDateChange = (e) => {
    setAcquisitionDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newShoe = {
      name: shoeName,
      acquisitionDate: acquisitionDate,
    };

    onAddShoe(newShoe);
    setShoeName('');
    setAcquisitionDate('');
  };

  return (
    <div className="w-full min-h-screen" style={{ 
      backgroundColor: 'rgb(255, 254, 247)', 
      padding: '2.5rem', }}>
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'rgb(172, 209, 239)', padding: '50px'}}>
      <label>
        shoe name:
        <input type="text" value={shoeName} onChange={handleShoeNameChange} />
      </label>
      <br />
      <label>
        when did you get them?:
        <input type="date" value={acquisitionDate} onChange={handleAcquisitionDateChange} />
      </label>
      <br />
      <button type="submit">Add Shoe</button>
    </form>
    </div>
  );
};

export default ShoeInputForm;