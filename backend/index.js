const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const router = require('./routes/router'); 
const mysql = require('mysql2/promise'); 

const app = express();

app.use(cors()); 
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoutes');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions)); 
app.use('/auth', authRoutes);
app.use('/', router); 

const db = mysql.createConnection({ 
  host: 'localhost', 
  user: 'root',
  password: '',
  database: 'users'
});

const port = 4000; 
app.listen(port, () => {
  console.log('Server is running on port ${port}');
});