const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving
doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Verify password
doctorSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Doctor', doctorSchema);
// module.exports = Doctor;
