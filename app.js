const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Connect to Database
// const DB_URL = process.env.MONGO_URL;
// const DB_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/FatimaHealthAPPDB';
const DB_URL = process.env.MONGO_URI || 'mongodb+srv://amareshmaity2002:X37tl4hLW7O8T86T@cluster0.g2ktfbf.mongodb.net/HealthAPP?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);//
    console.error(err);
  });

// Import Routes
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Home Route (Add this)
app.get('/', (req, res) => {
  res.render('index'); // Ensure 'index.hbs' exists in the 'views' folder
});

// Use Routes
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/reports', reportRoutes);


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
