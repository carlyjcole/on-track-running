const bcrypt = require('bcrypt');
const pool = require('../db.js');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number },
  username: { type: String, unique: true },
  shoes: [{
    brand: String,
    model: String,
    acquisition_date: Date
  }],
  stravaAuth: {
    access_token: String,
    refresh_token: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
