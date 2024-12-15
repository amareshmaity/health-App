// models/report.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const reportSchema = new mongoose.Schema({
//     patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
//     doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
//     diagnosis: { type: String, required: true },
//     treatment: { type: String, required: true },
//     date: { type: Date, default: Date.now }
// });
const reportSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    status: { type: String, required: true },
    details: { type: String, required: true }
  },{ timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
