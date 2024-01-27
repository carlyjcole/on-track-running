const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

passport.use('strava', new OAuth2Strategy({
    authorizationURL: 'https://www.strava.com/oauth/authorize',
    tokenURL: 'https://www.strava.com/oauth/token',
    clientID: 'your-client-id',
    clientSecret: 'your-client-secret',
    callbackURL: 'http://localhost:3000/auth/strava/callback' // Adjust the callback URL accordingly
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
