const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    tokenNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

module.exports = mongoose.model('Patient', patientSchema);
