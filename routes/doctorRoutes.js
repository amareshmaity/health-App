const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
router.get('/register', (req, res) => {
  res.render('doctorRegister'); // Ensure 'doctorRegister.hbs' exists in the 'views' folder
});
router.post('/register', doctorController.registerDoctor);
router.get('/login', (req, res) => {
  res.render('doctorLogin'); // Ensure 'doctorLogin.hbs' exists in the 'views' folder
});
// New route for viewing all doctors
router.get('/view-all', doctorController.viewAllDoctors); // Add this line

router.post('/login', doctorController.loginDoctor);
// Route to delete a doctor
router.post('/delete/:doctorId', doctorController.deleteDoctor);


module.exports = router;


