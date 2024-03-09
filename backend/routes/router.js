const express = require('express'); 
const router = express.Router();
var passport = require('passport');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
var db = require('../db');
const authRoutes = require('./auth');
const isAuthenticated = require('../middleware/isAuthenticated');
const User = require('../models/user');
const app = express();
const mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes); 
app.use('/shoes', isAuthenticated);

const clientID = 120096;
const clientSecret = 'bc3ec467a7464ae5be9fc7a7f6cc69f126945851'; 
const refreshToken = '17cdd8dfd293ca753feb814ef4b5adfa02f323f9';
const auth_link = "https://www.strava.com/oauth/token";
const activities_link = "https://www.strava.com/api/v3/athlete/activities";
const perPage = 200;


router.post('/shoes/:userId', async (req, res) => {
  try {
    const userIdInteger = parseInt(req.params.userId, 10);
    const userId = new mongoose.Types.ObjectId(userIdInteger); 
    const newShoe = {
      brand: req.body.brand,
      model: req.body.model,
      acquisition_date: new Date(req.body.acquisition_date)
    };

    const user = await User.findById(userId); 

    user.shoes.push(newShoe);

    await user.save();

    res.status(201).json({ message: 'Shoe added successfully', shoe: newShoe });
  } catch (error) {
    console.error('Error adding shoe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
    const stravaAuthResponse = await axios.post(`${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token&scope=activity:read_all`);
    const accessToken = stravaAuthResponse.data.access_token;
    const stravaActivityResponse = await axios.get(`${activities_link}?access_token=${accessToken}&page=1&per_page=${perPage}`);
    const activities = stravaActivityResponse.data;

    // console.log("Strava API Response:", stravaActivityResponse.data);


    res.json({ activities });
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router; 