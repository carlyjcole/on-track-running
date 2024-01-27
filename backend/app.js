const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); 
const app = express();

app.use(cors()); 
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/profile', isAuthenticated, (req, res) => {
  // Render user profile
  res.send('User Profile');
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

app.get('/strava/activities', async (req, res) => {
  try {
    const accessToken = req.query.access_token;
    const stravaActivityResponse = await axios.get(`${activities_link}?access_token=${accessToken}&per_page=${perPage}`);
    const activities = stravaActivityResponse.data;
    res.json({ activities });
  } catch (error) {
    console.error('Error fetching Strava activities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});