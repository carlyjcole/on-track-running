// FetchDataFromStrava.js
import React, { useState, useEffect } from 'react';
import Stats from '../pages/Stats'
import axios from 'axios';

const FetchDataFromStrava = () => {
  console.log("fetching"); 
  const [activities, setActivities] = useState([]);
  const [selectedYear] = useState(new Date().getFullYear()); 
  const clientID = 120096;
  const clientSecret = 'bc3ec467a7464ae5be9fc7a7f6cc69f126945851';
  const refreshToken = 'f545ac531dd1373ffca07f31d543f2e197810468';
  const auth_link = "https://www.strava.com/oauth/token";
  const activities_link = "https://www.strava.com/api/v3/athlete/activities";
  const perPage = 200; 
  let i = 1; 

  useEffect(() => {

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const fetchData = async (page = 1) => {
      try {
        const stravaAuthResponse = await axios.post('http://localhost:3001/strava/auth');
        const accessToken = stravaAuthResponse.data.accessToken;
        const stravaActivityResponse = await axios.get(`http://localhost:3001/strava/activities?access_token=${accessToken}`);

        // const stravaAuthResponse = await axios.post(`${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`);
        // const accessToken = stravaAuthResponse.data.access_token;
        // const stravaActivityResponse = await axios.get(`${activities_link}?access_token=${accessToken}&page=${page}&per_page=${perPage}`);
        const newActivities = stravaActivityResponse.data;

        console.log("Strava API Response:", stravaActivityResponse.data);

        setActivities(prevActivities => [...prevActivities, ...newActivities]);

        if (newActivities.length === perPage) {
          fetchData(page + 1);
        }

      } catch (error) {
        if (error.response && error.response.status === 429) {
          const waitTime = Math.pow(2, i) * 1000; 
          console.log(`Rate limited. Retrying in ${waitTime / 1000} seconds...`);
          await delay(waitTime);
          i++; 
          fetchData(page);
        } else {
          console.error('Error fetching data:', error);
        }
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
