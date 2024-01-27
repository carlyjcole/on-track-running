const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

const clientID = 120096;
const clientSecret = 'bc3ec467a7464ae5be9fc7a7f6cc69f126945851';
const authLink = 'https://www.strava.com/oauth/token';
const activitiesLink = 'https://www.strava.com/api/v3/athlete/activities';
const refreshToken = 'f545ac531dd1373ffca07f31d543f2e197810468';
const perPage = 200;

app.post('/strava/auth', async (req, res) => {
  try {
    const stravaAuthResponse = await axios.post(`${authLink}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`);
    const accessToken = stravaAuthResponse.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    console.error('Error authenticating with Strava:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/strava/activities', async (req, res) => {
  try {
    const accessToken = req.query.access_token;
    const stravaActivityResponse = await axios.get(`${activitiesLink}?access_token=${accessToken}&per_page=${perPage}`);
    const activities = stravaActivityResponse.data;
    res.json({ activities });
  } catch (error) {
    console.error('Error fetching Strava activities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
