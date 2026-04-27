const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hospital name is required'],
    trim: true
  },
  city: {
    type: String,
    enum: ['Mangalore', 'Bangalore'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: String,
  website: String,
  googleMapsLink: String,
  lat: Number,
  lng: Number,
  specialties: [{
    type: String
  }],
  facilities: [{
    type: String
  }],
  photo: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5
  },
  totalBeds: {
    type: Number,
    default: 0
  },
  emergencyAvailable: {
    type: Boolean,
    default: false
  },
  ambulanceAvailable: {
    type: Boolean,
    default: false
  },
  timings: {
    type: String,
    default: '24/7'
  },
  about: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Hospital', hospitalSchema);