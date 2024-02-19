var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../db');
const User = require('../models/user'); 

var router = express.Router();

passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }

        const user = {
          id: row.id, 
          username: row.username
        };
        
        return cb(null, user);
      });
    });
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      console.log('user id', user.id); 
      return res.json({ success: true, userId: user.id, message: 'Logged in successfully' });
    });
  })(req, res, next);
});

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});  

router.post('/signup', async function(req, res, next) {
  var salt = crypto.randomBytes(16);
  var password = String(req.body.password); 

  try {
      const hashedPassword = await new Promise((resolve, reject) => {
          crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, hashed) => {
              if (err) reject(err);
              else resolve(hashed);
          });
      });

      await db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
          req.body.username,
          hashedPassword,
          salt
      ]);

      var user = {
          id: this.lastID,
          username: req.body.username
      };

      // Creating and saving user using Mongoose
      const newUser = new User({
          id: user.id, 
          username: user.username,
      });
      await newUser.save(); 

      console.log('User registered successfully:', user);

      req.login(user, function(err) {
          if (err) { return next(err); }
          return res.json({ success: true, userId: user.id, message: 'Logged in successfully' });
      });
  } catch (error) {
      return next(error);
  }
});


module.exports = router;