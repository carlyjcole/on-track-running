// FetchDataFromStrava.js
import React, { useState, useEffect } from 'react';
import Stats from '../pages/Stats'
import axios from 'axios';

const FetchDataFromStrava = () => {
  console.log("fetching"); 
  const [activities, setActivities] = useState([]);
  const [selectedYear] = useState(new Date().getFullYear()); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a request to the backend to get Strava activities
        const response = await axios.get('http://localhost:3001/strava/activities');
        const newActivities = response.data.activities;

        console.log("Strava API Response:", newActivities);

        setActivities(prevActivities => [...prevActivities, ...newActivities]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  
  return (
      <div>
        <Stats year={selectedYear} activities={activities} />
      </div>
    );
};

export default FetchDataFromStrava;
