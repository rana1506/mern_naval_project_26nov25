const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  do: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Division', divisionSchema);
