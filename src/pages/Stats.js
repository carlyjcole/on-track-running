import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import DropdownMenu from '../components/DropdownMenu';
import HeartRateChart from '../components/HeartRateChart';
import ShoeTracker from '../components/ShoeTracker'; 
import AroundTheWorld from '../components/AroundTheWorld';
import EarthImage from '../images/earth.png'
import ReactCurvedText from 'react-curved-text';
import Reveal from '../components/Reveal'; 

const Stats = ({ activities }) => {
  const [selectedYear, setSelectedYear] = useState('all-time'); 
  const isAllTime = selectedYear === 'all-time';
  const [averagePace, setAveragePace] = useState(0);
  const [averageHeartRate, setAverageHeartRate] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);


  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      console.log("clicked");
      navigate('/');
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  };

  const handleYearChange = (newDate) => {
    setSelectedYear(newDate);
  };

  useEffect(() => {
  const calculateTotals = () => {
    const filteredActivities = isAllTime
      ? activities
      : activities.filter((activity) => new Date(activity.start_date).getFullYear() === parseInt(selectedYear));

    const totalDistance = filteredActivities.reduce((total, activity) => total + activity.distance, 0) * 0.000621371;
    const totalTime = filteredActivities.reduce((total, activity) => total + activity.moving_time, 0);

    const activitiesWithHeartRate = filteredActivities.filter((activity) => activity.has_heartrate);

    const totalHeartRate = activitiesWithHeartRate.reduce((total, activity) => total + activity.average_heartrate, 0);
    const averageHeartRate = activitiesWithHeartRate.length > 0 ? Math.round(totalHeartRate / activitiesWithHeartRate.length) : 0;

    const averagePaceInSeconds = totalTime > 0 ? Math.round((totalTime / totalDistance)) : 0;
    const paceMinutes = Math.floor(averagePaceInSeconds / 60);
    const paceSeconds = averagePaceInSeconds % 60;

    setAveragePace(`${paceMinutes}:${paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds}`);
    setAverageHeartRate(averageHeartRate);
    setTotalDistance(totalDistance);
  };

  calculateTotals();
}, [activities, selectedYear, isAllTime]);


  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: 'rgb(255, 254, 247)', 
    padding: '2.5rem', }}>
      <h1 className="text-4xl font-bold mb-8">
        {isAllTime ? (
          <motion.span
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-block"
          >
            {'all-time stats'}
          </motion.span>
        ) : (
          <>
            how you're doing in{' '}
            <motion.span
              key={selectedYear}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="inline-block"
            >
              {selectedYear}
            </motion.span>
            
          </>
        )}
    
      </h1>

      <div className='float-right'><DropdownMenu selectedYear={selectedYear} onYearChange={handleYearChange} /></div>

      <div className="flex flex-wrap justify-center">
        <section className='stat-box'>
          <h2>total distance traveled</h2>
          <p>{totalDistance.toFixed(2)} miles</p>
        </section>
        <section className='stat-box'>
          <h2>average pace</h2>
          <p>{averagePace} per mile</p>
        </section><section className='stat-box'>
          <h2>average heart rate</h2>
          <p>{averageHeartRate} bpm</p>
        </section>

      </div>

      <div className='flex flex-wrap justify-center'>
      <Reveal><p>how's heart rate training going?</p></Reveal>
        <HeartRateChart />
      </div>

      <Reveal> 
        <h2 class='new-shoes'>is it time for some new shoes?</h2>
      </Reveal>
      <ShoeTracker />

      <AroundTheWorld />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="bg-lightblue text-white font-wotfard text-l py-2 px-4 rounded mt-4"
      >
        back to home
      </motion.button>

    </div>

  );
};

export default Stats;
