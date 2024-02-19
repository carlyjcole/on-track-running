const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const SQLiteStore = require('connect-sqlite3')(session);
const router = require('./routes/router'); 
const authRouter = require('./routes/auth');
const mongoose = require('mongoose'); 
// const StravaStrategy = require('passport-strava-oauth2').Strategy;
const User = require('./models/user'); 
const app = express();

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/', router);

const port = 4000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
