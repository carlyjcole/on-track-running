import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; 

function ShoeInputForm({ userId }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(typeof userId); 
    console.log('userId: ', userId); 

    try {
      await axios.post(`http://localhost:4000/shoes/${userId}`, {
        brand,
        model,
        acquisition_date: acquisitionDate 
      });

      setBrand('');
      setModel('');
      setAcquisitionDate('');

      alert('Shoe added successfully');
    } catch (error) {
      console.error('Error adding shoe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="shoeBrand" className="block text-gray-700 font-bold mb-2">
          brand
        </label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="enter brand name"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="shoeModel" className="block text-gray-700 font-bold mb-2">
          model
        </label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="enter model name"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="acquisitionDate" className="block text-gray-700 font-bold mb-2">
          acquisition date
        </label>
        <input
          type="date"
          id="acquisitionDate"
          value={acquisitionDate}
          onChange={(e) => setAcquisitionDate(e.target.value)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-lightblue text-white font-wotfard text-l py-2 px-4 rounded mt-4">
        add shoes
      </motion.button>
      </div>
    </form>
  );
};

export default ShoeInputForm;