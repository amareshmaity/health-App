const Patient = require('../models/patient');
// Register a new patient
exports.registerPatient = async (req, res) => {
  const { tokenNumber, name, phoneNumber } = req.body;

  if (!tokenNumber || !name || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const newPatient = new Patient({
      tokenNumber,
      name,
      phoneNumber
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient registered successfully!' });
  } catch (error) {
    console.error('Error registering patient:', error); // Log full error object
    res.status(500).json({ message: 'Error registering patient', error: error.message });
  }
};
