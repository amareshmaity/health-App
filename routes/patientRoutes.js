const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Render registration page
router.get('/register', (req, res) => {
  res.render('patientRegister'); 
});
// routes/patientRoutes.js
router.get('/reports/:patientId', (req, res) => {
  res.redirect(`/reports/view/${req.params.patientId}`);
});


// Handle registration form submission
router.post('/register', patientController.registerPatient);

module.exports = router;

