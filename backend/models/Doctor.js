const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    enum: [
      'General Physician',
      'Cardiologist',
      'Neurologist',
      'Orthopedic',
      'Pediatrician',
      'Dermatologist',
      'Gynecologist',
      'Urologist',
      'Gastroenterologist',
      'Pulmonologist',
      'Nephrologist',
      'Endocrinologist',
      'Oncologist',
      'Psychiatrist',
      'Ophthalmologist',
      'ENT',
      'Dentist',
      'Plastic Surgeon',
      'Radiologist',
      'Anesthesiologist'
    ]
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  city: {
    type: String,
    enum: ['Mangalore', 'Bangalore'],
    required: true
  },
  photo: {
    type: String,
    default: ''
  },
  bio: {
    type: String
  },
  languages: [{
    type: String
  }],
  consultationFee: {
    type: Number,
    required: true,
    min: 0
  },
  availableSlots: [{
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    isBooked: {
      type: Boolean,
      default: false
    }
  }],
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  onlineConsultation: {
    type: Boolean,
    default: false
  },
  bookingLink: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);