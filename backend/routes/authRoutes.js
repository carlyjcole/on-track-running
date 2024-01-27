const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/strava', passport.authenticate('strava'));

router.get('/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;