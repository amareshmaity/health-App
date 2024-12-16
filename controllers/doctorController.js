// const bcrypt = require('bcrypt');
const Doctor = require('../models/doctor');
// Register Doctor
exports.registerDoctor = async (req, res) => {
  console.log('Request Body:', req.body);
    const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  try {
    // Check if the doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already registered.' });
    }
   // Create new doctor
    const doctor = new Doctor({ name, email, password });
    await doctor.save();
    res.status(201).json({ message: 'Doctor registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};
// Login Doctor
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the doctor by email
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Compare the password
    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
   // Respond with success
    res.status(200).json({ message: 'Login successful' });
} catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ message: 'Login failed. Please try again.' });
}
};
// New function to get all doctors
exports.viewAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch all doctors from the database
    res.render('viewAllDoctors', { doctors }); // Render the 'viewAllDoctors.hbs' template and pass the doctors data
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};
// Delete a doctor by their ID
exports.deleteDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
      // Find the doctor by ID and delete them
      const doctor = await Doctor.findByIdAndDelete(doctorId);

      if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found.' });
      }

      // Redirect back to the 'View All Doctors' page after deletion
      res.redirect('/doctors/view-all');
  } catch (error) {
      console.error('Error deleting doctor:', error.message);
      res.status(500).json({ message: 'Error deleting doctor', error: error.message });
  }
};
// Add this method 
exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedDoctor) {
      return res.status(404).send('Doctor not found');
    }
    res.json(updatedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


