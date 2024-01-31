import React, { useState } from 'react';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'; 
// import FetchDataFromStrava from './components/FetchDataFromStrava';

const App = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      console.log("clicked"); 
      navigate('/fetch'); 
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen"
    style={{
      backgroundColor:'rgb(255, 254, 247)',
      height: 'calc(100vh - 80px)' 
      }}>
      <Header />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="bg-lightblue text-white font-wotfard text-l py-2 px-4 rounded mt-4"
      >
        see my stats
      </motion.button>
    </div>
  );
};

export default App;