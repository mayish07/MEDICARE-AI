const asyncHandler = require('express-async-handler');
const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');

const getAllHospitals = asyncHandler(async (req, res) => {
  const { city } = req.query;
  
  const query = {};
  if (city) query.city = city;

  const hospitals = await Hospital.find(query).sort({ rating: -1 });

  res.json({
    success: true,
    count: hospitals.length,
    hospitals
  });
});

const getHospitalById = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    res.status(404);
    throw new Error('Hospital not found');
  }

  const doctors = await Doctor.find({ hospital: hospital._id })
    .select('name specialization qualification experience rating photo consultationFee onlineConsultation')
    .sort({ rating: -1 });

  res.json({
    success: true,
    hospital,
    doctors
  });
});

module.exports = {
  getAllHospitals,
  getHospitalById
};