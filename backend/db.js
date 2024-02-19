var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');
var crypto = require('crypto');

mkdirp.sync('./var/db');

var db = new sqlite3.Database('./var/db/ontrack.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT, \
    hashed_password BLOB, \
    salt BLOB \
  )");
  
  var salt = crypto.randomBytes(16);
});

module.exports = db;