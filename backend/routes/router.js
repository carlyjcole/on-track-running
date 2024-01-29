const express = require('express'); 
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const { registerUser, authenticateUser } = require('../db.js'); 

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

const clientID = 120096;
const clientSecret = 'bc3ec467a7464ae5be9fc7a7f6cc69f126945851'; //change this so its not hardcoded
const refreshToken = '17cdd8dfd293ca753feb814ef4b5adfa02f323f9';
const auth_link = "https://www.strava.com/oauth/token";
const activities_link = "https://www.strava.com/api/v3/athlete/activities";
const perPage = 200;

router.get('/profile', (req, res) => {

}); 

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userId = await registerUser(username, password);
    res.status(201).json({ userId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authenticateUser(username, password);

    if (user) {
      req.session.userId = user.id; 
      res.json({ user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/shoes', (req, res) => {
    const {shoeName, acquisitionDate} = req.body;
    console.log(shoeName + ' | ' + acquisitionDate);
    res.send('received shoe information'); 
}); 

router.post('/strava/auth', async (req, res) => {
  try {
    const stravaAuthResponse = await axios.post(`${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`);
    const accessToken = stravaAuthResponse.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    console.error('Error authenticating with Strava:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/strava/activities', async (req, res) => {
  try {
    const stravaAuthResponse = await axios.post(`${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`);
    const accessToken = stravaAuthResponse.data.access_token;
    const stravaActivityResponse = await axios.get(`${activities_link}?access_token=${accessToken}&page=${page}&per_page=${perPage}`);
    const activities = stravaActivityResponse.data;
    // const accessToken = req.query.access_token;
    // const stravaActivityResponse = await axios.get(`${activitiesLink}?access_token=${accessToken}&per_page=${perPage}`);
    // const activities = stravaActivityResponse.data;
    console.log("strava api response: " + stravaActivityResponse.data); 
    res.json({ activities });
  } catch (error) {
    console.error('Error fetching Strava activities:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router; 