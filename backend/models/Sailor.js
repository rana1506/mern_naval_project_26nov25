const mongoose = require('mongoose');

const sailorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division' },
  trade: { type: String },
  medicalFit: { type: Boolean, default: true },
  phone: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sailor', sailorSchema);
