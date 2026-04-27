const asyncHandler = require('express-async-handler');
const Doctor = require('../models/Doctor');

const getAllDoctors = asyncHandler(async (req, res) => {
  const { city, specialization, minFee, maxFee, available, page = 1, limit = 12 } = req.query;

  const query = {};

  if (city) query.city = city;
  if (specialization) query.specialization = specialization;
  if (available === 'true') query.isAvailable = true;
  if (minFee || maxFee) {
    query.consultationFee = {};
    if (minFee) query.consultationFee.$gte = Number(minFee);
    if (maxFee) query.consultationFee.$lte = Number(maxFee);
  }

  const skip = (page - 1) * limit;

  const doctors = await Doctor.find(query)
    .populate('hospital', 'name address city rating')
    .skip(skip)
    .limit(Number(limit))
    .sort({ rating: -1, experience: -1 });

  const total = await Doctor.countDocuments(query);

  res.json({
    success: true,
    doctors,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    total
  });
});

const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id)
    .populate('hospital', 'name address city phone website googleMapsLink');

  if (!doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }

  res.json({
    success: true,
    doctor
  });
});

const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const doctorId = req.params.id;

  if (!rating || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error('Please provide a valid rating (1-5)');
  }

  const doctor = await Doctor.findById(doctorId);

  if (!doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }

  const review = {
    user: req.user._id,
    rating,
    comment,
    createdAt: new Date()
  };

  doctor.reviews.push(review);
  doctor.totalReviews = doctor.reviews.length;

  const totalRating = doctor.reviews.reduce((acc, rev) => acc + rev.rating, 0);
  doctor.rating = Number((totalRating / doctor.reviews.length).toFixed(1));

  await doctor.save();

  res.json({
    success: true,
    message: 'Review added successfully',
    doctor
  });
});

const getAvailableSlots = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  const doctor = await Doctor.findById(id);

  if (!doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }

  let slots = doctor.availableSlots;

  if (date) {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    slots = slots.filter(slot => {
      const slotDate = new Date(slot.date);
      slotDate.setHours(0, 0, 0, 0);
      return slotDate.getTime() === targetDate.getTime();
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const next7Days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    next7Days.push(date);
  }

  const availableSlotsByDate = {};
  next7Days.forEach(date => {
    const dateStr = date.toISOString().split('T')[0];
    const daySlots = doctor.availableSlots.filter(slot => {
      const slotDate = new Date(slot.date).toISOString().split('T')[0];
      return slotDate === dateStr && !slot.isBooked;
    });
    if (daySlots.length > 0) {
      availableSlotsByDate[dateStr] = daySlots;
    }
  });

  res.json({
    success: true,
    availableSlots: availableSlotsByDate,
    doctorId: id
  });
});

module.exports = {
  getAllDoctors,
  getDoctorById,
  addReview,
  getAvailableSlots
};