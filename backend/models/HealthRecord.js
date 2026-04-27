const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Prescription', 'Lab Report', 'Scan', 'Vaccination', 'Other'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  doctor: String,
  hospital: String,
  description: String,
  fileUrl: String
}, {
  timestamps: true
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);